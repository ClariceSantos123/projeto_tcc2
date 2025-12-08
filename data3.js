/**
 * =============================================
 * DADOS DOS ELEMENTOS QUÍMICOS - PARTE 3
 * Metais de Transição (8-12), Lantanídeos e Actinídeos
 * + Configurações do Sistema
 * =============================================
 * 
 * INSTRUÇÕES:
 * 1. Salve este arquivo como: data3.js
 * 2. Coloque na mesma pasta que index.html, data.js e data2.js
 * 3. Este é o ÚLTIMO arquivo de dados
 * 4. Certifique-se que está em UTF-8
 */

Object.assign(FAMILIES_DATA, {

    'metais-transicao-ferro': {
        name: 'Série do Ferro',
        group: 8,
        icon: '🔨',
        multiGroup: true,
        elements: [
            { number: 26, symbol: 'Fe', name: 'Ferro', mass: '55.845', period: 4, group: 8,
              description: 'Metal mais usado pela humanidade. Essencial para aço.',
              properties: 'Metal cinza prateado, maleável e magnético.',
              discovery: 'Usado desde a pré-história.' },
            { number: 27, symbol: 'Co', name: 'Cobalto', mass: '58.933', period: 4, group: 9,
              description: 'Usado em baterias de lítio-íon e pigmentos azuis.',
              properties: 'Metal duro, ferromagnético, azul-acinzentado.',
              discovery: 'Descoberto em 1735 por Georg Brandt.' },
            { number: 28, symbol: 'Ni', name: 'Níquel', mass: '58.693', period: 4, group: 10,
              description: 'Usado em aço inoxidável, baterias e moedas.',
              properties: 'Metal prateado duro e maleável. Magnético.',
              discovery: 'Isolado em 1751 por Axel Fredrik Cronstedt.' }
        ]
    },

    'metais-cunhagem': {
        name: 'Metais de Cunhagem',
        group: 11,
        icon: '💰',
        elements: [
            { number: 29, symbol: 'Cu', name: 'Cobre', mass: '63.546', period: 4, group: 11,
              description: 'Excelente condutor. Usado em fios, tubulações e moedas.',
              properties: 'Metal avermelhado, maleável e dúctil.',
              discovery: 'Usado desde 8000 a.C.' },
            { number: 47, symbol: 'Ag', name: 'Prata', mass: '107.868', period: 5, group: 11,
              description: 'Melhor condutor elétrico. Usado em joias e eletrônicos.',
              properties: 'Metal branco brilhante, maleável e dúctil.',
              discovery: 'Conhecida desde a antiguidade.' },
            { number: 79, symbol: 'Au', name: 'Ouro', mass: '196.967', period: 6, group: 11,
              description: 'Metal precioso. Usado em joias, reservas financeiras e eletrônicos.',
              properties: 'Metal amarelo brilhante. Não oxida ou corrói.',
              discovery: 'Usado desde a pré-história.' }
        ]
    },

    'grupo-zinco': {
        name: 'Grupo do Zinco',
        group: 12,
        icon: '⚗️',
        elements: [
            { number: 30, symbol: 'Zn', name: 'Zinco', mass: '65.38', period: 4, group: 12,
              description: 'Usado em galvanização, baterias e como nutriente.',
              properties: 'Metal azul-prateado, moderadamente reativo.',
              discovery: 'Isolado em 1746 por Andreas Marggraf.' },
            { number: 48, symbol: 'Cd', name: 'Cádmio', mass: '112.411', period: 5, group: 12,
              description: 'Usado em baterias e pigmentos. Tóxico.',
              properties: 'Metal prateado-azulado, macio.',
              discovery: 'Descoberto em 1817 por Friedrich Stromeyer.' },
            { number: 80, symbol: 'Hg', name: 'Mercúrio', mass: '200.59', period: 6, group: 12,
              description: 'Único metal líquido à temperatura ambiente.',
              properties: 'Metal prateado líquido. Tóxico.',
              discovery: 'Conhecido desde a antiguidade.' }
        ]
    },

    'metais-platina': {
        name: 'Metais da Platina',
        group: 10,
        icon: '💍',
        multiGroup: true,
        elements: [
            { number: 44, symbol: 'Ru', name: 'Rutênio', mass: '101.07', period: 5, group: 8,
              description: 'Usado em catalisadores e contatos elétricos.',
              properties: 'Metal branco prateado duro e raro.',
              discovery: 'Descoberto em 1844 por Karl Ernst Claus.' },
            { number: 45, symbol: 'Rh', name: 'Ródio', mass: '102.906', period: 5, group: 9,
              description: 'Metal mais caro. Usado em catalisadores automotivos.',
              properties: 'Metal branco prateado, altamente reflexivo.',
              discovery: 'Descoberto em 1803 por William Hyde Wollaston.' },
            { number: 46, symbol: 'Pd', name: 'Paládio', mass: '106.42', period: 5, group: 10,
              description: 'Usado em catalisadores, eletrônicos e joias.',
              properties: 'Metal branco prateado maleável.',
              discovery: 'Descoberto em 1803 por William Hyde Wollaston.' },
            { number: 76, symbol: 'Os', name: 'Ósmio', mass: '190.23', period: 6, group: 8,
              description: 'Metal mais denso. Usado em ligas de alta resistência.',
              properties: 'Metal azul-acinzentado denso. Densidade: 22,59 g/cm³.',
              discovery: 'Descoberto em 1803 por Smithson Tennant.' },
            { number: 77, symbol: 'Ir', name: 'Irídio', mass: '192.217', period: 6, group: 9,
              description: 'Segundo metal mais denso. Usado em velas de ignição.',
              properties: 'Metal branco prateado duro e quebradiço.',
              discovery: 'Descoberto em 1803 por Smithson Tennant.' },
            { number: 78, symbol: 'Pt', name: 'Platina', mass: '195.084', period: 6, group: 10,
              description: 'Metal precioso. Usado em catalisadores, joias e medicina.',
              properties: 'Metal branco prateado denso. Não oxida.',
              discovery: 'Conhecida por povos pré-colombianos.' }
        ]
    },

    'lantanideos': {
        name: 'Lantanídeos (Terras Raras)',
        group: 'Ln',
        icon: '🌟',
        multiGroup: true,
        elements: [
            { number: 57, symbol: 'La', name: 'Lantânio', mass: '138.905', period: 6, group: 3,
              description: 'Usado em lentes de câmeras e baterias híbridas.',
              properties: 'Metal prateado macio. Oxida rapidamente.',
              discovery: 'Descoberto em 1839 por Carl Gustaf Mosander.' },
            { number: 58, symbol: 'Ce', name: 'Cério', mass: '140.116', period: 6, group: 3,
              description: 'Terra rara mais abundante. Usado em catalisadores.',
              properties: 'Metal prateado macio e dúctil.',
              discovery: 'Descoberto em 1803.' },
            { number: 59, symbol: 'Pr', name: 'Praseodímio', mass: '140.908', period: 6, group: 3,
              description: 'Usado em ímãs permanentes e lentes.',
              properties: 'Metal prateado macio e maleável.',
              discovery: 'Descoberto em 1885.' },
            { number: 60, symbol: 'Nd', name: 'Neodímio', mass: '144.242', period: 6, group: 3,
              description: 'Usado em ímãs super potentes e lasers.',
              properties: 'Metal prateado brilhante.',
              discovery: 'Descoberto em 1885.' },
            { number: 61, symbol: 'Pm', name: 'Promécio', mass: '145', period: 6, group: 3,
              description: 'Elemento radioativo. Usado em baterias nucleares.',
              properties: 'Metal radioativo.',
              discovery: 'Sintetizado em 1945.' },
            { number: 62, symbol: 'Sm', name: 'Samário', mass: '150.36', period: 6, group: 3,
              description: 'Usado em ímãs permanentes e lasers.',
              properties: 'Metal prateado moderadamente duro.',
              discovery: 'Descoberto em 1879.' },
            { number: 63, symbol: 'Eu', name: 'Európio', mass: '151.964', period: 6, group: 3,
              description: 'Usado em fósforos de telas de TV e LEDs.',
              properties: 'Metal prateado macio.',
              discovery: 'Descoberto em 1901.' },
            { number: 64, symbol: 'Gd', name: 'Gadolínio', mass: '157.25', period: 6, group: 3,
              description: 'Usado em ressonância magnética e ímãs.',
              properties: 'Metal prateado maleável.',
              discovery: 'Descoberto em 1880.' },
            { number: 65, symbol: 'Tb', name: 'Térbio', mass: '158.925', period: 6, group: 3,
              description: 'Usado em fósforos verdes e lasers.',
              properties: 'Metal prateado macio.',
              discovery: 'Descoberto em 1843.' },
            { number: 66, symbol: 'Dy', name: 'Disprósio', mass: '162.500', period: 6, group: 3,
              description: 'Usado em lasers e ímãs permanentes.',
              properties: 'Metal prateado brilhante.',
              discovery: 'Descoberto em 1886.' },
            { number: 67, symbol: 'Ho', name: 'Hólmio', mass: '164.930', period: 6, group: 3,
              description: 'Usado em lasers médicos e ímãs.',
              properties: 'Metal prateado macio.',
              discovery: 'Descoberto em 1878.' },
            { number: 68, symbol: 'Er', name: 'Érbio', mass: '167.259', period: 6, group: 3,
              description: 'Usado em fibras ópticas e lasers.',
              properties: 'Metal prateado macio.',
              discovery: 'Descoberto em 1843.' },
            { number: 69, symbol: 'Tm', name: 'Túlio', mass: '168.934', period: 6, group: 3,
              description: 'Segundo elemento mais raro das terras raras.',
              properties: 'Metal prateado macio.',
              discovery: 'Descoberto em 1879.' },
            { number: 70, symbol: 'Yb', name: 'Itérbio', mass: '173.045', period: 6, group: 3,
              description: 'Usado em lasers e relógios atômicos.',
              properties: 'Metal prateado macio.',
              discovery: 'Descoberto em 1878.' },
            { number: 71, symbol: 'Lu', name: 'Lutécio', mass: '174.967', period: 6, group: 3,
              description: 'Terra rara mais cara.',
              properties: 'Metal prateado duro e denso.',
              discovery: 'Descoberto em 1907.' }
        ]
    },

    'actinideos': {
        name: 'Actinídeos (Radioativos)',
        group: 'An',
        icon: '☢️',
        multiGroup: true,
        elements: [
            { number: 89, symbol: 'Ac', name: 'Actínio', mass: '227', period: 7, group: 3,
              description: 'Elemento radioativo. Usado em geradores de nêutrons.',
              properties: 'Metal prateado radioativo.',
              discovery: 'Descoberto em 1899.' },
            { number: 90, symbol: 'Th', name: 'Tório', mass: '232.038', period: 7, group: 3,
              description: 'Usado em lâmpadas de gás e reatores nucleares.',
              properties: 'Metal radioativo prateado.',
              discovery: 'Descoberto em 1828.' },
            { number: 91, symbol: 'Pa', name: 'Protactínio', mass: '231.036', period: 7, group: 3,
              description: 'Elemento radioativo raro.',
              properties: 'Metal prateado radioativo.',
              discovery: 'Descoberto em 1913.' },
            { number: 92, symbol: 'U', name: 'Urânio', mass: '238.029', period: 7, group: 3,
              description: 'Combustível nuclear principal.',
              properties: 'Metal prateado denso e radioativo.',
              discovery: 'Descoberto em 1789.' },
            { number: 93, symbol: 'Np', name: 'Netúnio', mass: '237', period: 7, group: 3,
              description: 'Primeiro elemento transurânico.',
              properties: 'Metal prateado radioativo.',
              discovery: 'Sintetizado em 1940.' },
            { number: 94, symbol: 'Pu', name: 'Plutônio', mass: '244', period: 7, group: 3,
              description: 'Usado em armas e reatores nucleares.',
              properties: 'Metal prateado radioativo.',
              discovery: 'Sintetizado em 1940.' }
        ]
    }
});

