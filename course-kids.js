// Детский режим (7 лет). Часть 1 — алфавит с плитками.
// letters: буква → { name: как называется по-русски, sound: основной звук через русскую подсказку,
//                    word, emoji, ru: слово-пример; noFirst: слово начинается не с этой буквы }
// words:   слова для «Собери слово» и «Вставь слово»: [эмодзи, по-русски, можно ли «I like the ___»]
// lessons: буквы занятия, слова для сборки (только из пройденных букв), фраза для «Собери фразу»
window.KIDS = {
  letters: {
    A: { name: 'эй', sound: 'Э, рот пошире', word: 'apple', emoji: '🍎', ru: 'яблоко' },
    B: { name: 'би', sound: 'Б', word: 'ball', emoji: '⚽', ru: 'мяч' },
    C: { name: 'си', sound: 'К', word: 'cat', emoji: '🐱', ru: 'кошка' },
    D: { name: 'ди', sound: 'Д', word: 'dog', emoji: '🐶', ru: 'собака' },
    E: { name: 'и', sound: 'Э', word: 'egg', emoji: '🥚', ru: 'яйцо' },
    F: { name: 'эф', sound: 'Ф', word: 'fish', emoji: '🐟', ru: 'рыба' },
    G: { name: 'джи', sound: 'Г', word: 'grapes', emoji: '🍇', ru: 'виноград' },
    H: { name: 'эйч', sound: 'лёгкий выдох «х-х»', word: 'hat', emoji: '🎩', ru: 'шляпа' },
    I: { name: 'ай', sound: 'короткое И', word: 'insect', emoji: '🐛', ru: 'жучок' },
    J: { name: 'джей', sound: 'ДЖ', word: 'juice', emoji: '🧃', ru: 'сок' },
    K: { name: 'кей', sound: 'К', word: 'key', emoji: '🔑', ru: 'ключ' },
    L: { name: 'эл', sound: 'Л', word: 'lion', emoji: '🦁', ru: 'лев' },
    M: { name: 'эм', sound: 'М', word: 'moon', emoji: '🌙', ru: 'луна' },
    N: { name: 'эн', sound: 'Н', word: 'nose', emoji: '👃', ru: 'нос' },
    O: { name: 'оу', sound: 'О', word: 'octopus', emoji: '🐙', ru: 'осьминог' },
    P: { name: 'пи', sound: 'П', word: 'pig', emoji: '🐷', ru: 'поросёнок' },
    Q: { name: 'кью', sound: 'КВ', word: 'queen', emoji: '👸', ru: 'королева' },
    R: { name: 'ар', sound: 'Р, но язык не дрожит', word: 'rabbit', emoji: '🐰', ru: 'кролик' },
    S: { name: 'эс', sound: 'С', word: 'sun', emoji: '☀️', ru: 'солнце' },
    T: { name: 'ти', sound: 'Т', word: 'tiger', emoji: '🐯', ru: 'тигр' },
    U: { name: 'ю', sound: 'короткое А', word: 'umbrella', emoji: '☂️', ru: 'зонтик' },
    V: { name: 'ви', sound: 'В', word: 'violin', emoji: '🎻', ru: 'скрипка' },
    W: { name: 'дабл-ю', sound: 'У-В, губы трубочкой', word: 'watermelon', emoji: '🍉', ru: 'арбуз' },
    X: { name: 'экс', sound: 'КС, обычно в конце слова', word: 'fox', emoji: '🦊', ru: 'лиса', noFirst: true },
    Y: { name: 'уай', sound: 'Й', word: 'yellow', emoji: '💛', ru: 'жёлтый' },
    Z: { name: 'зи', sound: 'З', word: 'zebra', emoji: '🦓', ru: 'зебра' }
  },
  words: {
    dad: ['👨', 'папа'], cab: ['🚕', 'такси', 1],
    bed: ['🛏️', 'кровать', 1], bag: ['👜', 'сумка', 1], egg: ['🥚', 'яйцо', 1],
    leg: ['🦵', 'нога'], kid: ['🧒', 'ребёнок'], ice: ['🧊', 'лёд', 1],
    dog: ['🐶', 'собака', 1], mom: ['👩', 'мама'], map: ['🗺️', 'карта', 1], pen: ['🖊️', 'ручка', 1],
    cat: ['🐱', 'кошка', 1], red: ['🔴', 'красный'], star: ['⭐', 'звезда', 1], tree: ['🌳', 'дерево', 1],
    bus: ['🚌', 'автобус', 1], sun: ['☀️', 'солнце', 1], cup: ['☕', 'чашка', 1], box: ['📦', 'коробка', 1],
    toy: ['🧸', 'игрушка', 1], boy: ['👦', 'мальчик']
  },
  // Предметы-примеры к буквам тоже годятся для «I like the ___»
  gapLetters: 'ABCDEFGHIJKLMNOPQRSTUVWZ',
  gaps: [['I like the ___.', 'Мне нравится'], ['I see the ___.', 'Я вижу'], ['Look at the ___!', 'Посмотри на']],
  lessons: [
    { id: 'ka1', letters: 'ABCD', words: ['dad', 'cab'], phrase: ['My name is {name}.', 'Меня зовут {name}.'] },
    { id: 'ka2', letters: 'EFGH', words: ['bed', 'bag', 'egg'], phrase: ['Hello, I am {name}.', 'Привет, я {name}.'] },
    { id: 'ka3', letters: 'IJKL', words: ['leg', 'kid', 'ice'], phrase: ['I am seven.', 'Мне семь лет.'] },
    { id: 'ka4', letters: 'MNOP', words: ['dog', 'mom', 'map', 'pen'], phrase: ['I like my dog.', 'Я люблю свою собаку.'] },
    { id: 'ka5', letters: 'QRST', words: ['cat', 'red', 'star', 'tree'], phrase: ['I see a cat.', 'Я вижу кошку.'] },
    { id: 'ka6', letters: 'UVWX', words: ['bus', 'sun', 'cup', 'box'], phrase: ['Thank you very much!', 'Большое спасибо!'] },
    { id: 'ka7', letters: 'YZ', words: ['toy', 'boy'], phrase: ['I love you, mom.', 'Я люблю тебя, мама.'] },
    { id: 'ka8', check: true, title: 'Буквенная проверка' }
  ],
  stickers: ['🦄', '🐼', '🦋', '🐬', '🐢', '🦒', '🐨', '🐧', '🐞', '🌈', '🍩', '🎈', '🚀', '🌟', '🍓', '🦖', '🐳', '🍦', '🎀', '🧁', '🐝', '🌻', '🐸', '🦜', '🎠', '🏰', '⛄', '🐹', '🦩', '🍭'],
  praise: ['Молодец!', 'Супер!', 'Ура, правильно!', 'Умница!', 'Здорово!', 'Отлично!'],
  tryAgain: ['Попробуй ещё!', 'Почти! Ещё разок!', 'Не страшно, попробуй ещё!']
};
