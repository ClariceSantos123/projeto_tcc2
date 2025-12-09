/**
 * =============================================
 * TABELA PERIÓDICA INTERATIVA - APLICAÇÃO PRINCIPAL
 * TCC - Sistemas de Informação
 * =============================================
 */

// ============================================
// VARIÁVEIS GLOBAIS
// ============================================
let currentElements = [];
let currentFamily = null;
let placedElements = 0;
let draggedElement = null;

// Sistema de Pontuação
let currentScore = 0;
let currentStars = 0;
let startTime = null;
let timerInterval = null;
let hintsUsed = 0;

// Quiz
let quizAnswered = false;
let quizCorrect = false;
let currentQuestion = null;

// Persistência de Dados
let completedElements = new Set(); // Elementos já completados permanentemente
let completedFamilies = new Set(); // Famílias 100% completas
let totalScore = 0;

// ============================================
// ELEMENTOS DO DOM
// ============================================
const DOM = {
    selectionScreen: document.getElementById('selectionScreen'),
    gameScreen: document.getElementById('gameScreen'),
    familyGrid: document.getElementById('familyGrid'),
    familyTitle: document.getElementById('familyTitle'),
    progressBar: document.getElementById('progressBar'),
    tableGrid: document.getElementById('tableGrid'),
    elementsPool: document.getElementById('elementsPool'),
    infoModal: document.getElementById('infoModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    btnHint: document.getElementById('btnHint'),
    btnReset: document.getElementById('btnReset'),
    btnMenu: document.getElementById('btnMenu'),
    btnCloseModal: document.getElementById('btnCloseModal'),
    btnResetAll: document.getElementById('btnResetAll'),
    // Estatísticas
    totalScore: document.getElementById('totalScore'),
    totalElements: document.getElementById('totalElements'),
    totalFamilies: document.getElementById('totalFamilies'),
    currentScore: document.getElementById('currentScore'),
    currentStars: document.getElementById('currentStars'),
    timer: document.getElementById('timer')
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', init);

function init() {
    loadProgress();
    renderFamilyCards();
    setupEventListeners();
    updateGlobalStats();
}

function setupEventListeners() {
    DOM.btnHint.addEventListener('click', showHint);
    DOM.btnReset.addEventListener('click', resetGame);
    DOM.btnMenu.addEventListener('click', backToMenu);
    DOM.btnCloseModal.addEventListener('click', closeModal);
    DOM.btnResetAll.addEventListener('click', resetAllProgress);
    DOM.infoModal.addEventListener('click', (e) => {
        if (e.target === DOM.infoModal) closeModal();
    });
}

// ============================================
// PERSISTÊNCIA DE DADOS (LocalStorage)
// ============================================
function loadProgress() {
    const saved = localStorage.getItem('tabelaPeriodicaProgress');
    if (saved) {
        const data = JSON.parse(saved);
        completedElements = new Set(data.completedElements || []);
        completedFamilies = new Set(data.completedFamilies || []);
        totalScore = data.totalScore || 0;
        
        console.log('Progresso carregado:', {
            elementos: completedElements.size,
            familias: completedFamilies.size,
            pontos: totalScore
        });
        console.log('Elementos completados:', Array.from(completedElements).sort((a,b) => a-b));
    }
}

function saveProgress() {
    const data = {
        completedElements: Array.from(completedElements),
        completedFamilies: Array.from(completedFamilies),
        totalScore: totalScore
    };
    localStorage.setItem('tabelaPeriodicaProgress', JSON.stringify(data));
    
    console.log('Progresso salvo:', {
        elementos: completedElements.size,
        familias: completedFamilies.size,
        pontos: totalScore
    });
}

function resetAllProgress() {
    if (confirm('Tem certeza que deseja resetar TODO o seu progresso? Esta ação não pode ser desfeita!')) {
        localStorage.removeItem('tabelaPeriodicaProgress');
        completedElements = new Set();
        completedFamilies = new Set();
        totalScore = 0;
        updateGlobalStats();
        renderFamilyCards();
        alert('Progresso resetado com sucesso!');
    }
}

function updateGlobalStats() {
    DOM.totalScore.textContent = totalScore.toLocaleString();
    DOM.totalElements.textContent = `${completedElements.size}/115`;
    DOM.totalFamilies.textContent = `${completedFamilies.size}/19`;
}

// ============================================
// SISTEMA DE PONTUAÇÃO E TIMER
// ============================================
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimer() {
    if (!startTime) return;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    DOM.timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function calculateScore() {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    const elementsCount = currentElements.length;
    
    // Pontuação base: 10 pontos por elemento
    let baseScore = elementsCount * 10;
    
    // Bônus de tempo (quanto mais rápido, mais pontos)
    // Perfeito: < 30 segundos = +50%, < 60s = +30%, < 120s = +10%
    let timeBonus = 0;
    const timePerElement = timeElapsed / elementsCount;
    if (timePerElement < 5) timeBonus = 0.5;
    else if (timePerElement < 10) timeBonus = 0.3;
    else if (timePerElement < 20) timeBonus = 0.1;
    
    // Penalidade por dicas (-10 pontos cada)
    const hintsPenalty = hintsUsed * 10;
    
    // Cálculo final
    const finalScore = Math.max(0, Math.floor(baseScore * (1 + timeBonus) - hintsPenalty));
    
    // Estrelas (1-3 baseado no desempenho)
    let stars = 1;
    if (timeBonus >= 0.3 && hintsUsed === 0) stars = 3;
    else if (timeBonus >= 0.1 || hintsUsed <= 1) stars = 2;
    
    return { score: finalScore, stars, timeElapsed, timeBonus, hintsPenalty };
}

function updateCurrentStats() {
    DOM.currentScore.textContent = currentScore;
    DOM.currentStars.textContent = currentStars;
}
function renderFamilyCards() {
    DOM.familyGrid.innerHTML = '';
    
    for (const [key, family] of Object.entries(FAMILIES_DATA)) {
        const card = document.createElement('button');
        card.className = 'family-card';
        card.onclick = () => startGame(key);
        
        const elementsPreview = family.elements
            .map(el => el.symbol)
            .join(', ');
        
        let groupText = '';
        if (family.group === 'Ln') {
            groupText = 'Terras Raras';
        } else if (family.group === 'An') {
            groupText = 'Radioativos';
        } else if (family.multiGroup) {
            groupText = 'Múltiplos Grupos';
        } else {
            groupText = `Grupo ${family.group}`;
        }
        
        card.innerHTML = `
            <h3>${family.icon} ${family.name}</h3>
            <p>${groupText} - ${family.elements.length} elementos</p>
            <p class="elements-preview">${elementsPreview}</p>
        `;
        
        DOM.familyGrid.appendChild(card);
    }
}

// ============================================
// CONTROLE DO JOGO
// ============================================
function startGame(familyKey) {
    if (!FAMILIES_DATA[familyKey]) return;
    
    currentFamily = FAMILIES_DATA[familyKey];
    currentElements = [...currentFamily.elements];
    
    // Definir título
    let titleText = currentFamily.name;
    if (currentFamily.group === 'Ln') {
        titleText += ' - Lantanídeos';
    } else if (currentFamily.group === 'An') {
        titleText += ' - Actinídeos';
    } else if (currentFamily.multiGroup) {
        titleText += ' - Múltiplos Grupos';
    } else {
        titleText += ` - Grupo ${currentFamily.group}`;
    }
    
    DOM.familyTitle.textContent = titleText;
    
    // Alternar telas
    DOM.selectionScreen.classList.remove('active');
    DOM.gameScreen.classList.add('active');
    
    initGame();
}

function initGame() {
    placedElements = 0;
    currentScore = 0;
    currentStars = 0;
    hintsUsed = 0;
    startTime = null;
    stopTimer();
    quizAnswered = false;
    quizCorrect = false;
    currentQuestion = null;
    
    updateProgress();
    updateCurrentStats();
    createTable();
    createElementsPool();
    
    // Debug: verificar se elementos foram criados
    console.log('Elementos atuais:', currentElements.length);
    console.log('Elementos já completados:', completedElements.size);
    console.log('Elementos para colocar:', currentElements.filter(el => !completedElements.has(el.number)).length);
}

function resetGame() {
    if (confirm('Tem certeza que deseja reiniciar esta família?')) {
        initGame();
    }
}

function backToMenu() {
    stopTimer();
    DOM.gameScreen.classList.remove('active');
    DOM.selectionScreen.classList.add('active');
    updateGlobalStats();
    renderFamilyCards();
}

// ============================================
// CRIAÇÃO DA TABELA PERIÓDICA
// ============================================
function createTable() {
    DOM.tableGrid.innerHTML = '';
    DOM.tableGrid.style.cssText = `
        display: grid;
        grid-template-columns: 40px repeat(18, 55px);
        grid-template-rows: 30px repeat(7, 55px);
        gap: 2px;
    `;
    
    // Labels dos grupos
    createGroupLabels();
    
    // Labels dos períodos
    createPeriodLabels();
    
    // Slots da tabela
    createTableSlots();
}

function createGroupLabels() {
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1; grid-row: 1;';
    DOM.tableGrid.appendChild(header);
    
    for (let group = 1; group <= 18; group++) {
        const label = document.createElement('div');
        label.style.cssText = `
            grid-column: ${group + 1};
            grid-row: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7em;
            font-weight: bold;
            color: var(--primary-color);
        `;
        label.textContent = group;
        DOM.tableGrid.appendChild(label);
    }
}

function createPeriodLabels() {
    for (let period = 1; period <= 7; period++) {
        const label = document.createElement('div');
        label.style.cssText = `
            grid-column: 1;
            grid-row: ${period + 1};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7em;
            font-weight: bold;
            color: var(--primary-color);
        `;
        label.textContent = period;
        DOM.tableGrid.appendChild(label);
    }
}

function createTableSlots() {
    TABLE_STRUCTURE.forEach((periodGroups, periodIndex) => {
        const period = periodIndex + 1;
        
        periodGroups.forEach((group, groupIndex) => {
            if (group === 0) return;
            
            const slot = document.createElement('div');
            slot.className = 'element-slot';
            slot.style.cssText = `
                grid-column: ${groupIndex + 2};
                grid-row: ${period + 1};
            `;
            
            // Verificar se é slot ativo OU se já foi completado anteriormente
            const element = currentElements.find(el => 
                el.period === period && el.group === group
            );
            
            // Procurar em TODAS as famílias se este elemento já foi completado
            let completedElement = null;
            for (const family of Object.values(FAMILIES_DATA)) {
                const found = family.elements.find(el => 
                    el.period === period && el.group === group && completedElements.has(el.number)
                );
                if (found) {
                    completedElement = found;
                    break;
                }
            }
            
            if (completedElement) {
                // Elemento já completado anteriormente - mostrar permanentemente
                slot.classList.add('filled', 'permanent');
                slot.innerHTML = `
                    <div class="element-display">
                        <div class="element-number">${completedElement.number}</div>
                        <div class="element-symbol">${completedElement.symbol}</div>
                        <div class="element-name">${completedElement.name}</div>
                    </div>
                `;
            } else if (element) {
                // Slot ativo para a família atual
                slot.classList.add('active');
                slot.dataset.number = element.number;
                slot.dataset.period = element.period;
                slot.dataset.group = element.group;
                
                slot.addEventListener('dragover', handleDragOver);
                slot.addEventListener('drop', handleDrop);
            } else {
                // Slot inativo
                slot.classList.add('inactive');
            }
            
            DOM.tableGrid.appendChild(slot);
        });
    });
    
    // Adicionar slots especiais para Lantanídeos e Actinídeos se for necessário
    if (currentFamily.group === 'Ln' || currentFamily.group === 'An') {
        createLanthanideActinideSlots();
    }
}

function createLanthanideActinideSlots() {
    // Criar linha separada para Lantanídeos ou Actinídeos
    const separator = document.createElement('div');
    separator.style.cssText = `
        grid-column: 1 / -1;
        height: 20px;
    `;
    DOM.tableGrid.appendChild(separator);
    
    const title = document.createElement('div');
    title.style.cssText = `
        grid-column: 1 / -1;
        padding: 10px;
        text-align: center;
        font-weight: bold;
        color: var(--primary-color);
        background: #f0f0ff;
        border-radius: 5px;
        margin: 10px 0;
        font-size: 1.2em;
    `;
    title.textContent = currentFamily.name;
    DOM.tableGrid.appendChild(title);
    
    // Criar grid horizontal para os elementos (15 elementos)
    const specialGrid = document.createElement('div');
    specialGrid.style.cssText = `
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(15, 60px);
        gap: 5px;
        justify-content: center;
        padding: 10px;
    `;
    
    currentElements.forEach((element, index) => {
        const slot = document.createElement('div');
        slot.className = 'element-slot';
        slot.style.cssText = `
            width: 60px;
            height: 60px;
        `;
        
        // Verificar se já foi completado usando o Set
        const isCompleted = completedElements.has(element.number);
        
        if (isCompleted) {
            slot.classList.add('filled', 'permanent');
            slot.innerHTML = `
                <div class="element-display">
                    <div class="element-number">${element.number}</div>
                    <div class="element-symbol">${element.symbol}</div>
                    <div class="element-name">${element.name}</div>
                </div>
            `;
        } else {
            slot.classList.add('active');
            slot.dataset.number = element.number;
            slot.dataset.period = element.period;
            slot.dataset.group = element.group;
            
            slot.addEventListener('dragover', handleDragOver);
            slot.addEventListener('drop', handleDrop);
        }
        
        specialGrid.appendChild(slot);
    });
    
    DOM.tableGrid.appendChild(specialGrid);
}

// ============================================
// POOL DE ELEMENTOS
// ============================================
function createElementsPool() {
    if (!DOM.elementsPool) {
        console.error('elementsPool não encontrado!');
        return;
    }
    
    DOM.elementsPool.innerHTML = '';
    
    // Filtrar apenas elementos que ainda não foram completados
    const elementsToPlace = currentElements.filter(el => !completedElements.has(el.number));
    
    console.log('Criando pool com', elementsToPlace.length, 'elementos');
    
    if (elementsToPlace.length === 0) {
        // Todos os elementos desta família já foram completados
        DOM.elementsPool.innerHTML = `
            <p style="text-align: center; color: #4CAF50; font-weight: bold; width: 100%; padding: 20px;">
                ✓ Todos os elementos desta família já foram completados!
            </p>
        `;
        return;
    }
    
    // Embaralhar elementos
    const shuffled = shuffleArray([...elementsToPlace]);
    
    shuffled.forEach(element => {
        const card = createElementCard(element);
        DOM.elementsPool.appendChild(card);
    });
    
    console.log('Pool criado com sucesso!');
}

function createElementCard(element) {
    const card = document.createElement('div');
    card.className = 'element-card';
    card.draggable = true;
    card.dataset.number = element.number;
    
    card.innerHTML = `
        <div class="element-number">${element.number}</div>
        <div class="element-symbol">${element.symbol}</div>
        <div class="element-name">${element.name}</div>
    `;
    
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    
    return card;
}

// ============================================
// DRAG AND DROP
// ============================================
function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.stopPropagation();
    
    const slot = e.currentTarget;
    const droppedNumber = parseInt(draggedElement.dataset.number);
    const slotNumber = parseInt(slot.dataset.number);
    
    if (droppedNumber === slotNumber && !slot.classList.contains('filled')) {
        // Iniciar timer no primeiro acerto
        if (!startTime) {
            startTimer();
        }
        
        // Acerto
        const element = currentElements.find(el => el.number == droppedNumber);
        slot.innerHTML = `
            <div class="element-display">
                <div class="element-number">${element.number}</div>
                <div class="element-symbol">${element.symbol}</div>
                <div class="element-name">${element.name}</div>
            </div>
        `;
        slot.classList.add('filled');
        slot.classList.remove('active');
        draggedElement.remove();
        
        // Adicionar aos elementos completados e salvar imediatamente
        completedElements.add(droppedNumber);
        saveProgress(); // Salvar após cada elemento colocado
        
        placedElements++;
        currentScore += 10; // +10 pontos por acerto
        
        updateProgress();
        updateCurrentStats();
        
        console.log('Elemento', droppedNumber, 'salvo. Total completados:', completedElements.size);
        
        // Mostrar informações
        showElementInfo(element);
        
        // Verificar conclusão
        const elementsToComplete = currentElements.filter(el => !completedElements.has(el.number));
        if (elementsToComplete.length === 0 || placedElements === elementsToComplete.length) {
            stopTimer();
            setTimeout(showCompletionMessage, 500);
        }
    } else {
        // Erro - feedback visual
        slot.style.background = '#ffebee';
        setTimeout(() => {
            slot.style.background = slot.classList.contains('filled') ? '#e8f5e9' : '#f0f0ff';
        }, 300);
    }
}

// ============================================
// PROGRESSO E FEEDBACK
// ============================================
function updateProgress() {
    const percentage = (placedElements / currentElements.length) * 100;
    DOM.progressBar.style.width = `${percentage}%`;
    DOM.progressBar.textContent = `${placedElements} / ${currentElements.length}`;
}

// ============================================
// SISTEMA DE QUIZ
// ============================================
function createQuiz() {
    // Obter uma pergunta aleatória para a família atual
    const familyKey = Object.keys(FAMILIES_DATA).find(key => FAMILIES_DATA[key] === currentFamily);
    currentQuestion = getRandomQuestion(familyKey);
    
    const quizHTML = `
        <div class="quiz-container">
            <div class="quiz-header">
                <h3>🧠 Quiz de Conhecimento</h3>
                <p style="color: #666; font-size: 0.95em;">Responda corretamente e ganhe +50 pontos bônus!</p>
            </div>
            
            <div class="quiz-question">
                ${currentQuestion.question}
            </div>
            
            <div class="quiz-options" id="quizOptions">
                ${currentQuestion.options.map((option, index) => `
                    <div class="quiz-option" data-index="${index}" onclick="checkQuizAnswer(${index})">
                        ${String.fromCharCode(65 + index)}) ${option}
                    </div>
                `).join('')}
            </div>
            
            <div id="quizResult"></div>
        </div>
    `;
    
    return quizHTML;
}

function checkQuizAnswer(selectedIndex) {
    if (quizAnswered) return; // Já respondeu
    
    quizAnswered = true;
    const isCorrect = selectedIndex === currentQuestion.correct;
    quizCorrect = isCorrect;
    
    // Desabilitar todas as opções
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        option.classList.add('disabled');
        
        if (index === currentQuestion.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Mostrar resultado
    const resultDiv = document.getElementById('quizResult');
    
    if (isCorrect) {
        currentScore += 50; // Bônus de 50 pontos
        totalScore += 50;
        updateCurrentStats();
        saveProgress();
        
        resultDiv.innerHTML = `
            <div class="quiz-result correct-answer">
                ✅ Resposta Correta!
                <div class="quiz-bonus">+50 Pontos Bônus! 🎉</div>
            </div>
            <div class="quiz-explanation">
                <strong>💡 Explicação:</strong> ${currentQuestion.explanation}
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div class="quiz-result incorrect-answer">
                ❌ Resposta Incorreta
            </div>
            <div class="quiz-explanation">
                <strong>💡 Resposta Correta:</strong> ${currentQuestion.options[currentQuestion.correct]}
                <br><br>
                <strong>Explicação:</strong> ${currentQuestion.explanation}
            </div>
        `;
    }
}

// ============================================
// MODAIS E MENSAGENS
// ============================================
function showElementInfo(element) {
    DOM.modalTitle.textContent = `${element.symbol} - ${element.name}`;
    DOM.modalBody.innerHTML = `
        <p><strong>Número Atômico:</strong> ${element.number}</p>
        <p><strong>Massa Atômica:</strong> ${element.mass} u</p>
        <p><strong>Período:</strong> ${element.period}</p>
        <p><strong>Grupo:</strong> ${element.group}</p>
        <hr style="margin: 15px 0; border: none; border-top: 1px solid #eee;">
        <p><strong>Descrição:</strong> ${element.description}</p>
        <p><strong>Propriedades:</strong> ${element.properties}</p>
        <p><strong>Descoberta:</strong> ${element.discovery}</p>
    `;
    openModal();
}

function showHint() {
    hintsUsed++;
    currentScore = Math.max(0, currentScore - 10); // -10 pontos por dica
    updateCurrentStats();
    
    let groupKey;
    if (currentFamily.group === 'Ln') groupKey = 'Ln';
    else if (currentFamily.group === 'An') groupKey = 'An';
    else if (currentFamily.group === 'P7') groupKey = 'P7';
    else if (currentFamily.name === 'Hidrogênio') groupKey = 'H';
    else if (currentFamily.multiGroup) groupKey = 'multi';
    else groupKey = currentFamily.group;
    
    const hint = HINTS_CONFIG[groupKey] || HINTS_CONFIG['multi'];
    
    DOM.modalTitle.textContent = '💡 Dica (-10 pontos)';
    DOM.modalBody.innerHTML = `
        <div class="hint-box">
            <h4>${hint.title}</h4>
            ${hint.tips.map(tip => `<p>• ${tip}</p>`).join('')}
            <p style="margin-top: 15px;">• Observe os números atômicos para descobrir a ordem!</p>
            <p style="margin-top: 10px; color: #856404;"><strong>Dicas usadas: ${hintsUsed}</strong></p>
        </div>
    `;
    openModal();
}

function showCompletionMessage() {
    const stats = calculateScore();
    
    // Atualizar pontuação global (será atualizado novamente se acertar o quiz)
    totalScore += stats.score;
    
    // Verificar se a família foi 100% completada
    const familyElementNumbers = currentFamily.elements.map(el => el.number);
    const isFamilyComplete = familyElementNumbers.every(num => completedElements.has(num));
    
    if (isFamilyComplete && !completedFamilies.has(currentFamily.name)) {
        completedFamilies.add(currentFamily.name);
    }
    
    // Salvar progresso
    saveProgress();
    
    // Gerar estrelas visuais
    const starsHTML = '⭐'.repeat(stats.stars) + '☆'.repeat(3 - stats.stars);
    
    // Conquistas especiais
    let achievements = [];
    if (stats.stars === 3) achievements.push('🏆 Desempenho Perfeito!');
    if (hintsUsed === 0) achievements.push('🧠 Mestre sem Dicas!');
    if (stats.timeElapsed < currentElements.length * 5) achievements.push('⚡ Velocidade Relâmpago!');
    
    const achievementsHTML = achievements.length > 0 
        ? achievements.map(a => `<span class="achievement-badge">${a}</span>`).join('')
        : '';
    
    DOM.modalTitle.textContent = '🎉 Parabéns!';
    DOM.modalBody.innerHTML = `
        <div class="success-message">
            Você completou ${placedElements} elemento(s) da família ${currentFamily.name}!
        </div>
        
        <div class="stars-display">${starsHTML}</div>
        
        <div class="score-display">
            <div class="score-item">
                <div class="score-icon">🏆</div>
                <div class="score-value">${stats.score}</div>
                <div class="score-label">Pontos</div>
            </div>
            <div class="score-item">
                <div class="score-icon">⏱️</div>
                <div class="score-value">${Math.floor(stats.timeElapsed / 60)}:${String(stats.timeElapsed % 60).padStart(2, '0')}</div>
                <div class="score-label">Tempo</div>
            </div>
            <div class="score-item">
                <div class="score-icon">💡</div>
                <div class="score-value">${hintsUsed}</div>
                <div class="score-label">Dicas</div>
            </div>
        </div>
        
        ${achievementsHTML}
        
        ${createQuiz()}
        
        <p style="margin-top: 15px; text-align: center; color: #666;">
            <strong>Pontuação Total:</strong> ${totalScore.toLocaleString()} pontos
        </p>
        
        <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="resetGame(); closeModal();">🔄 Jogar Novamente</button>
            <button class="btn btn-secondary" onclick="backToMenu(); closeModal();">🏠 Escolher Outra Família</button>
        </div>
    `;
    openModal();
}

function openModal() {
    DOM.infoModal.classList.add('active');
}

function closeModal() {
    DOM.infoModal.classList.remove('active');
}

// ============================================
// UTILITÁRIOS
// ============================================
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