/**
 * Estrutura da Tabela Periódica
 */
const TABLE_STRUCTURE = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 18],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 18],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
];

/**
 * Configurações de dicas por grupo
 */
const HINTS_CONFIG = {
    18: { title: 'Gases Nobres', tips: ['Última coluna (grupo 18)', 'Estáveis e inertes', 'He período 1, Rn período 6'] },
    1: { title: 'Metais Alcalinos', tips: ['Primeira coluna (grupo 1)', 'Muito reativos com água', 'Li período 2, Fr período 7'] },
    2: { title: 'Metais Alcalino-Terrosos', tips: ['Segunda coluna (grupo 2)', 'Menos reativos que alcalinos', 'Be período 2, Ra período 7'] },
    17: { title: 'Halogênios', tips: ['Penúltima coluna (grupo 17)', 'Formadores de sais', 'F período 2, At período 6'] },
    16: { title: 'Calcogênios', tips: ['Grupo 16', 'Incluem o oxigênio', 'O período 2, Po período 6'] },
    15: { title: 'Família do Nitrogênio', tips: ['Grupo 15', 'N forma 78% do ar', 'N período 2, Bi período 6'] },
    14: { title: 'Família do Carbono', tips: ['Grupo 14', 'Base da vida orgânica', 'C período 2, Pb período 6'] },
    13: { title: 'Família do Boro', tips: ['Grupo 13', 'Al é o metal mais abundante', 'B período 2, Tl período 6'] },
    3: { title: 'Grupo do Escândio', tips: ['Grupo 3', 'Metais de transição leves', 'Sc período 4, Y período 5'] },
    4: { title: 'Grupo do Titânio', tips: ['Grupo 4', 'Metais resistentes', 'Ti período 4, Hf período 6'] },
    5: { title: 'Grupo do Vanádio', tips: ['Grupo 5', 'Usados em ligas', 'V período 4, Ta período 6'] },
    6: { title: 'Grupo do Cromo', tips: ['Grupo 6', 'W tem maior ponto de fusão', 'Cr período 4, W período 6'] },
    7: { title: 'Grupo do Manganês', tips: ['Grupo 7', 'Tc foi o primeiro artificial', 'Mn período 4, Re período 6'] },
    11: { title: 'Metais de Cunhagem', tips: ['Grupo 11', 'Metais preciosos', 'Cu período 4, Au período 6'] },
    12: { title: 'Grupo do Zinco', tips: ['Grupo 12', 'Hg é líquido à temp. ambiente', 'Zn período 4, Hg período 6'] },
    'Ln': { title: 'Lantanídeos', tips: ['Terras raras', 'Período 6', 'La (57) até Lu (71)'] },
    'An': { title: 'Actinídeos', tips: ['Elementos radioativos', 'Período 7', 'Ac (89) até Pu (94)'] },
    'multi': { title: 'Múltiplos Grupos', tips: ['Metais de transição', 'Observe período e grupo', 'Número atômico crescente'] }
};
