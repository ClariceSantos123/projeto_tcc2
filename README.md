# 🧪 Tabela Periódica Interativa

**Projeto de TCC - Sistemas de Informação**

Uma aplicação web educacional gamificada para aprender a tabela periódica de forma interativa e divertida, com sistema de pontuação e progresso persistente.

---

## ✨ Funcionalidades Principais

### 🎮 Sistema de Jogo
- **Drag and Drop** - Arraste elementos para suas posições corretas
- **19 Famílias Químicas** - Cobertura de 115 elementos
- **Feedback Visual** - Animações de acerto/erro em tempo real
- **Dicas Contextualizadas** - Ajuda específica para cada família

### 🏆 Sistema de Pontuação
- **Pontos por Acerto** - 10 pontos por elemento correto
- **Bônus de Velocidade** - Quanto mais rápido, mais pontos
  - < 5s por elemento: +50% de bônus
  - < 10s por elemento: +30% de bônus
  - < 20s por elemento: +10% de bônus
- **Penalidade por Dicas** - -10 pontos cada
- **Sistema de Estrelas** - 1 a 3 estrelas baseado no desempenho
- **Conquistas Especiais** - Badges por performances excepcionais

### 📊 Progresso Persistente
- **Elementos Salvos** - Elementos completados ficam permanentemente na tabela
- **LocalStorage** - Progresso salvo automaticamente
- **Estatísticas Globais**:
  - Pontuação total acumulada
  - Elementos completados (X/115)
  - Famílias completadas (X/19)
- **Indicadores Visuais** - Famílias completas marcadas com ✓

### ⏱️ Timer e Estatísticas
- **Cronômetro** - Tempo de conclusão de cada família
- **Estatísticas em Tempo Real** - Pontos, estrelas e tempo
- **Histórico de Desempenho** - Acompanhe sua evolução

---

## 📁 Estrutura do Projeto

```
tabela-periodica/
│
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos e responsividade
├── data.js             # Dados das famílias (parte 1)
├── data2.js            # Dados das famílias (parte 2)
├── data3.js            # Dados das famílias (parte 3)
├── app.js              # Lógica principal da aplicação
└── README.md           # Documentação do projeto
```

---

## 🚀 Como Executar

1. **Clone ou baixe** os arquivos do projeto
2. Certifique-se de ter **todos os 6 arquivos** na mesma pasta
3. **Abra o arquivo** `index.html` em um navegador moderno
4. **Pronto!** Não requer servidor ou instalação

---

## 🎮 Como Jogar

1. **Tela Inicial**
   - Visualize suas estatísticas globais
   - Escolha uma família química (✓ indica família completa)

2. **Durante o Jogo**
   - Timer inicia automaticamente no primeiro acerto
   - Arraste elementos para suas posições corretas
   - Use dicas se necessário (-10 pontos cada)
   - Acompanhe pontos, estrelas e tempo em tempo real

3. **Após Completar**
   - Veja sua pontuação final e estrelas conquistadas
   - Elementos ficam salvos permanentemente na tabela
   - Escolha jogar novamente ou selecionar outra família

4. **Progresso Contínuo**
   - Complete todas as 19 famílias
   - Veja a tabela periódica completa se formar
   - Acumule pontos e conquistas

---

## 📚 Famílias Disponíveis

### Grupos Principais
| Família | Grupo | Elementos |
|---------|-------|-----------|
| Gases Nobres | 18 | He, Ne, Ar, Kr, Xe, Rn |
| Metais Alcalinos | 1 | Li, Na, K, Rb, Cs, Fr |
| Metais Alcalino-Terrosos | 2 | Be, Mg, Ca, Sr, Ba, Ra |
| Halogênios | 17 | F, Cl, Br, I, At |
| Calcogênios | 16 | O, S, Se, Te, Po |
| Família do Nitrogênio | 15 | N, P, As, Sb, Bi |
| Família do Carbono | 14 | C, Si, Ge, Sn, Pb |
| Família do Boro | 13 | B, Al, Ga, In, Tl |

### Metais de Transição
| Família | Grupo | Elementos |
|---------|-------|-----------|
| Grupo do Escândio | 3 | Sc, Y |
| Grupo do Titânio | 4 | Ti, Zr, Hf |
| Grupo do Vanádio | 5 | V, Nb, Ta |
| Grupo do Cromo | 6 | Cr, Mo, W |
| Grupo do Manganês | 7 | Mn, Tc, Re |
| Série do Ferro | 8-10 | Fe, Co, Ni |
| Metais de Cunhagem | 11 | Cu, Ag, Au |
| Grupo do Zinco | 12 | Zn, Cd, Hg |
| Metais da Platina | 8-10 | Ru, Rh, Pd, Os, Ir, Pt |

