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
    btnCloseModal: document.getElementById('btnCloseModal')
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', init);

function init() {
    renderFamilyCards();
    setupEventListeners();
}

function setupEventListeners() {
    DOM.btnHint.addEventListener('click', showHint);
    DOM.btnReset.addEventListener('click', resetGame);
    DOM.btnMenu.addEventListener('click', backToMenu);
    DOM.btnCloseModal.addEventListener('click', closeModal);
    DOM.infoModal.addEventListener('click', (e) => {
        if (e.target === DOM.infoModal) closeModal();
    });
}

// ============================================
// RENDERIZAÇÃO DOS CARDS DE FAMÍLIAS
// ============================================
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
    updateProgress();
    createTable();
    createElementsPool();
}

function resetGame() {
    initGame();
}

function backToMenu() {
    DOM.gameScreen.classList.remove('active');
    DOM.selectionScreen.classList.add('active');
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
            
            // Verificar se é slot ativo
            const element = currentElements.find(el => 
                el.period === period && el.group === group
            );
            
            if (element) {
                slot.classList.add('active');
                slot.dataset.number = element.number;
                slot.dataset.period = element.period;
                slot.dataset.group = element.group;
                
                slot.addEventListener('dragover', handleDragOver);
                slot.addEventListener('drop', handleDrop);
            } else {
                slot.classList.add('inactive');
            }
            
            DOM.tableGrid.appendChild(slot);
        });
    });
}

// ============================================
// POOL DE ELEMENTOS
// ============================================
function createElementsPool() {
    DOM.elementsPool.querySelector('.pool-grid').innerHTML = '';
    
    // Embaralhar elementos
    const shuffled = shuffleArray([...currentElements]);
    
    shuffled.forEach(element => {
        const card = createElementCard(element);
        DOM.elementsPool.querySelector('.pool-grid').appendChild(card);
    });
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
    const droppedNumber = draggedElement.dataset.number;
    const slotNumber = slot.dataset.number;
    
    if (droppedNumber === slotNumber && !slot.classList.contains('filled')) {
        // Acerto
        slot.innerHTML = draggedElement.innerHTML;
        slot.classList.add('filled');
        slot.classList.remove('active');
        draggedElement.remove();
        
        placedElements++;
        updateProgress();
        
        // Mostrar informações
        const element = currentElements.find(el => el.number == droppedNumber);
        showElementInfo(element);
        
        // Verificar conclusão
        if (placedElements === currentElements.length) {
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
    const groupKey = currentFamily.multiGroup ? 'multi' : currentFamily.group;
    const hint = HINTS_CONFIG[groupKey] || HINTS_CONFIG['multi'];
    
    DOM.modalTitle.textContent = '💡 Dica';
    DOM.modalBody.innerHTML = `
        <div class="hint-box">
            <h4>${hint.title}</h4>
            ${hint.tips.map(tip => `<p>• ${tip}</p>`).join('')}
            <p style="margin-top: 15px;">• Observe os números atômicos para descobrir a ordem!</p>
        </div>
    `;
    openModal();
}

function showCompletionMessage() {
    DOM.modalTitle.textContent = '🎉 Parabéns!';
    DOM.modalBody.innerHTML = `
        <div class="success-message">
            Você completou a família ${currentFamily.name}!
        </div>
        <p style="margin-top: 20px;">
            Você organizou corretamente todos os ${currentElements.length} elementos.
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
