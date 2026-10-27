// Общая база для всех взрослых программ и подростка.
// Форматы:
//   words:   [английский, русский, подсказка произношения, {say, kind}]
//   phrases: [английский, русский]
//   build:   [русский, английский] — собрать фразу из слов
//   gaps:    [предложение с ___, ответ, [варианты], перевод]
//   dialog:  строки ["npc", англ, рус] и ["me", задание по-русски, образец, [допустимые ответы]]
//            образец может быть объектом {welder, life, school}; * — любые слова
window.COURSE = window.COURSE || { lessons: {} };

Object.assign(window.COURSE.lessons, {

c1: {
  track: "common", title: "Привет! Знакомство",
  goal: "Поздороваться, назвать себя, спросить имя и попрощаться.",
  theory: [
    { h: "Как здороваются в Америке",
      t: "<b>Hi</b> (хай) — самое частое «привет». В Америке так здороваются почти со всеми, даже с начальником. <b>Hello</b> — чуть официальнее. Ещё говорят по времени суток: утром <b>Good morning</b>, днём <b>Good afternoon</b>, вечером <b>Good evening</b>.",
      ex: [["Hi!", "Привет!"], ["Hello!", "Здравствуйте!"], ["Good morning!", "Доброе утро!"]] },
    { h: "Как представиться",
      t: "<b>My name is …</b> — меня зовут… Короче и разговорнее: <b>I'm …</b> (айм) — я… Оба варианта правильные.",
      ex: [["My name is Oleg.", "Меня зовут Олег."], ["I'm Anna.", "Я Анна."]] },
    { h: "«Ты» и «вы» — одно слово",
      t: "В английском нет разницы между «ты» и «вы»: <b>you</b> (ю) — это и то, и другое. Вежливость передают словами <b>please</b> и <b>thank you</b>.",
      ex: [["What's your name?", "Как тебя (вас) зовут?"]] },
    { h: "How are you? — это не вопрос о жизни",
      t: "Американцы спрашивают <b>How are you?</b> постоянно — в магазине, на работе, на заправке. Это просто часть приветствия. Подробно отвечать не нужно, достаточно: <b>I'm good, thanks. And you?</b>",
      ex: [["How are you?", "Как дела?"], ["I'm good, thanks. And you?", "Хорошо, спасибо. А у вас?"], ["Nice to meet you.", "Приятно познакомиться."]] }
  ],
  words: [
    ["hi", "привет", "хай"],
    ["hello", "здравствуйте", "хэлОу"],
    ["good morning", "доброе утро", "гуд мОрнинг"],
    ["good afternoon", "добрый день", "гуд эфтэрнУн"],
    ["good evening", "добрый вечер", "гуд Ивнинг"],
    ["bye", "пока", "бай"],
    ["name", "имя", "нэйм"],
    ["my", "мой, моя", "май"],
    ["your", "твой, ваш", "ёр"],
    ["nice", "приятный, хороший", "найс"],
    ["thanks", "спасибо", "сэнкс — кончик языка между зубами"],
    ["yes", "да", "йес"],
    ["no", "нет", "ноу"]
  ],
  phrases: [
    ["My name is {name}.", "Меня зовут {name}."],
    ["What's your name?", "Как вас зовут?"],
    ["Nice to meet you.", "Приятно познакомиться."],
    ["Nice to meet you too.", "Мне тоже приятно познакомиться."],
    ["How are you?", "Как дела?"],
    ["I'm good, thanks. And you?", "Хорошо, спасибо. А у вас?"],
    ["See you later.", "Увидимся позже."]
  ],
  build: [
    ["Меня зовут Анна.", "My name is Anna."],
    ["Как вас зовут?", "What's your name?"],
    ["Приятно познакомиться.", "Nice to meet you."],
    ["Хорошо, спасибо. А у вас?", "I'm good, thanks. And you?"]
  ],
  gaps: [
    ["My ___ is Oleg.", "name", ["name", "nice", "good"], "Меня зовут Олег."],
    ["Good ___! — утром", "morning", ["morning", "evening", "bye"], "Доброе утро!"]
  ],
  dialog: { title: "Знакомство с соседом", setting: "Вы во дворе нового дома в Техасе. К вам подходит сосед.",
    lines: [
      ["npc", "Hi! I'm Mike.", "Привет! Я Майк."],
      ["me", "Поздоровайтесь и назовите своё имя", "Hi! I'm {name}.", ["hi i am *", "hi my name is *", "hello i am *", "hello my name is *", "my name is *", "i am *"]],
      ["npc", "Nice to meet you, {name}.", "Приятно познакомиться, {name}."],
      ["me", "Ответьте: мне тоже приятно познакомиться", "Nice to meet you too.", ["nice to meet you too", "nice to meet you"]],
      ["npc", "How are you?", "Как дела?"],
      ["me", "Скажите, что всё хорошо, и спросите в ответ", "I'm good, thanks. And you?", ["i am good thanks and you", "i am good and you", "good thanks and you", "i am fine thanks and you", "i am good thanks", "i am fine and you"]],
      ["npc", "I'm great! See you later.", "Отлично! Ещё увидимся."],
      ["me", "Попрощайтесь", "Bye! See you.", ["bye", "goodbye", "bye see you", "see you later", "see you", "bye see you later"]]
    ] },
  ai: "Ты мой новый сосед в Техасе, мы знакомимся во дворе."
},

c2: {
  track: "common", title: "Переспросить и не потеряться",
  goal: "Главный навык новичка: попросить повторить, говорить медленнее или написать.",
  theory: [
    { h: "Это самый важный урок",
      t: "Вас будут спрашивать быстро и непонятно — это нормально. Тот, кто умеет переспросить, всегда договорится. Выучите эти фразы так, чтобы они вылетали сами.",
      ex: [["Sorry?", "Простите? Что-что?"], ["Can you repeat that, please?", "Можете повторить, пожалуйста?"], ["Slowly, please.", "Медленнее, пожалуйста."]] },
    { h: "Sorry — универсальное слово",
      t: "<b>Sorry</b> (сОри) значит и «извините», и «не расслышал, повторите». Скажите его с вопросительной интонацией — и вам повторят.",
      ex: [["Sorry, I don't understand.", "Извините, я не понимаю."], ["I speak a little English.", "Я немного говорю по-английски."]] },
    { h: "Please — в конце",
      t: "<b>Please</b> (плиз) — «пожалуйста». Обычно его ставят в конце просьбы. Без please просьба звучит грубовато.",
      ex: [["Can you write it, please?", "Можете написать, пожалуйста?"], ["One more time, please.", "Ещё раз, пожалуйста."]] },
    { h: "Когда не знаете слово",
      t: "<b>What does it mean?</b> — что это значит? <b>How do you say … in English?</b> — как сказать … по-английски? Можно назвать слово по-русски или показать рукой.",
      ex: [["What does it mean?", "Что это значит?"], ["How do you say it in English?", "Как это сказать по-английски?"]] }
  ],
  words: [
    ["sorry", "извините; что-что?", "сОри"],
    ["please", "пожалуйста", "плиз"],
    ["repeat", "повторить", "рипИт"],
    ["slowly", "медленно", "слОули"],
    ["understand", "понимать", "андэрстЭнд"],
    ["speak", "говорить", "спик"],
    ["a little", "немного", "э литл"],
    ["English", "английский", "Инглиш"],
    ["write", "писать", "райт"],
    ["again", "снова, ещё раз", "эгЭн"],
    ["mean", "значить", "мин"],
    ["say", "сказать", "сэй"]
  ],
  phrases: [
    ["Sorry?", "Простите? Что-что?"],
    ["Can you repeat that, please?", "Можете повторить, пожалуйста?"],
    ["Slowly, please.", "Медленнее, пожалуйста."],
    ["I don't understand.", "Я не понимаю."],
    ["I speak a little English.", "Я немного говорю по-английски."],
    ["Can you write it, please?", "Можете написать, пожалуйста?"],
    ["What does it mean?", "Что это значит?"],
    ["One more time, please.", "Ещё раз, пожалуйста."]
  ],
  build: [
    ["Я не понимаю.", "I don't understand."],
    ["Медленнее, пожалуйста.", "Slowly, please."],
    ["Я немного говорю по-английски.", "I speak a little English."],
    ["Можете повторить, пожалуйста?", "Can you repeat that, please?"]
  ],
  gaps: [
    ["I ___ a little English.", "speak", ["speak", "say", "mean"], "Я немного говорю по-английски."],
    ["What does it ___?", "mean", ["mean", "write", "repeat"], "Что это значит?"]
  ],
  dialog: { title: "В офисе", setting: "Вы пришли в офис, сотрудник говорит быстро.",
    lines: [
      ["npc", "Good morning! How can I help you?", "Доброе утро! Чем могу помочь?"],
      ["me", "Скажите, что немного говорите по-английски", "Sorry, I speak a little English.", ["i speak a little english", "sorry i speak a little english", "sorry i speak a little english please"]],
      ["npc", "OK, no problem. What's your last name?", "Хорошо, без проблем. Какая у вас фамилия?"],
      ["me", "Попросите повторить медленнее", "Can you repeat that, please? Slowly, please.", ["can you repeat that please", "slowly please", "can you repeat please", "sorry slowly please", "can you speak slowly please", "one more time please", "can you repeat that please slowly please", "repeat please"]],
      ["npc", "Your last name. Your family name.", "Ваша фамилия."],
      ["me", "Скажите, что не понимаете, и попросите написать", "I don't understand. Can you write it, please?", ["i do not understand can you write it please", "i do not understand", "can you write it please", "sorry i do not understand"]],
      ["npc", "Sure. Here: LAST NAME.", "Конечно. Вот: LAST NAME (фамилия)."],
      ["me", "Скажите «Спасибо, понимаю»", "Thank you. I understand.", ["thank you i understand", "thanks i understand", "ok i understand", "ok thank you", "thank you"]]
    ] },
  ai: "Ты сотрудник офиса и говоришь со мной чуть быстрее, чем я понимаю. Моя задача — переспрашивать: Sorry?, Can you repeat that, please?, Slowly, please, Can you write it, please?. Каждый раз, когда я переспрашиваю правильно, говори проще."
},

c3: {
  track: "common", title: "Алфавит: продиктовать имя",
  goal: "Назвать буквы и продиктовать своё имя по буквам — в Америке это просят везде.",
  alphabet: true,
  theory: [
    { h: "Зачем алфавит взрослому",
      t: "В США имена очень разные, поэтому в любом офисе, банке, у врача вас попросят: <b>Can you spell it?</b> — продиктуйте по буквам. Это нужно буквально каждый день.",
      ex: [["How do you spell it?", "Как это пишется?"], ["Can you spell your name?", "Продиктуйте имя по буквам."]] },
    { h: "Буквы, которые путают русские",
      t: "<b>A</b> — эй, <b>E</b> — и, <b>I</b> — ай. <b>G</b> — джи, <b>J</b> — джей. <b>H</b> — эйч, <b>R</b> — ар, <b>Y</b> — уай, <b>W</b> — дабл-ю, <b>Z</b> — зи (так в Америке). Именно на них чаще всего ошибаются, когда диктуют.",
      ex: [] },
    { h: "Двойные буквы",
      t: "Если буква повторяется, говорят <b>double</b>: Anna — A, double N, A.",
      ex: [["A, double N, A.", "А, две Н, А."]] },
    { h: "Имя и фамилия",
      t: "<b>first name</b> — имя, <b>last name</b> — фамилия. Отчества в Америке нет, в анкетах его обычно не пишут. Ваше имя пишите как в загранпаспорте.",
      ex: [["My first name is {name}.", "Моё имя — {name}."], ["My last name is Ivanov.", "Моя фамилия — Иванов."]] }
  ],
  words: [
    ["A", "буква A", "эй", { kind: "letter" }],
    ["E", "буква E", "и", { kind: "letter" }],
    ["I", "буква I", "ай", { kind: "letter" }],
    ["G", "буква G", "джи", { kind: "letter" }],
    ["J", "буква J", "джей", { kind: "letter" }],
    ["H", "буква H", "эйч", { kind: "letter" }],
    ["R", "буква R", "ар", { kind: "letter" }],
    ["Y", "буква Y", "уай", { kind: "letter" }],
    ["W", "буква W", "дабл-ю", { kind: "letter" }],
    ["Z", "буква Z", "зи", { kind: "letter" }],
    ["spell", "произнести по буквам", "спэл"],
    ["first name", "имя", "фёрст нэйм"],
    ["last name", "фамилия", "ласт нэйм"],
    ["letter", "буква", "лЕтэр"]
  ],
  phrases: [
    ["How do you spell it?", "Как это пишется?"],
    ["Can you spell your last name?", "Продиктуйте фамилию по буквам."],
    ["My first name is {name}.", "Моё имя — {name}."],
    ["Is that right?", "Правильно?"],
    ["Yes, that's right.", "Да, правильно."]
  ],
  build: [
    ["Как это пишется?", "How do you spell it?"],
    ["Да, правильно.", "Yes, that's right."],
    ["Моё имя — Анна.", "My first name is Anna."]
  ],
  gaps: [
    ["How do you ___ it?", "spell", ["spell", "speak", "mean"], "Как это пишется?"],
    ["My ___ name is Ivanov.", "last", ["last", "first", "good"], "Моя фамилия — Иванов."]
  ],
  dialog: { title: "Записывают ваше имя", setting: "Вы в банке, сотрудник заполняет анкету.",
    lines: [
      ["npc", "What's your first name?", "Как ваше имя?"],
      ["me", "Назовите имя", "My first name is {name}.", ["my first name is *", "my name is *", "it is *", "i am *", "*"]],
      ["npc", "Can you spell it, please?", "Продиктуйте по буквам, пожалуйста."],
      ["me", "Продиктуйте своё имя по буквам", "{spelled}", ["{spellname}"]],
      ["npc", "Thank you. Is that right?", "Спасибо. Правильно?"],
      ["me", "Ответьте: да, правильно", "Yes, that's right.", ["yes that is right", "yes", "yes it is right", "yes that is correct", "yes right"]]
    ] },
  ai: "Ты сотрудник банка и заполняешь мою анкету. Спроси моё имя и фамилию и попроси продиктовать их по буквам. Специально путай иногда одну букву, чтобы я тебя поправил."
},

c4: {
  track: "common", title: "Я, ты, он: глагол to be",
  goal: "Сказать, кто вы и кем работаете: I am a welder.",
  theory: [
    { h: "В английском нельзя без глагола",
      t: "По-русски мы говорим «Я сварщик». По-английски так нельзя — нужен глагол-связка <b>to be</b> («быть»): <b>I am a welder</b> — дословно «я есть сварщик».",
      ex: [["I am a welder.", "Я сварщик."], ["She is a nurse.", "Она медсестра."]] },
    { h: "Три формы: am, is, are",
      t: "<b>I am</b> — я.<br><b>he is / she is / it is</b> — он, она, оно.<br><b>you are / we are / they are</b> — ты, вы, мы, они.<br>В разговоре сокращают: I'm, he's, she's, you're, we're, they're.",
      ex: [["I'm a driver.", "Я водитель."], ["He's my husband.", "Он мой муж."], ["We are from Russia.", "Мы из России."]] },
    { h: "Маленькое слово a перед профессией",
      t: "Перед профессией (одним человеком) ставят <b>a</b>: a welder, a cook. Если слово начинается с гласного звука — <b>an</b>: an engineer. Пока просто запомните: профессия — с a.",
      ex: [["I am a mechanic.", "Я механик."], ["He is an engineer.", "Он инженер."]] },
    { h: "Как спрашивают о работе",
      t: "<b>What do you do?</b> — дословно «Что ты делаешь?», но значит «Кем ты работаешь?». Это один из первых вопросов при знакомстве в Америке.",
      ex: [["What do you do?", "Кем вы работаете?"], ["I'm a student.", "Я ученик / студент."]] }
  ],
  words: [
    ["he", "он", "хи"],
    ["she", "она", "щи"],
    ["we", "мы", "уи"],
    ["they", "они", "зэй — язык между зубами"],
    ["welder", "сварщик", "вЭлдэр"],
    ["driver", "водитель", "драйвэр"],
    ["cook", "повар", "кук"],
    ["nurse", "медсестра", "нёрс"],
    ["mechanic", "механик", "микЭник"],
    ["student", "ученик, студент", "стьЮдэнт"],
    ["husband", "муж", "хАзбэнд"],
    ["wife", "жена", "уайф"]
  ],
  phrases: [
    ["I am a welder.", "Я сварщик."],
    ["She is a nurse.", "Она медсестра."],
    ["He is my husband.", "Он мой муж."],
    ["She is my wife.", "Она моя жена."],
    ["What do you do?", "Кем вы работаете?"],
    ["I'm a student.", "Я ученик."]
  ],
  build: [
    ["Я сварщик.", "I am a welder."],
    ["Он мой муж.", "He is my husband."],
    ["Она медсестра.", "She is a nurse."],
    ["Кем вы работаете?", "What do you do?"]
  ],
  gaps: [
    ["I ___ a welder.", "am", ["am", "is", "are"], "Я сварщик."],
    ["She ___ a nurse.", "is", ["am", "is", "are"], "Она медсестра."],
    ["They ___ mechanics.", "are", ["am", "is", "are"], "Они механики."],
    ["He is ___ engineer.", "an", ["a", "an", "the"], "Он инженер."]
  ],
  dialog: { title: "Кем вы работаете?", setting: "Вечеринка у соседей, вас спрашивают о работе.",
    lines: [
      ["npc", "So, what do you do?", "Так, а кем вы работаете?"],
      ["me", "Скажите, кем вы работаете или учитесь", { welder: "I'm a welder.", life: "I'm a cook.", school: "I'm a student." }, ["i am a *", "i am an *", "i work as a *", "i am a student"]],
      ["npc", "Oh, nice! And your family?", "О, здорово! А ваша семья?"],
      ["me", "Скажите, кем работает супруг(а) или папа", { welder: "My wife is a nurse.", life: "My husband is a welder.", school: "My dad is a welder." }, ["my * is a *", "he is a *", "she is a *", "my * is an *"]],
      ["npc", "Cool. Welcome to Texas!", "Круто. Добро пожаловать в Техас!"],
      ["me", "Поблагодарите", "Thank you!", ["thank you", "thanks", "thank you very much", "thanks a lot"]]
    ] },
  ai: "Мы на вечеринке у соседей в Техасе. Спрашивай меня, кем я работаю, кем работают члены моей семьи, и рассказывай о своей работе очень простыми фразами с am / is / are."
},

c5: {
  track: "common", title: "Откуда вы? Вопрос и отрицание",
  goal: "Задать вопрос с to be, ответить «да / нет» и сказать, откуда вы.",
  theory: [
    { h: "Вопрос: меняем слова местами",
      t: "Чтобы спросить, ставим am / is / are <b>в начало</b>:<br>You are a welder. → <b>Are you</b> a welder?<br>He is from Texas. → <b>Is he</b> from Texas?<br>Интонация в конце идёт вверх.",
      ex: [["Are you from Russia?", "Вы из России?"], ["Is she a teacher?", "Она учительница?"]] },
    { h: "Отрицание: добавляем not",
      t: "<b>I am not</b> (I'm not), <b>he is not</b> (he isn't), <b>you are not</b> (you aren't). Not ставится сразу после am / is / are.",
      ex: [["I'm not a doctor.", "Я не врач."], ["He isn't here.", "Его здесь нет."]] },
    { h: "Короткие ответы",
      t: "На вопрос «Are you…?» отвечают коротко: <b>Yes, I am.</b> или <b>No, I'm not.</b> Просто «Yes» тоже можно, но так звучит естественнее.",
      ex: [["Yes, I am.", "Да."], ["No, I'm not.", "Нет."]] },
    { h: "Откуда вы",
      t: "<b>Where are you from?</b> — Откуда вы? Ответ: <b>I'm from Russia.</b> Американцы часто называют страну <b>the U.S.</b> (зе ю-эс) или <b>America</b>.",
      ex: [["Where are you from?", "Откуда вы?"], ["We're from Russia.", "Мы из России."]] }
  ],
  words: [
    ["from", "из, от", "фром"],
    ["where", "где, куда", "уэр"],
    ["Russia", "Россия", "рАша"],
    ["Russian", "русский", "рАшн"],
    ["Texas", "Техас", "тЭксэс"],
    ["America", "Америка", "амЭрика"],
    ["city", "город", "сИти"],
    ["country", "страна", "кАнтри"],
    ["here", "здесь", "хиэр"],
    ["now", "сейчас", "нау"],
    ["not", "не", "нот"],
    ["welcome", "добро пожаловать", "уЭлкам"]
  ],
  phrases: [
    ["Where are you from?", "Откуда вы?"],
    ["I'm from Russia.", "Я из России."],
    ["Are you a welder?", "Вы сварщик?"],
    ["Yes, I am.", "Да."],
    ["No, I'm not.", "Нет."],
    ["I'm not a doctor.", "Я не врач."]
  ],
  build: [
    ["Откуда вы?", "Where are you from?"],
    ["Я из России.", "I am from Russia."],
    ["Вы сварщик?", "Are you a welder?"],
    ["Нет, я не врач.", "No, I am not a doctor."]
  ],
  gaps: [
    ["___ you from Russia?", "Are", ["Are", "Is", "Am"], "Вы из России?"],
    ["___ he a welder?", "Is", ["Are", "Is", "Am"], "Он сварщик?"],
    ["I am ___ a doctor.", "not", ["not", "no", "yes"], "Я не врач."],
    ["Where are you ___?", "from", ["from", "here", "now"], "Откуда вы?"]
  ],
  dialog: { title: "Новый знакомый", setting: "В очереди с вами заговорил местный житель.",
    lines: [
      ["npc", "Where are you from?", "Откуда вы?"],
      ["me", "Скажите, что вы из России", "I'm from Russia.", ["i am from russia", "from russia", "we are from russia"]],
      ["npc", "Oh, Russia! Are you from Moscow?", "О, Россия! Вы из Москвы?"],
      ["me", "Ответьте «нет» и назовите свой город", "No, I'm not. I'm from Kazan.", ["no i am from *", "no i am not *", "no i am not", "yes i am", "no *"]],
      ["npc", "Are you a teacher?", "Вы учитель?"],
      ["me", "Ответьте «нет» и скажите, кто вы", { welder: "No, I'm not. I'm a welder.", life: "No, I'm not. I'm a cook.", school: "No, I'm not. I'm a student." }, ["no i am a *", "no i am not i am a *", "no i am not a teacher i am a *", "no i am not"]],
      ["npc", "Cool. Welcome to Texas!", "Круто. Добро пожаловать в Техас!"],
      ["me", "Поблагодарите", "Thank you!", ["thank you", "thanks", "thank you very much"]]
    ] },
  ai: "Ты местный житель Техаса, мы разговорились в очереди. Задавай мне вопросы с Are you…? и Where…? (откуда я, какой город, кем работаю), иногда угадывай неправильно, чтобы я отвечал No, I'm not…"
},

c6: {
  track: "common", title: "Числа 0–20 и телефон",
  goal: "Понимать и называть числа до 20, продиктовать номер телефона.",
  theory: [
    { h: "Числа от 0 до 12 — просто запомнить",
      t: "zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve. Нажмите на любое слово в списке слов, чтобы послушать.",
      ex: [["one, two, three", "1, 2, 3"], ["seven, eight, nine", "7, 8, 9"], ["eleven, twelve", "11, 12"]] },
    { h: "13–19: окончание -teen",
      t: "thir<b>teen</b> (13), four<b>teen</b> (14), fif<b>teen</b> (15) … nine<b>teen</b> (19). Ударение на конце: сёрТИН.",
      ex: [["thirteen", "13"], ["fifteen", "15"], ["nineteen", "19"]] },
    { h: "Ловушка: 13 или 30?",
      t: "<b>thirTEEN</b> (13) — ударение в конце, долгое «ин». <b>THIRty</b> (30) — ударение в начале, короткое «ти». Американцы тоже путают, поэтому переспросить «Thirteen? One-three?» — нормально.",
      ex: [["thirteen", "13"], ["thirty", "30"]] },
    { h: "Номер телефона",
      t: "Номер диктуют <b>по одной цифре</b>, группами: 214-555-0193 → two-one-four, five-five-five, zero-one-nine-three. Ноль часто говорят как <b>oh</b> (оу). 214 — код Далласа.",
      ex: [["My phone number is 214 555 0193.", "Мой номер телефона — 214 555 0193."]] }
  ],
  words: [
    ["zero", "0", "зИроу", { kind: "num" }],
    ["one", "1", "уан", { kind: "num" }],
    ["two", "2", "ту", { kind: "num" }],
    ["three", "3", "сри — язык между зубами", { kind: "num" }],
    ["four", "4", "фо", { kind: "num" }],
    ["five", "5", "файв", { kind: "num" }],
    ["six", "6", "сикс", { kind: "num" }],
    ["seven", "7", "сЭвн", { kind: "num" }],
    ["eight", "8", "эйт", { kind: "num" }],
    ["nine", "9", "найн", { kind: "num" }],
    ["ten", "10", "тэн", { kind: "num" }],
    ["twelve", "12", "твэлв", { kind: "num" }],
    ["thirteen", "13", "сёртИн", { kind: "num" }],
    ["twenty", "20", "твЭнти", { kind: "num" }],
    ["phone number", "номер телефона", "фоун нАмбэр"]
  ],
  phrases: [
    ["What's your phone number?", "Какой у вас номер телефона?"],
    ["My phone number is 214 555 0193.", "Мой номер — 214 555 0193."],
    ["Can you say it again?", "Можете сказать ещё раз?"],
    ["Is that right?", "Правильно?"],
    ["Thirteen? One-three?", "Тринадцать? Один-три?"]
  ],
  build: [
    ["Какой у вас номер телефона?", "What's your phone number?"],
    ["Можете сказать ещё раз?", "Can you say it again?"],
    ["Правильно?", "Is that right?"]
  ],
  gaps: [
    ["five + five = ___", "ten", ["ten", "twelve", "two"], "5 + 5 = 10"],
    ["ten + three = ___", "thirteen", ["thirteen", "thirty", "three"], "10 + 3 = 13"],
    ["What's your phone ___?", "number", ["number", "name", "letter"], "Какой у вас номер телефона?"]
  ],
  dialog: { title: "Записываем телефон", setting: "Менеджер записывает ваш номер, чтобы перезвонить.",
    lines: [
      ["npc", "What's your phone number?", "Какой у вас номер телефона?"],
      ["me", "Продиктуйте номер по цифрам (можно любой)", "My phone number is 214 555 0193.", ["{digits}"]],
      ["npc", "Sorry, can you say it again?", "Простите, можете повторить?"],
      ["me", "Продиктуйте номер ещё раз, медленно", "Two-one-four, five-five-five, zero-one-nine-three.", ["{digits}"]],
      ["npc", "Two-one-four, five-five-five, oh-one-nine-three. Is that right?", "214 555 0193. Правильно?"],
      ["me", "Ответьте: да, правильно", "Yes, that's right.", ["yes that is right", "yes", "yes that is correct", "yes right"]],
      ["npc", "Great. I'll call you tomorrow.", "Отлично. Я позвоню вам завтра."],
      ["me", "Поблагодарите", "Thank you!", ["thank you", "thanks", "ok thank you"]]
    ] },
  ai: "Ты менеджер и записываешь мой номер телефона и адрес. Проси продиктовать цифры, повторяй их с одной ошибкой, чтобы я тебя поправил. Используй числа до 20."
},

c7: {
  track: "common", title: "Числа до 100, возраст и цены",
  goal: "Спросить цену, понять сумму в долларах и сказать свой возраст.",
  theory: [
    { h: "Десятки: окончание -ty",
      t: "twenty (20), thirty (30), forty (40), fifty (50), sixty (60), seventy (70), eighty (80), ninety (90), a hundred (100). Составные — через дефис: 25 = twenty-five, 47 = forty-seven.",
      ex: [["twenty-five", "25"], ["forty-seven", "47"], ["a hundred", "100"]] },
    { h: "Цены в Америке",
      t: "$20 = <b>twenty dollars</b>. Центы часто не называют словом: $5.99 = <b>five ninety-nine</b>. Важно: к цене на ценнике в Техасе на кассе добавят налог (<b>tax</b>) — около 8%.",
      ex: [["How much is it?", "Сколько это стоит?"], ["It's twenty dollars.", "Двадцать долларов."], ["It's five ninety-nine.", "5 долларов 99 центов."]] },
    { h: "Возраст: to be, а не «иметь»",
      t: "По-русски «мне 35 лет», по-английски «я есть 35»: <b>I'm 35</b> или <b>I'm 35 years old</b>. Спрашивают: <b>How old are you?</b> Взрослых о возрасте спрашивают редко — в основном в анкетах.",
      ex: [["How old are you?", "Сколько вам лет?"], ["I'm thirty-five years old.", "Мне 35 лет."]] }
  ],
  words: [
    ["thirty", "30", "сЁрти", { kind: "num" }],
    ["forty", "40", "фОрти", { kind: "num" }],
    ["fifty", "50", "фИфти", { kind: "num" }],
    ["sixty", "60", "сИксти", { kind: "num" }],
    ["seventy", "70", "сЭвенти", { kind: "num" }],
    ["eighty", "80", "Эйти", { kind: "num" }],
    ["ninety", "90", "нАйнти", { kind: "num" }],
    ["a hundred", "100", "э хАндрэд", { kind: "num" }],
    ["dollar", "доллар", "дОлар"],
    ["how much", "сколько (стоит)", "хау мач"],
    ["expensive", "дорогой", "икспЭнсив"],
    ["cheap", "дешёвый", "чип"],
    ["years old", "лет (возраст)", "йирз оулд"]
  ],
  phrases: [
    ["How much is it?", "Сколько это стоит?"],
    ["It's twenty dollars.", "Двадцать долларов."],
    ["That's expensive.", "Это дорого."],
    ["That's cheap.", "Это дёшево."],
    ["How old are you?", "Сколько вам лет?"],
    ["I'm thirty-five years old.", "Мне 35 лет."]
  ],
  build: [
    ["Сколько это стоит?", "How much is it?"],
    ["Это дорого.", "That's expensive."],
    ["Сколько вам лет?", "How old are you?"],
    ["Мне 40 лет.", "I'm forty years old."]
  ],
  gaps: [
    ["How ___ is it?", "much", ["much", "old", "many"], "Сколько это стоит?"],
    ["How ___ are you?", "old", ["much", "old", "are"], "Сколько вам лет?"],
    ["I ___ forty years old.", "am", ["am", "have", "is"], "Мне 40 лет."],
    ["thirty + twenty = ___", "fifty", ["fifty", "fifteen", "forty"], "30 + 20 = 50"]
  ],
  dialog: { title: "Гаражная распродажа", setting: "Субботняя garage sale: соседи продают вещи прямо у гаража — в Техасе это обычное дело.",
    lines: [
      ["npc", "Hi there! Can I help you?", "Привет! Вам помочь?"],
      ["me", "Спросите, сколько это стоит", "How much is it?", ["how much is it", "how much is this", "how much"]],
      ["npc", "It's thirty dollars.", "Тридцать долларов."],
      ["me", "Скажите, что это дорого", "That's expensive.", ["that is expensive", "it is expensive", "expensive", "that is too expensive"]],
      ["npc", "OK, OK. Twenty dollars.", "Ладно, ладно. Двадцать долларов."],
      ["me", "Согласитесь и поблагодарите", "OK, thank you!", ["ok thank you", "ok thanks", "yes thank you", "ok", "deal thank you"]],
      ["npc", "Great! Twenty dollars, please.", "Отлично! Двадцать долларов, пожалуйста."]
    ] },
  ai: "Ты продаёшь вещи на гаражной распродаже в Техасе. Я покупатель. Называй цены от 1 до 100 долларов, торгуйся со мной. Иногда спрашивай сколько мне лет или сколько лет моим детям — по-соседски."
},

c8: {
  track: "common", title: "Это, то и вещи вокруг",
  goal: "Спросить «что это?», назвать предмет и спросить, где он.",
  theory: [
    { h: "this и that",
      t: "<b>this</b> (зис) — это (рядом, можно потрогать). <b>that</b> (зэт) — то (дальше). Звук th — кончик языка между зубами, как в слове thanks.",
      ex: [["What is this?", "Что это?"], ["That's my car.", "То — моя машина."]] },
    { h: "It's a … — это …",
      t: "Отвечая, говорят <b>It's a key</b> — это ключ. Перед одним предметом — <b>a</b>, перед гласным звуком — <b>an</b>: an apple.",
      ex: [["It's a key.", "Это ключ."], ["It's an apple.", "Это яблоко."]] },
    { h: "Где?",
      t: "<b>Where is …?</b> (where's) — где …? Ответы: <b>here</b> — здесь, <b>there</b> — там, <b>over there</b> — вон там, <b>on the table</b> — на столе, <b>in the car</b> — в машине.",
      ex: [["Where is my phone?", "Где мой телефон?"], ["It's on the table.", "Он на столе."], ["Here it is.", "Вот он."]] },
    { h: "I don't know — я не знаю",
      t: "Очень нужная фраза. <b>I don't know</b> (ай доунт ноу) — я не знаю.",
      ex: [["I don't know.", "Я не знаю."]] }
  ],
  words: [
    ["this", "это", "зис"],
    ["that", "то", "зэт"],
    ["key", "ключ", "ки"],
    ["phone", "телефон", "фоун"],
    ["car", "машина", "кар"],
    ["house", "дом", "хаус"],
    ["door", "дверь", "дор"],
    ["bag", "сумка", "бэг"],
    ["water", "вода", "уОтэр — в Америке почти «уОдэр»"],
    ["money", "деньги", "мАни"],
    ["table", "стол", "тэйбл"],
    ["there", "там", "зэр"]
  ],
  phrases: [
    ["What is this?", "Что это?"],
    ["It's a key.", "Это ключ."],
    ["Is this your phone?", "Это ваш телефон?"],
    ["Where is my phone?", "Где мой телефон?"],
    ["It's on the table.", "Он на столе."],
    ["I don't know.", "Я не знаю."]
  ],
  build: [
    ["Что это?", "What is this?"],
    ["Это ваш телефон?", "Is this your phone?"],
    ["Где мои ключи?", "Where are my keys?"],
    ["Я не знаю.", "I don't know."]
  ],
  gaps: [
    ["It's ___ key.", "a", ["a", "an", "is"], "Это ключ."],
    ["It's ___ apple.", "an", ["a", "an", "the"], "Это яблоко."],
    ["Where ___ my phone?", "is", ["is", "are", "am"], "Где мой телефон?"],
    ["I don't ___.", "know", ["know", "now", "no"], "Я не знаю."]
  ],
  dialog: { title: "Где мой телефон?", setting: "Вы собираетесь выходить из дома и ищете вещи.",
    lines: [
      ["npc", "Is this your bag?", "Это твоя сумка?"],
      ["me", "Ответьте: нет, это не моя сумка", "No, it's not my bag.", ["no it is not my bag", "no it is not", "no that is not my bag", "no"]],
      ["npc", "What is that?", "А что это?"],
      ["me", "Скажите: это мой телефон", "It's my phone.", ["it is my phone", "that is my phone", "this is my phone", "my phone"]],
      ["npc", "OK. Where are the car keys?", "Хорошо. А где ключи от машины?"],
      ["me", "Скажите, что не знаете", "I don't know.", ["i do not know", "sorry i do not know", "i do not know sorry"]],
      ["npc", "Here they are! On the table.", "Вот они! На столе."],
      ["me", "Поблагодарите", "Thanks!", ["thanks", "thank you", "ok thanks", "great thanks"]]
    ] },
  ai: "Мы дома собираемся уходить. Спрашивай меня, что это за предметы (What is this?) и где лежат вещи (Where is…?). Отвечай мне фразами on the table, in the car, over there."
},

c9: {
  track: "common", title: "Семья: мой, его, её",
  goal: "Рассказать о семье и показать, чьё это: my, your, his, her, our.",
  theory: [
    { h: "Чьё это?",
      t: "<b>my</b> — мой, <b>your</b> — твой / ваш, <b>his</b> — его, <b>her</b> — её, <b>our</b> — наш, <b>their</b> — их. Эти слова не меняются: my son, my daughter, my kids — везде my.",
      ex: [["This is my wife.", "Это моя жена."], ["His name is Oleg.", "Его зовут Олег."], ["Her name is Anna.", "Её зовут Анна."]] },
    { h: "his или her",
      t: "Русские часто путают. <b>his</b> (хиз) — про мужчину, <b>her</b> (хёр) — про женщину. Ошибка «his name is Anna» звучит смешно, следите за этим.",
      ex: [["My son. His name is Ivan.", "Мой сын. Его зовут Иван."], ["My daughter. Her name is Masha.", "Моя дочь. Её зовут Маша."]] },
    { h: "У меня есть — I have",
      t: "«У меня есть» по-английски — <b>I have</b> (ай хэв): I have two kids — у меня двое детей. <b>kids</b> — дети (разговорное), <b>children</b> — дети (официальнее).",
      ex: [["I have two kids.", "У меня двое детей."], ["I have a son and a daughter.", "У меня сын и дочь."]] }
  ],
  words: [
    ["family", "семья", "фЭмили"],
    ["mom", "мама", "мам"],
    ["dad", "папа", "дэд"],
    ["son", "сын", "сан"],
    ["daughter", "дочь", "дОтэр"],
    ["kids", "дети", "кидз"],
    ["brother", "брат", "брАзэр"],
    ["sister", "сестра", "сИстэр"],
    ["his", "его", "хиз"],
    ["her", "её", "хёр"],
    ["our", "наш", "Ауэр"],
    ["have", "иметь", "хэв"]
  ],
  phrases: [
    ["This is my family.", "Это моя семья."],
    ["I have two kids.", "У меня двое детей."],
    ["I have a son and a daughter.", "У меня сын и дочь."],
    ["What's his name?", "Как его зовут?"],
    ["Her name is Anna.", "Её зовут Анна."],
    ["Our family is from Russia.", "Наша семья из России."]
  ],
  build: [
    ["Это моя семья.", "This is my family."],
    ["У меня двое детей.", "I have two kids."],
    ["Её зовут Анна.", "Her name is Anna."],
    ["Как его зовут?", "What's his name?"]
  ],
  gaps: [
    ["My son. ___ name is Ivan.", "His", ["His", "Her", "My"], "Мой сын. Его зовут Иван."],
    ["My daughter. ___ name is Masha.", "Her", ["His", "Her", "Our"], "Моя дочь. Её зовут Маша."],
    ["I ___ two kids.", "have", ["have", "am", "is"], "У меня двое детей."],
    ["This is ___ family.", "our", ["our", "we", "us"], "Это наша семья."]
  ],
  dialog: { title: "Фото семьи", setting: "Коллега увидел фото на вашем телефоне.",
    lines: [
      ["npc", "Is this your family?", "Это ваша семья?"],
      ["me", "Ответьте: да, это моя семья", "Yes, this is my family.", ["yes this is my family", "yes it is my family", "yes it is", "yes my family"]],
      ["npc", "Who is this?", "А это кто?"],
      ["me", "Скажите, кто это (мой сын, моя дочь, мой муж…)", "This is my daughter.", ["this is my *", "it is my *", "he is my *", "she is my *", "my *"]],
      ["npc", "What's her name?", "Как её зовут?"],
      ["me", "Назовите имя: Her name is … / His name is …", "Her name is Masha.", ["her name is *", "his name is *", "it is *", "*"]],
      ["npc", "How many kids do you have?", "Сколько у вас детей?"],
      ["me", "Скажите, сколько у вас детей", "I have two kids.", ["i have * kids", "i have * children", "i have a son and a daughter", "i have *", "two", "three", "one"]],
      ["npc", "Beautiful family!", "Прекрасная семья!"]
    ] },
  ai: "Ты мой коллега и рассматриваешь фото моей семьи. Спрашивай про каждого: кто это, как зовут, сколько лет. Следи, чтобы я не путал his и her, и поправляй меня."
},

c10: {
  track: "common", title: "Я работаю, я живу",
  goal: "Рассказать о себе обычными глаголами: I work, I live, I need, I don't…",
  theory: [
    { h: "Обычные действия — просто глагол",
      t: "Для того, что вы делаете обычно, регулярно, используется простое время (Present Simple). С I, you, we, they глагол <b>не меняется</b>: I work, you work, we work, they work.",
      ex: [["I work every day.", "Я работаю каждый день."], ["We live in Russia.", "Мы живём в России."]] },
    { h: "Отрицание — don't",
      t: "Перед глаголом ставим <b>don't</b> (доунт = do not): I don't speak Spanish. Сам глагол не меняется.",
      ex: [["I don't speak Spanish.", "Я не говорю по-испански."], ["We don't have a car.", "У нас нет машины."]] },
    { h: "Работаю кем-то — work as",
      t: "«Я работаю сварщиком» = <b>I work as a welder</b>. Можно проще: I am a welder.",
      ex: [["I work as a welder.", "Я работаю сварщиком."], ["I need a job.", "Мне нужна работа."]] },
    { h: "Мне нужно, я хочу",
      t: "<b>I need</b> — мне нужно, <b>I want</b> — я хочу, <b>I like</b> — мне нравится. По-русски «мне», по-английски всегда «я»: I need help — мне нужна помощь.",
      ex: [["I need help.", "Мне нужна помощь."], ["I want a good job.", "Я хочу хорошую работу."], ["I like Texas.", "Мне нравится Техас."]] }
  ],
  words: [
    ["work", "работать; работа", "уёрк"],
    ["live", "жить", "лив"],
    ["need", "нуждаться, нужно", "нид"],
    ["want", "хотеть", "уонт"],
    ["like", "нравиться, любить", "лайк"],
    ["know", "знать", "ноу"],
    ["go", "идти, ехать", "гоу"],
    ["eat", "есть (кушать)", "ит"],
    ["job", "работа (место)", "джоб"],
    ["help", "помощь, помогать", "хэлп"],
    ["Spanish", "испанский", "спЭниш"],
    ["every day", "каждый день", "Эври дэй"]
  ],
  phrases: [
    ["I work every day.", "Я работаю каждый день."],
    ["I live in Russia.", "Я живу в России."],
    ["I work as a welder.", "Я работаю сварщиком."],
    ["I need a job.", "Мне нужна работа."],
    ["I don't speak Spanish.", "Я не говорю по-испански."],
    ["I need help.", "Мне нужна помощь."]
  ],
  build: [
    ["Я работаю каждый день.", "I work every day."],
    ["Мне нужна работа.", "I need a job."],
    ["Мы живём в России.", "We live in Russia."],
    ["Я не говорю по-испански.", "I don't speak Spanish."]
  ],
  gaps: [
    ["I ___ in Texas.", "live", ["live", "am", "lives"], "Я живу в Техасе."],
    ["I ___ speak Spanish.", "don't", ["don't", "not", "am not"], "Я не говорю по-испански."],
    ["We ___ two kids.", "have", ["have", "are", "has"], "У нас двое детей."],
    ["I ___ a job.", "need", ["need", "am", "is"], "Мне нужна работа."]
  ],
  dialog: { title: "Разговор с соседом", setting: "Сосед-техасец спрашивает о вашей жизни.",
    lines: [
      ["npc", "Where do you live now?", "Где вы сейчас живёте?"],
      ["me", "Скажите, где живёте: I live in …", "I live in Russia.", ["i live in *", "in *"]],
      ["npc", "Do you work?", "Вы работаете?"],
      ["me", "Ответьте, кем работаете (или учитесь)", { welder: "Yes, I work as a welder.", life: "Yes, I work as a cook.", school: "No, I'm a student." }, ["yes i work as a *", "yes i am a *", "yes i work", "no i do not work", "no i am a student", "i am a *"]],
      ["npc", "Do you speak Spanish? A lot of people here speak Spanish.", "Вы говорите по-испански? Здесь многие говорят по-испански."],
      ["me", "Нет, я говорю по-русски и немного по-английски", "No, I speak Russian and a little English.", ["no i speak russian and a little english", "no i speak russian", "no i do not", "no i do not speak spanish", "no i speak russian and english"]],
      ["npc", "That's OK. Your English is good!", "Ничего. У вас хороший английский!"],
      ["me", "Поблагодарите", "Thank you!", ["thank you", "thanks", "thank you very much"]]
    ] },
  ai: "Ты мой сосед в Техасе. Расспрашивай меня о жизни: где я живу, где работаю, что мне нравится, что мне нужно. Используй вопросы Do you…? и простые глаголы work, live, like, need, want."
},

c11: {
  track: "common", title: "Он работает: -s на конце",
  goal: "Рассказать о другом человеке: he works, she lives, he doesn't…",
  theory: [
    { h: "Он, она — добавляем -s",
      t: "Когда говорим о <b>he / she / it</b> (один человек или предмет), к глаголу прибавляем <b>-s</b>: he work<b>s</b>, she live<b>s</b>, it need<b>s</b>. Это самая частая ошибка новичков — следите за ней.",
      ex: [["He works as a welder.", "Он работает сварщиком."], ["She lives in Dallas.", "Она живёт в Далласе."]] },
    { h: "Особые формы",
      t: "have → <b>has</b>: She has two kids. go → <b>goes</b>, do → <b>does</b>.",
      ex: [["She has two kids.", "У неё двое детей."], ["He goes to work at 6.", "Он едет на работу в 6."]] },
    { h: "Отрицание — doesn't",
      t: "Для he / she: <b>doesn't</b> + глагол <b>без -s</b>: He doesn't speak English. (не «doesn't speaks»).",
      ex: [["He doesn't speak English.", "Он не говорит по-английски."], ["She doesn't work.", "Она не работает."]] }
  ],
  words: [
    ["works", "работает", "уёркс"],
    ["lives", "живёт", "ливз"],
    ["has", "имеет, у него есть", "хэз"],
    ["goes", "идёт, едет", "гоуз"],
    ["company", "компания", "кАмпани"],
    ["boss", "начальник", "босс"],
    ["home", "дом (родной)", "хоум"],
    ["morning", "утро", "мОрнинг"],
    ["evening", "вечер", "Ивнинг"],
    ["early", "рано", "Ёрли"],
    ["late", "поздно", "лэйт"],
    ["a lot", "много", "э лот"]
  ],
  phrases: [
    ["He works as a welder.", "Он работает сварщиком."],
    ["She doesn't work.", "Она не работает."],
    ["My husband works a lot.", "Мой муж много работает."],
    ["She has two kids.", "У неё двое детей."],
    ["He goes to work early.", "Он рано уходит на работу."],
    ["He doesn't speak English.", "Он не говорит по-английски."]
  ],
  build: [
    ["Он работает сварщиком.", "He works as a welder."],
    ["Она не работает.", "She doesn't work."],
    ["Мой муж много работает.", "My husband works a lot."],
    ["У неё двое детей.", "She has two kids."]
  ],
  gaps: [
    ["He ___ in a big company.", "works", ["works", "work", "working"], "Он работает в большой компании."],
    ["She ___ two kids.", "has", ["has", "have", "is"], "У неё двое детей."],
    ["My husband ___ speak English.", "doesn't", ["doesn't", "don't", "not"], "Мой муж не говорит по-английски."],
    ["She ___ to work at 7.", "goes", ["goes", "go", "is"], "Она едет на работу в 7."]
  ],
  dialog: { title: "Расскажите о близком", setting: "Новая знакомая расспрашивает о вашей семье.",
    lines: [
      ["npc", "What does your husband do?", "Кем работает ваш муж?"],
      ["me", "Расскажите, кем работает супруг или папа", { welder: "My wife works as a nurse.", life: "He works as a welder.", school: "My dad works as a welder." }, ["he works as a *", "she works as a *", "he is a *", "she is a *", "my * works as a *", "my * is a *", "she does not work", "he does not work"]],
      ["npc", "Oh, cool. Where does he work?", "Здорово. А где он работает?"],
      ["me", "Скажите, где работает (в компании, на заводе, дома…)", "He works in a big company.", ["he works in *", "he works at *", "she works in *", "she works at *", "in *", "at *"]],
      ["npc", "Does he speak English?", "Он говорит по-английски?"],
      ["me", "Ответьте: немного", "A little. He speaks a little English.", ["a little", "yes a little", "he speaks a little english", "she speaks a little english", "no he does not", "no she does not"]],
      ["npc", "That's great. Practice every day!", "Отлично. Занимайтесь каждый день!"]
    ] },
  ai: "Ты новая знакомая. Расспрашивай меня о членах моей семьи: кем работают, где живут, что любят. Строго следи, чтобы я ставил -s после he/she (he works, she likes) и doesn't в отрицании, и поправляй меня."
},

c12: {
  track: "common", title: "Время и дни недели",
  goal: "Спросить и назвать время, договориться о дне: on Monday at 7.",
  theory: [
    { h: "Который час",
      t: "<b>What time is it?</b> — Который час? Ответ: <b>It's seven</b> (7:00), <b>It's seven thirty</b> (7:30), <b>It's seven fifteen</b> (7:15). Американцы чаще всего просто называют числа.",
      ex: [["What time is it?", "Который час?"], ["It's seven thirty.", "Семь тридцать."]] },
    { h: "Утро или вечер: a.m. и p.m.",
      t: "В Америке 12-часовое время. <b>a.m.</b> (эй-эм) — до полудня, <b>p.m.</b> (пи-эм) — после. 7 a.m. — 7 утра, 7 p.m. — 19:00.",
      ex: [["I start work at 7 a.m.", "Я начинаю работу в 7 утра."], ["I finish at 5 p.m.", "Я заканчиваю в 5 вечера."]] },
    { h: "at, on: во сколько и в какой день",
      t: "Время — с <b>at</b>: at 7. День — с <b>on</b>: on Monday. Дни недели пишутся с большой буквы. Неделя в США начинается с воскресенья.",
      ex: [["See you on Monday at 7.", "Увидимся в понедельник в 7."], ["I'm off on Sunday.", "В воскресенье у меня выходной."]] }
  ],
  words: [
    ["Monday", "понедельник", "мАндэй"],
    ["Tuesday", "вторник", "тьЮздэй"],
    ["Wednesday", "среда", "уЭнздэй"],
    ["Thursday", "четверг", "сЁрздэй"],
    ["Friday", "пятница", "фрАйдэй"],
    ["Saturday", "суббота", "сЭтэрдэй"],
    ["Sunday", "воскресенье", "сАндэй"],
    ["today", "сегодня", "тудЭй"],
    ["tomorrow", "завтра", "тумОроу"],
    ["time", "время", "тайм"],
    ["start", "начинать", "старт"],
    ["finish", "заканчивать", "фИниш"]
  ],
  phrases: [
    ["What time is it?", "Который час?"],
    ["It's seven thirty.", "Семь тридцать."],
    ["I start work at 7 a.m.", "Я начинаю работу в 7 утра."],
    ["See you on Monday.", "Увидимся в понедельник."],
    ["What day is it today?", "Какой сегодня день?"],
    ["I'm off on Sunday.", "В воскресенье у меня выходной."]
  ],
  build: [
    ["Который час?", "What time is it?"],
    ["Увидимся в понедельник.", "See you on Monday."],
    ["Я начинаю в 7 утра.", "I start at 7 a.m."],
    ["Какой сегодня день?", "What day is it today?"]
  ],
  gaps: [
    ["See you ___ Monday.", "on", ["on", "at", "in"], "Увидимся в понедельник."],
    ["I start work ___ 7.", "at", ["on", "at", "in"], "Я начинаю работу в 7."],
    ["What ___ is it?", "time", ["time", "day", "old"], "Который час?"],
    ["Friday, Saturday, ___", "Sunday", ["Sunday", "Monday", "Tuesday"], "Пятница, суббота, воскресенье"]
  ],
  dialog: { title: "График", setting: "Обсуждаете расписание: работа, учёба или встреча.",
    lines: [
      ["npc", "What time do you start?", "Во сколько вы начинаете?"],
      ["me", "Скажите, во сколько начинаете", "I start at 7 a.m.", ["i start at *", "i start work at *", "at *", "i start school at *"]],
      ["npc", "And what time do you finish?", "А во сколько заканчиваете?"],
      ["me", "Скажите, во сколько заканчиваете", "I finish at 5 p.m.", ["i finish at *", "at *", "i finish work at *"]],
      ["npc", "Can you come on Saturday?", "Можете прийти в субботу?"],
      ["me", "Ответьте: да, могу — или: нет, в субботу у меня выходной", "No, I'm off on Saturday.", ["yes i can", "no i can not", "no i am off on saturday", "yes", "no sorry", "no i am off"]],
      ["npc", "OK. See you on Monday at 7.", "Хорошо. Увидимся в понедельник в 7."],
      ["me", "Попрощайтесь: увидимся в понедельник", "See you on Monday!", ["see you on monday", "see you", "ok see you on monday", "bye", "ok see you"]]
    ] },
  ai: "Ты мой начальник (или учитель) и обсуждаешь со мной расписание на неделю: дни, время начала и конца, выходные. Используй a.m. и p.m., дни недели, at и on."
},

c13: {
  track: "common", title: "Can: умею, могу, можно?",
  goal: "Сказать, что вы умеете, и вежливо попросить о помощи.",
  theory: [
    { h: "can — могу, умею",
      t: "<b>can</b> (кэн) + глагол: I can drive — я умею водить. После can глагол без изменений, и для he/she тоже: He can weld (без -s).",
      ex: [["I can drive.", "Я умею водить."], ["He can weld.", "Он умеет варить."]] },
    { h: "can't — не могу",
      t: "<b>can't</b> (кэнт) — не могу, не умею. На слух can и can't похожи: в can't звук длиннее и ударный, и в конце слышно «т».",
      ex: [["I can't find it.", "Я не могу это найти."], ["She can't come today.", "Она не может прийти сегодня."]] },
    { h: "Просьбы: Can you…? Could you…?",
      t: "<b>Can you help me?</b> — Можете помочь? <b>Could you…?</b> — ещё вежливее, так лучше говорить с незнакомыми. <b>Can I…?</b> — Можно мне…?",
      ex: [["Can you help me?", "Можете мне помочь?"], ["Could you show me, please?", "Не могли бы вы показать?"], ["Can I use your phone?", "Можно воспользоваться вашим телефоном?"]] },
    { h: "Как отвечают",
      t: "<b>Sure!</b> (шуэр) — конечно! <b>Of course.</b> — разумеется. <b>Wait a minute, please.</b> — подождите минутку.",
      ex: [["Sure!", "Конечно!"], ["Wait a minute, please.", "Подождите минутку, пожалуйста."]] }
  ],
  words: [
    ["can", "могу, умею", "кэн"],
    ["can't", "не могу", "кэнт"],
    ["could you", "не могли бы вы", "куд ю"],
    ["drive", "водить машину", "драйв"],
    ["find", "найти", "файнд"],
    ["show", "показать", "шоу"],
    ["wait", "ждать", "уэйт"],
    ["use", "пользоваться", "юз"],
    ["come", "приходить", "кам"],
    ["sure", "конечно", "шуэр"],
    ["minute", "минута", "мИнит"],
    ["very much", "очень", "вЭри мач"]
  ],
  phrases: [
    ["Can you help me?", "Можете мне помочь?"],
    ["Could you show me, please?", "Не могли бы вы показать?"],
    ["I can't find it.", "Я не могу это найти."],
    ["Can I use your phone?", "Можно воспользоваться вашим телефоном?"],
    ["Wait a minute, please.", "Подождите минутку, пожалуйста."],
    ["Thank you very much.", "Большое спасибо."]
  ],
  build: [
    ["Можете мне помочь?", "Can you help me?"],
    ["Я не могу это найти.", "I can't find it."],
    ["Я умею водить.", "I can drive."],
    ["Большое спасибо.", "Thank you very much."]
  ],
  gaps: [
    ["___ you help me?", "Can", ["Can", "Do", "Are"], "Можете мне помочь?"],
    ["He can ___.", "weld", ["weld", "welds", "welding"], "Он умеет варить."],
    ["I ___ find my keys.", "can't", ["can't", "don't", "not"], "Не могу найти ключи."],
    ["___ you show me, please?", "Could", ["Could", "Is", "Does"], "Не могли бы вы показать?"]
  ],
  dialog: { title: "Помощь в магазине", setting: "Большой магазин, вы не можете найти нужное.",
    lines: [
      ["npc", "Hi there! Can I help you?", "Здравствуйте! Вам помочь?"],
      ["me", "Да, пожалуйста. Я не могу это найти", "Yes, please. I can't find it.", ["yes please i can not find it", "yes please", "i can not find it", "yes please i can not find *", "i can not find *"]],
      ["npc", "What do you need?", "Что вам нужно?"],
      ["me", "Скажите, что вам нужно (например, вода)", "I need water.", ["i need *", "* please", "water please"]],
      ["npc", "It's in aisle five.", "Это в ряду номер пять."],
      ["me", "Попросите показать", "Could you show me, please?", ["could you show me please", "can you show me please", "can you show me", "could you show me"]],
      ["npc", "Sure, follow me.", "Конечно, идите за мной."],
      ["me", "Поблагодарите очень", "Thank you very much!", ["thank you very much", "thank you so much", "thanks a lot", "thank you"]]
    ] },
  ai: "Ты сотрудник большого магазина вроде Walmart. Я ищу разные товары. Используй слово aisle (ряд) и просьбы Can you…? / Could you…?. Иногда отвечай I can't…, чтобы я слышал разницу между can и can't."
},

c14: {
  track: "common", title: "Вопросы: Do you…? Where do you…?",
  goal: "Задавать вопросы с обычными глаголами и отвечать Yes, I do / No, I don't.",
  theory: [
    { h: "Помощник do",
      t: "С обычными глаголами в вопросе нужен помощник <b>do</b>: You work → <b>Do</b> you work? Для he / she — <b>does</b>, а глагол теряет -s: <b>Does</b> he work?",
      ex: [["Do you speak English?", "Вы говорите по-английски?"], ["Does he work here?", "Он здесь работает?"]] },
    { h: "Вопросительные слова — в начало",
      t: "<b>what</b> — что, <b>where</b> — где, <b>when</b> — когда, <b>who</b> — кто, <b>why</b> — почему, <b>how</b> — как. Схема: слово + do/does + кто + глагол.",
      ex: [["Where do you work?", "Где вы работаете?"], ["What do you need?", "Что вам нужно?"], ["Why do you want to move?", "Почему вы хотите переехать?"]] },
    { h: "Короткие ответы",
      t: "<b>Yes, I do.</b> / <b>No, I don't.</b> Для he/she: <b>Yes, he does.</b> / <b>No, she doesn't.</b>",
      ex: [["Yes, I do.", "Да."], ["No, I don't.", "Нет."]] },
    { h: "Потому что — because",
      t: "<b>because</b> (бикОз) — потому что. Самый частый ответ на why.",
      ex: [["Because I want a good job.", "Потому что я хочу хорошую работу."]] }
  ],
  words: [
    ["what", "что", "уот"],
    ["when", "когда", "уэн"],
    ["who", "кто", "ху"],
    ["why", "почему", "уай"],
    ["how", "как", "хау"],
    ["because", "потому что", "бикОз"],
    ["ask", "спрашивать", "аск"],
    ["answer", "отвечать; ответ", "Энсэр"],
    ["question", "вопрос", "квЭсчн"],
    ["call", "звонить", "кол"],
    ["move", "переезжать", "мув"],
    ["good", "хороший", "гуд"]
  ],
  phrases: [
    ["Do you speak English?", "Вы говорите по-английски?"],
    ["Where do you work?", "Где вы работаете?"],
    ["What do you need?", "Что вам нужно?"],
    ["Yes, I do.", "Да."],
    ["No, I don't.", "Нет."],
    ["Because I want a good job.", "Потому что я хочу хорошую работу."]
  ],
  build: [
    ["Где вы работаете?", "Where do you work?"],
    ["Вы говорите по-русски?", "Do you speak Russian?"],
    ["Что вам нужно?", "What do you need?"],
    ["Потому что я хочу хорошую работу.", "Because I want a good job."]
  ],
  gaps: [
    ["___ you speak English?", "Do", ["Do", "Does", "Are"], "Вы говорите по-английски?"],
    ["___ he work here?", "Does", ["Do", "Does", "Is"], "Он здесь работает?"],
    ["Where ___ you live?", "do", ["do", "does", "are"], "Где вы живёте?"],
    ["No, I ___.", "don't", ["don't", "doesn't", "not"], "Нет."]
  ],
  dialog: { title: "Небольшое интервью", setting: "Вас расспрашивают о планах переезда.",
    lines: [
      ["npc", "Do you speak English?", "Вы говорите по-английски?"],
      ["me", "Ответьте: немного", "A little.", ["a little", "yes a little", "i speak a little english", "yes i do a little"]],
      ["npc", "Do you have a car?", "У вас есть машина?"],
      ["me", "Ответьте коротко: да или нет", "Yes, I do.", ["yes i do", "no i do not", "yes", "no"]],
      ["npc", "Where do you live now?", "Где вы живёте сейчас?"],
      ["me", "Назовите город", "I live in Kazan.", ["i live in *", "in *"]],
      ["npc", "Why do you want to move to Texas?", "Почему вы хотите переехать в Техас?"],
      ["me", "Ответьте: потому что хочу хорошую работу (или учёбу)", { welder: "Because I want a good job.", life: "Because I want a good life.", school: "Because I want a good school." }, ["because i want a good *", "i want a good *", "because *"]],
      ["npc", "Good answer!", "Хороший ответ!"]
    ] },
  ai: "Ты американец и расспрашиваешь меня о моих планах переезда в Техас. Задавай вопросы Do you…?, Where do you…?, Why do you…?, What do you…?. Требуй полные ответы и помогай мне строить их."
}

});
