/**
 * =============================================
 * BANCO DE PERGUNTAS - QUIZ POR FAMÍLIA
 * =============================================
 * 
 * INSTRUÇÕES:
 * 1. Salve este arquivo como: quiz.js
 * 2. Coloque na mesma pasta dos outros arquivos
 * 3. Adicione no index.html ANTES do app.js
 */

const QUIZ_QUESTIONS = {
    'gases-nobres': [
        {
            question: 'Qual gás nobre é usado em balões e dirigíveis por ser mais leve que o ar?',
            options: ['Neônio', 'Hélio', 'Argônio', 'Xenônio'],
            correct: 1,
            explanation: 'O Hélio é o segundo elemento mais leve e é usado em balões porque não é inflamável, ao contrário do hidrogênio.'
        },
        {
            question: 'Qual gás nobre é famoso por produzir luz vermelha-alaranjada em letreiros luminosos?',
            options: ['Argônio', 'Neônio', 'Criptônio', 'Hélio'],
            correct: 1,
            explanation: 'O Neônio é usado em letreiros luminosos e produz uma característica luz vermelha-alaranjada quando eletrificado.'
        },
        {
            question: 'Qual é o único gás nobre radioativo?',
            options: ['Xenônio', 'Criptônio', 'Radônio', 'Argônio'],
            correct: 2,
            explanation: 'O Radônio é o único gás nobre radioativo e pode se acumular em porões, representando risco à saúde.'
        }
    ],

    'metais-alcalinos': [
        {
            question: 'Qual metal alcalino é o mais leve e usado em baterias recarregáveis?',
            options: ['Sódio', 'Lítio', 'Potássio', 'Rubídio'],
            correct: 1,
            explanation: 'O Lítio é o metal mais leve e é amplamente usado em baterias de dispositivos eletrônicos e veículos elétricos.'
        },
        {
            question: 'Como os metais alcalinos reagem com a água?',
            options: ['Não reagem', 'Reagem lentamente', 'Reagem violentamente', 'Formam gelo'],
            correct: 2,
            explanation: 'Os metais alcalinos reagem violentamente com água, produzindo hidrogênio e calor. A reatividade aumenta conforme descemos no grupo.'
        },
        {
            question: 'Qual metal alcalino é usado no padrão de tempo (definição do segundo)?',
            options: ['Lítio', 'Sódio', 'Césio', 'Rubídio'],
            correct: 2,
            explanation: 'O Césio é usado em relógios atômicos de alta precisão e define o padrão internacional de tempo.'
        }
    ],

    'metais-alcalino-terrosos': [
        {
            question: 'Qual elemento é essencial para ossos e dentes?',
            options: ['Magnésio', 'Cálcio', 'Estrôncio', 'Bário'],
            correct: 1,
            explanation: 'O Cálcio é essencial para a formação e manutenção de ossos e dentes saudáveis.'
        },
        {
            question: 'Qual metal alcalino-terroso queima com chama branca brilhante?',
            options: ['Berílio', 'Magnésio', 'Cálcio', 'Bário'],
            correct: 1,
            explanation: 'O Magnésio queima com uma chama branca extremamente brilhante e é usado em fogos de artifício.'
        },
        {
            question: 'Qual metal alcalino-terroso é radioativo e foi descoberto por Marie e Pierre Curie?',
            options: ['Estrôncio', 'Bário', 'Rádio', 'Berílio'],
            correct: 2,
            explanation: 'O Rádio é radioativo e foi descoberto em 1898 por Marie e Pierre Curie. Historicamente foi usado em tintas luminosas.'
        }
    ],

    'halogenios': [
        {
            question: 'Qual é o elemento mais eletronegativo de toda a tabela periódica?',
            options: ['Cloro', 'Flúor', 'Bromo', 'Iodo'],
            correct: 1,
            explanation: 'O Flúor é o elemento mais eletronegativo, reagindo vigorosamente com quase todos os elementos.'
        },
        {
            question: 'Qual halogênio é líquido à temperatura ambiente?',
            options: ['Cloro', 'Flúor', 'Bromo', 'Iodo'],
            correct: 2,
            explanation: 'O Bromo é o único não-metal que é líquido à temperatura ambiente, com cor vermelho-acastanhada.'
        },
        {
            question: 'Qual halogênio é essencial para a tireoide e adicionado ao sal de cozinha?',
            options: ['Cloro', 'Flúor', 'Iodo', 'Bromo'],
            correct: 2,
            explanation: 'O Iodo é essencial para o funcionamento da tireoide e é adicionado ao sal (sal iodado) para prevenir deficiências.'
        }
    ],

    'calcogenios': [
        {
            question: 'Qual elemento forma 21% da atmosfera terrestre?',
            options: ['Oxigênio', 'Enxofre', 'Selênio', 'Telúrio'],
            correct: 0,
            explanation: 'O Oxigênio forma 21% do ar que respiramos e é essencial para a respiração e combustão.'
        },
        {
            question: 'Qual calcogênio queima com chama azul e é usado em fertilizantes?',
            options: ['Oxigênio', 'Enxofre', 'Selênio', 'Polônio'],
            correct: 1,
            explanation: 'O Enxofre queima com chama azul característica e é amplamente usado na produção de fertilizantes e ácido sulfúrico.'
        },
        {
            question: 'Qual calcogênio foi descoberto por Marie e Pierre Curie e é altamente radioativo?',
            options: ['Telúrio', 'Selênio', 'Polônio', 'Enxofre'],
            correct: 2,
            explanation: 'O Polônio é extremamente radioativo e perigoso, descoberto em 1898 por Marie e Pierre Curie.'
        }
    ],

    'familia-nitrogenio': [
        {
            question: 'Qual porcentagem da atmosfera é composta por Nitrogênio?',
            options: ['21%', '50%', '78%', '90%'],
            correct: 2,
            explanation: 'O Nitrogênio forma 78% da atmosfera terrestre e é essencial para proteínas e DNA.'
        },
        {
            question: 'Qual elemento desta família é essencial para DNA, RNA e ATP (energia celular)?',
            options: ['Nitrogênio', 'Fósforo', 'Arsênio', 'Bismuto'],
            correct: 1,
            explanation: 'O Fósforo é crucial para a vida, presente em DNA, RNA e ATP, a molécula que armazena energia nas células.'
        },
        {
            question: 'Qual elemento é historicamente conhecido como veneno?',
            options: ['Fósforo', 'Arsênio', 'Antimônio', 'Nitrogênio'],
            correct: 1,
            explanation: 'O Arsênio é historicamente famoso como veneno, embora também seja usado em semicondutores.'
        }
    ],

    'familia-carbono': [
        {
            question: 'Qual elemento é a base de toda vida orgânica na Terra?',
            options: ['Silício', 'Carbono', 'Germânio', 'Estanho'],
            correct: 1,
            explanation: 'O Carbono é a base de toda vida orgânica, formando mais compostos que qualquer outro elemento exceto hidrogênio.'
        },
        {
            question: 'Qual elemento é a base da indústria de semicondutores e chips eletrônicos?',
            options: ['Carbono', 'Silício', 'Germânio', 'Chumbo'],
            correct: 1,
            explanation: 'O Silício é o segundo elemento mais abundante na crosta terrestre e é fundamental para a indústria eletrônica.'
        },
        {
            question: 'Em quais formas o Carbono pode existir?',
            options: ['Apenas grafite', 'Apenas diamante', 'Diamante, grafite e grafeno', 'Apenas carvão'],
            correct: 2,
            explanation: 'O Carbono existe em várias formas alotrópicas: diamante (duro), grafite (macio) e grafeno (2D).'
        }
    ],

    'familia-boro': [
        {
            question: 'Qual é o metal mais abundante na crosta terrestre?',
            options: ['Boro', 'Alumínio', 'Gálio', 'Índio'],
            correct: 1,
            explanation: 'O Alumínio é o metal mais abundante na crosta terrestre, usado em embalagens, construção e aviação.'
        },
        {
            question: 'Qual elemento derrete na mão humana (ponto de fusão 29,76°C)?',
            options: ['Boro', 'Alumínio', 'Gálio', 'Tálio'],
            correct: 2,
            explanation: 'O Gálio tem ponto de fusão de apenas 29,76°C, derretendo literalmente na palma da mão.'
        },
        {
            question: 'Qual elemento desta família é usado em telas touchscreen e LCDs?',
            options: ['Boro', 'Alumínio', 'Índio', 'Tálio'],
            correct: 2,
            explanation: 'O Índio é usado em telas touchscreen, LCDs e LEDs devido às suas propriedades condutoras.'
        }
    ],

    'hidrogenio': [
        {
            question: 'Qual é o elemento mais abundante no universo?',
            options: ['Oxigênio', 'Carbono', 'Hidrogênio', 'Hélio'],
            correct: 2,
            explanation: 'O Hidrogênio é o elemento mais abundante no universo e é o combustível das estrelas.'
        },
        {
            question: 'Qual é a característica principal do Hidrogênio?',
            options: ['Mais pesado', 'Mais leve', 'Mais denso', 'Menos reativo'],
            correct: 1,
            explanation: 'O Hidrogênio é o elemento mais leve de todos, com apenas 1 próton e 1 elétron.'
        }
    ],

    'lantanideos': [
        {
            question: 'Como são chamados os lantanídeos?',
            options: ['Metais pesados', 'Terras raras', 'Gases nobres', 'Halogênios'],
            correct: 1,
            explanation: 'Os lantanídeos são conhecidos como "terras raras", embora não sejam tão raros quanto o nome sugere.'
        },
        {
            question: 'Qual lantanídeo é o mais abundante das terras raras?',
            options: ['Lantânio', 'Cério', 'Neodímio', 'Európio'],
            correct: 1,
            explanation: 'O Cério é a terra rara mais abundante e é usado em catalisadores automotivos.'
        },
        {
            question: 'Qual lantanídeo é usado em ímãs super potentes?',
            options: ['Lantânio', 'Samário', 'Neodímio', 'Gadolínio'],
            correct: 2,
            explanation: 'O Neodímio é usado para fabricar os ímãs permanentes mais potentes conhecidos.'
        }
    ],

    'actinideos': [
        {
            question: 'Qual é o combustível nuclear principal usado em reatores?',
            options: ['Actínio', 'Tório', 'Urânio', 'Plutônio'],
            correct: 2,
            explanation: 'O Urânio é o principal combustível nuclear usado em reatores e armas nucleares.'
        },
        {
            question: 'Qual actinídeo é usado em detectores de fumaça domésticos?',
            options: ['Plutônio', 'Amerício', 'Cúrio', 'Netúnio'],
            correct: 1,
            explanation: 'O Amerício é usado em detectores de fumaça residenciais devido à sua radiação alfa.'
        },
        {
            question: 'Qual foi o primeiro elemento transurânico sintetizado?',
            options: ['Plutônio', 'Netúnio', 'Amerício', 'Cúrio'],
            correct: 1,
            explanation: 'O Netúnio foi o primeiro elemento transurânico (além do urânio) a ser sintetizado, em 1940.'
        }
    ],

    // Adicione perguntas para os outros grupos conforme necessário
    'default': [
        {
            question: 'Qual propriedade caracteriza esta família de elementos?',
            options: ['Alta reatividade', 'Propriedades semelhantes', 'Diferentes estados físicos', 'Todas as anteriores'],
            correct: 3,
            explanation: 'Elementos de uma mesma família compartilham propriedades químicas semelhantes devido à configuração eletrônica.'
        }
    ]
};

// Função auxiliar para obter perguntas de uma família
function getQuizQuestions(familyKey) {
    return QUIZ_QUESTIONS[familyKey] || QUIZ_QUESTIONS['default'];
}

// Função para selecionar uma pergunta aleatória
function getRandomQuestion(familyKey) {
    const questions = getQuizQuestions(familyKey);
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}