### Séries Especiais
| Família | Elementos |
|---------|-----------|
| Lantanídeos | La até Lu (15 elementos) |
| Actinídeos | Ac até Pu (6 elementos) |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização, animações e responsividade
- **JavaScript (ES6+)** - Lógica e interatividade
- **LocalStorage API** - Persistência de dados
- **Drag and Drop API** - Mecânica do jogo

---

## 📐 Arquitetura do Código

### Padrões Utilizados

- **Separação de responsabilidades** - HTML, CSS e JS em arquivos separados
- **Modularização** - Dados separados da lógica
- **Variáveis CSS** - Cores e valores reutilizáveis
- **Event Delegation** - Otimização de eventos
- **Código documentado** - Comentários explicativos
- **LocalStorage** - Persistência de progresso

### Sistema de Pontuação

```javascript
Pontuação = (Elementos × 10) × (1 + BônusTempo) - (Dicas × 10)

BônusTempo:
- < 5s por elemento: +50%
- < 10s por elemento: +30%
- < 20s por elemento: +10%

Estrelas:
- 3⭐: Bônus ≥30% e sem dicas
- 2⭐: Bônus ≥10% ou ≤1 dica
- 1⭐: Outros casos
```

### Principais Funções (app.js)

```javascript
// Persistência
loadProgress()          // Carrega dados do localStorage
saveProgress()          // Salva progresso atual
resetAllProgress()      // Reseta todo o progresso

// Pontuação
startTimer()            // Inicia cronômetro
stopTimer()             // Para cronômetro
calculateScore()        // Calcula pontuação final
updateCurrentStats()    // Atualiza estatísticas em tempo real

// Controle do Jogo
startGame(familyKey)    // Inicia jogo com família
initGame()              // Configura estado inicial
resetGame()             // Reinicia família atual
backToMenu()            // Volta ao menu

// Renderização
renderFamilyCards()     // Renderiza cards (marca completas)
createTable()           // Cria tabela (mostra elementos salvos)
createElementsPool()    // Cria pool (filtra completados)
```

---

## 🎯 Funcionalidades Completas

- [x] Interface gamificada
- [x] 19 famílias químicas
- [x] 115 elementos com informações
- [x] Sistema de drag and drop
- [x] **Sistema de pontuação**
- [x] **Timer de desempenho**
- [x] **Estrelas e conquistas**
- [x] **Progresso persistente**
- [x] **Elementos salvos na tabela**
- [x] **Estatísticas globais**
- [x] Feedback visual de acerto/erro
- [x] Barra de progresso
- [x] Dicas contextualizadas
- [x] Design responsivo
- [x] Modais informativos

---

## 🎓 Diferenciais Pedagógicos

1. **Aprendizado Progressivo** - Complete elementos por família
2. **Reforço Visual** - Veja a tabela se completar gradualmente
3. **Gamificação Efetiva** - Pontos, estrelas e conquistas motivam
4. **Feedback Imediato** - Informações detalhadas ao acertar
5. **Sem Punição por Erro** - Tente quantas vezes precisar
6. **Autonomia** - Escolha a ordem das famílias

---

## 📈 Possíveis Melhorias Futuras

- [ ] Ranking online de jogadores
- [ ] Modo desafio com tempo limite
- [ ] Conquistas mais elaboradas
- [ ] Gráficos de progresso temporal
- [ ] Modo tutorial interativo
- [ ] Exportação de certificado de conclusão
- [ ] Temas de cores personalizados
- [ ] Modo multiplayer competitivo

---

## 👨‍💻 Autor

**Clarice Aparecida dos Santos Fonseca**
Trabalho de Conclusão de Curso - Sistemas de Informação

---

## 📄 Licença

Este projeto é de uso educacional.

---

## 🔧 Solução de Problemas

**Progresso não salva:**
- Verifique se o navegador permite localStorage
- Não use modo anônimo/privado

**Elementos não aparecem:**
- Atualize a página (F5)
- Limpe o cache do navegador

**Resetar tudo:**
- Use o botão "Resetar Tudo" na tela inicial
- Ou abra o Console (F12) e digite: `localStorage.clear()`
