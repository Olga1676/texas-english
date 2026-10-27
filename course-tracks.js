// Уроки отдельных программ, контрольные и порядок прохождения.
window.COURSE = window.COURSE || { lessons: {} };

Object.assign(window.COURSE.lessons, {

// ───────── Сварщик в Техасе ─────────

w1: {
  track: "welder", title: "Я сварщик: работа и металл",
  goal: "Рассказать о своей профессии и опыте так, как это говорят в американских вакансиях.",
  theory: [
    { h: "Как называются должности в вакансиях",
      t: "<b>Structural Welder</b> — сварщик металлоконструкций. <b>Pipe Welder</b> — сварщик трубопроводов. <b>Combo Welder</b> — и трубы, и конструкции. <b>Welder / Fabricator</b> — сварщик-сборщик. <b>Fitter</b> — сборщик (собирает под сварку). В Техасе много работы в нефтегазе, на НПЗ и в строительстве.",
      ex: [["I'm a pipe welder.", "Я сварщик трубопроводов."], ["I'm a structural welder.", "Я сварщик металлоконструкций."]] },
    { h: "Цех или объект",
      t: "<b>shop</b> — цех, мастерская. <b>job site</b> или <b>field</b> — выездной объект, площадка. В вакансиях пишут: shop work или field work.",
      ex: [["I work in a shop.", "Я работаю в цеху."], ["I work in the field.", "Я работаю на выезде."]] },
    { h: "Опыт — это главное",
      t: "Работодателя в первую очередь интересует <b>experience</b> — опыт. Фраза, которую нужно знать наизусть: <b>I have … years of experience</b>.",
      ex: [["I have ten years of experience.", "У меня 10 лет опыта."], ["I'm looking for a welding job.", "Я ищу работу сварщиком."]] },
    { h: "Металлы",
      t: "<b>steel</b> — сталь, <b>carbon steel</b> — углеродистая, <b>stainless steel</b> (или просто stainless) — нержавейка, <b>aluminum</b> — алюминий (американцы говорят «алЮминум»).",
      ex: [["I weld carbon steel and stainless.", "Я варю углеродистую сталь и нержавейку."]] }
  ],
  words: [
    ["weld", "варить; сварной шов", "уэлд"],
    ["welding", "сварка", "уЭлдинг"],
    ["metal", "металл", "мЕтл"],
    ["steel", "сталь", "стил"],
    ["stainless steel", "нержавейка", "стЭйнлэс стил"],
    ["aluminum", "алюминий", "алЮминум"],
    ["pipe", "труба", "пайп"],
    ["plate", "лист (металла)", "плэйт"],
    ["shop", "цех, мастерская", "шоп"],
    ["job site", "объект, площадка", "джоб сайт"],
    ["experience", "опыт", "икспИриэнс"],
    ["foreman", "бригадир, мастер", "фОрмэн"]
  ],
  phrases: [
    ["I'm a pipe welder.", "Я сварщик трубопроводов."],
    ["I have ten years of experience.", "У меня 10 лет опыта."],
    ["I weld carbon steel and stainless.", "Я варю углеродистую сталь и нержавейку."],
    ["I work in a shop.", "Я работаю в цеху."],
    ["I'm looking for a welding job.", "Я ищу работу сварщиком."],
    ["I'm the new welder.", "Я новый сварщик."]
  ],
  build: [
    ["Я сварщик трубопроводов.", "I'm a pipe welder."],
    ["У меня 10 лет опыта.", "I have ten years of experience."],
    ["Я ищу работу сварщиком.", "I'm looking for a welding job."],
    ["Я работаю в цеху.", "I work in a shop."]
  ],
  gaps: [
    ["I have ten years of ___.", "experience", ["experience", "welding", "job"], "У меня 10 лет опыта."],
    ["I'm a ___ welder.", "pipe", ["pipe", "plate", "shop"], "Я сварщик трубопроводов."],
    ["I weld stainless ___.", "steel", ["steel", "metal", "pipe"], "Я варю нержавейку."]
  ],
  dialog: { title: "Первый день в цеху", setting: "Вы пришли на новую работу, к вам подходит бригадир.",
    lines: [
      ["npc", "Hey! Are you the new guy?", "Привет! Ты новенький?"],
      ["me", "Ответьте: да, я новый сварщик", "Yes, I'm the new welder.", ["yes i am the new welder", "yes i am a welder", "yes i am", "yes i am new welder"]],
      ["npc", "Welcome! I'm Jake, the foreman.", "Добро пожаловать! Я Джейк, бригадир."],
      ["me", "Скажите «приятно познакомиться» и назовите себя", "Nice to meet you. I'm {name}.", ["nice to meet you i am *", "nice to meet you my name is *", "nice to meet you"]],
      ["npc", "How many years of experience do you have?", "Сколько у тебя лет опыта?"],
      ["me", "Назовите свой опыт в годах", "I have ten years of experience.", ["i have * years of experience", "* years", "i have * years"]],
      ["npc", "Nice. Pipe or structural?", "Хорошо. Трубы или конструкции?"],
      ["me", "Ответьте: трубы, конструкции или и то и другое", "Pipe and structural.", ["pipe", "structural", "both", "pipe and structural", "i do pipe and structural"]],
      ["npc", "Good. Let's go to the shop.", "Отлично. Пошли в цех."]
    ] },
  ai: "Ты бригадир (foreman) сварочного цеха в Хьюстоне. Я новый сварщик. Расспрашивай меня об опыте, какими металлами я варю, работал ли в цеху или на выезде. Говори как простой рабочий человек, коротко."
},

w2: {
  track: "welder", title: "Безопасность: слова, которые спасают",
  goal: "Мгновенно понимать предупреждения на площадке и знать названия средств защиты.",
  theory: [
    { h: "Сначала — эти слова",
      t: "На площадке нет времени переводить. <b>Watch out!</b> — Берегись! <b>Stop!</b> — Стой! <b>Hot!</b> — Горячо! <b>Heads up!</b> — Осторожно, сверху! Эти слова должны срабатывать как рефлекс.",
      ex: [["Watch out!", "Берегись!"], ["Heads up!", "Осторожно, сверху!"], ["Don't touch it, it's hot!", "Не трогай, горячо!"]] },
    { h: "PPE — средства защиты",
      t: "<b>PPE</b> (пи-пи-и) — personal protective equipment, средства индивидуальной защиты. В США за этим очень строго следит <b>OSHA</b> (Ошa) — государственная служба охраны труда. Без PPE на объект не пустят: «No PPE, no work».",
      ex: [["Wear your PPE.", "Надень средства защиты."], ["Where is your hard hat?", "Где твоя каска?"]] },
    { h: "Утренняя планёрка и разрешения",
      t: "Каждое утро — <b>safety meeting</b> или <b>toolbox talk</b> (короткий инструктаж). На сварку вне цеха часто нужен <b>hot work permit</b> — разрешение на огневые работы, а рядом стоит <b>fire watch</b> — человек, который следит за огнём.",
      ex: [["We have a safety meeting at 6.", "В 6 у нас инструктаж."], ["Do we have a hot work permit?", "У нас есть разрешение на огневые работы?"]] }
  ],
  words: [
    ["watch out", "берегись", "уотч аут"],
    ["careful", "осторожный", "кЭрфул"],
    ["hot", "горячий", "хот"],
    ["fire", "огонь, пожар", "фАйер"],
    ["helmet", "сварочная маска", "хЭлмит"],
    ["hard hat", "каска", "хард хэт"],
    ["safety glasses", "защитные очки", "сЭйфти глЭсиз"],
    ["gloves", "перчатки", "главз"],
    ["boots", "ботинки", "бутс"],
    ["fire extinguisher", "огнетушитель", "фАйер икстИнгвишэр"],
    ["safe", "безопасный", "сэйф"],
    ["danger", "опасность", "дЭйнджэр"]
  ],
  phrases: [
    ["Watch out!", "Берегись!"],
    ["Be careful, it's hot.", "Осторожно, горячо."],
    ["Wear your PPE.", "Надень средства защиты."],
    ["Where is the fire extinguisher?", "Где огнетушитель?"],
    ["Is it safe?", "Это безопасно?"],
    ["Stop! Don't touch it!", "Стой! Не трогай!"]
  ],
  build: [
    ["Осторожно, горячо.", "Be careful, it's hot."],
    ["Где огнетушитель?", "Where is the fire extinguisher?"],
    ["Это безопасно?", "Is it safe?"],
    ["Надень средства защиты.", "Wear your PPE."]
  ],
  gaps: [
    ["Watch ___!", "out", ["out", "up", "in"], "Берегись!"],
    ["Be ___, it's hot.", "careful", ["careful", "safe", "fire"], "Осторожно, горячо."],
    ["Where is your hard ___?", "hat", ["hat", "helmet", "glasses"], "Где твоя каска?"]
  ],
  dialog: { title: "Утро на объекте", setting: "Вы пришли на площадку, бригадир проверяет защиту.",
    lines: [
      ["npc", "Morning! Where's your hard hat?", "Доброе утро! Где твоя каска?"],
      ["me", "Скажите: она в машине", "It's in my car.", ["it is in my car", "it is in the car", "in my car", "in the car"]],
      ["npc", "Go get it. No PPE, no work.", "Иди возьми. Без защиты — без работы."],
      ["me", "Ответьте: хорошо, извините", "OK, sorry.", ["ok sorry", "sorry ok", "ok", "sorry", "ok i am sorry"]],
      ["npc", "Watch out! That plate is hot!", "Осторожно! Этот лист горячий!"],
      ["me", "Поблагодарите", "Thanks!", ["thanks", "thank you", "ok thanks", "thanks man"]],
      ["npc", "Where is the fire extinguisher?", "Где огнетушитель?"],
      ["me", "Скажите: вон там", "It's over there.", ["it is over there", "over there", "there", "it is there"]]
    ] },
  ai: "Ты бригадир на стройплощадке в Техасе и проводишь утренний инструктаж по безопасности (toolbox talk). Проверяй мои средства защиты, выкрикивай предупреждения (Watch out!, Heads up!, Hot!), спрашивай, где огнетушитель. Говори коротко и резко, как на площадке."
},

w3: {
  track: "welder", title: "Виды сварки и инструмент",
  goal: "Назвать по-американски виды сварки, расходники и инструмент.",
  theory: [
    { h: "Виды сварки: американские названия",
      t: "<b>Stick</b> (SMAW) — ручная дуговая электродом. <b>MIG</b> (GMAW) — полуавтомат в газе. <b>TIG</b> (GTAW) — аргонодуговая неплавящимся электродом. <b>Flux core</b> (FCAW) — порошковой проволокой. В вакансиях пишут оба варианта, например «SMAW / GMAW».",
      ex: [["I can weld stick, MIG and TIG.", "Я варю электродом, полуавтоматом и аргоном."], ["Do you have flux core experience?", "У тебя есть опыт с порошковой проволокой?"]] },
    { h: "Электроды по номерам",
      t: "Электроды называют по маркировке: <b>7018</b> — «seventy eighteen», <b>6010</b> — «sixty ten». В Америке электроды для стика — <b>rods</b>. Их хранят в <b>rod oven</b> — пенале-печи.",
      ex: [["Use seven-oh-eighteen rods.", "Используй электроды 7018."], ["The rods are in the rod oven.", "Электроды в печке."]] },
    { h: "Инструмент",
      t: "<b>grinder</b> — болгарка, <b>torch</b> — резак (горелка), <b>clamp</b> — струбцина, <b>welding machine</b> — сварочный аппарат. Фаска — <b>bevel</b>.",
      ex: [["I need a grinder.", "Мне нужна болгарка."], ["Pass me the clamp, please.", "Подай струбцину, пожалуйста."]] }
  ],
  words: [
    ["stick", "ручная дуговая (электродом)", "стик"],
    ["MIG", "полуавтомат", "миг"],
    ["TIG", "аргонодуговая", "тиг"],
    ["flux core", "порошковая проволока", "флакс кор"],
    ["rod", "электрод", "род"],
    ["wire", "проволока", "уАйер"],
    ["gas", "газ", "гэс"],
    ["grinder", "болгарка", "грАйндэр"],
    ["torch", "резак, горелка", "торч"],
    ["clamp", "струбцина", "клэмп"],
    ["bevel", "фаска", "бЭвл"],
    ["welding machine", "сварочный аппарат", "уЭлдинг мэшИн"]
  ],
  phrases: [
    ["I can weld stick, MIG and TIG.", "Я варю электродом, полуавтоматом и аргоном."],
    ["I need a grinder.", "Мне нужна болгарка."],
    ["Where are the rods?", "Где электроды?"],
    ["I need more argon.", "Мне нужно ещё аргона."],
    ["Pass me the clamp, please.", "Подай струбцину, пожалуйста."],
    ["The machine is not working.", "Аппарат не работает."]
  ],
  build: [
    ["Мне нужна болгарка.", "I need a grinder."],
    ["Где электроды?", "Where are the rods?"],
    ["Подай струбцину, пожалуйста.", "Pass me the clamp, please."],
    ["Мне нужно ещё аргона.", "I need more argon."]
  ],
  gaps: [
    ["I can ___ stick and TIG.", "weld", ["weld", "welds", "welder"], "Я варю электродом и аргоном."],
    ["Where ___ the rods?", "are", ["are", "is", "am"], "Где электроды?"],
    ["I need a ___ for the bevel.", "grinder", ["grinder", "clamp", "torch"], "Мне нужна болгарка для фаски."]
  ],
  dialog: { title: "Задание от бригадира", setting: "Бригадир даёт вам работу в цеху.",
    lines: [
      ["npc", "Can you weld TIG?", "Ты умеешь варить аргоном?"],
      ["me", "Ответьте: да, умею TIG и MIG", "Yes, I can weld TIG and MIG.", ["yes i can weld tig and mig", "yes i can", "yes i can weld tig", "yes tig and mig"]],
      ["npc", "OK. Weld this pipe. Use stick, seven-oh-eighteen.", "Хорошо. Свари эту трубу. Электродом, 7018."],
      ["me", "Скажите, что вам нужна болгарка", "I need a grinder.", ["i need a grinder", "i need grinder", "grinder please"]],
      ["npc", "It's on the table. Anything else?", "На столе. Что-нибудь ещё?"],
      ["me", "Спросите, где электроды", "Where are the rods?", ["where are the rods", "where are rods", "where is the rods", "rods where"]],
      ["npc", "In the rod oven, over there.", "В печке, вон там."],
      ["me", "Поблагодарите", "Thanks!", ["thanks", "thank you", "ok thanks"]]
    ] },
  ai: "Ты бригадир сварочного цеха. Давай мне задания: какой вид сварки, какие электроды (7018, 6010), какой металл. Спрашивай, умею ли я варить MIG, TIG, stick, flux core. Иногда говори, что инструмент лежит в разных местах, чтобы я переспрашивал."
},

w4: {
  track: "welder", title: "Дюймы, футы и чертёж",
  goal: "Понимать размеры в дюймах и футах — в Америке метры на работе не используют.",
  theory: [
    { h: "Дюйм и фут",
      t: "<b>1 inch</b> (дюйм, \") = 2,54 см. <b>1 foot</b> (фут, ') = 12 дюймов ≈ 30,5 см. Во множественном числе — <b>feet</b>. 3' 6\" читается «three foot six» или «three feet six inches».",
      ex: [["It's two feet long.", "Длина — два фута."], ["The plate is one inch thick.", "Лист толщиной в один дюйм."]] },
    { h: "Дроби — самое важное",
      t: "Толщину металла и размеры дают дробями дюйма:<br><b>1/8</b> — one eighth (≈ 3 мм)<br><b>1/4</b> — a quarter (≈ 6 мм)<br><b>3/8</b> — three eighths (≈ 10 мм)<br><b>1/2</b> — a half (≈ 12,7 мм)<br><b>3/4</b> — three quarters (≈ 19 мм)",
      ex: [["The plate is three eighths thick.", "Лист 3/8 дюйма."], ["Cut it a quarter inch shorter.", "Отрежь на четверть дюйма короче."]] },
    { h: "Чертёж и рулетка",
      t: "<b>blueprint</b> или <b>print</b> — чертёж. <b>tape measure</b> или просто <b>tape</b> — рулетка (американские рулетки в дюймах). Американская поговорка рабочих: <b>Measure twice, cut once</b> — семь раз отмерь, один отрежь.",
      ex: [["Check the blueprint.", "Посмотри чертёж."], ["Measure twice, cut once.", "Семь раз отмерь, один отрежь."]] }
  ],
  words: [
    ["inch", "дюйм (2,54 см)", "инч"],
    ["foot", "фут (30,5 см)", "фут"],
    ["feet", "футы", "фит"],
    ["a half", "половина (1/2)", "э хаф"],
    ["a quarter", "четверть (1/4)", "э квОртэр"],
    ["one eighth", "одна восьмая (1/8)", "уан эйтс"],
    ["thick", "толстый; толщиной", "сик"],
    ["long", "длинный; длиной", "лонг"],
    ["measure", "измерять", "мЭжэр"],
    ["tape measure", "рулетка", "тэйп мЭжэр"],
    ["blueprint", "чертёж", "блУпринт"],
    ["cut", "резать", "кат"]
  ],
  phrases: [
    ["The plate is three eighths thick.", "Лист толщиной 3/8 дюйма."],
    ["Cut it four feet long.", "Отрежь длиной четыре фута."],
    ["Check the blueprint.", "Посмотри чертёж."],
    ["What size?", "Какой размер?"],
    ["Measure twice, cut once.", "Семь раз отмерь, один отрежь."],
    ["Where is the tape measure?", "Где рулетка?"]
  ],
  build: [
    ["Посмотри чертёж.", "Check the blueprint."],
    ["Отрежь длиной четыре фута.", "Cut it four feet long."],
    ["Какой размер?", "What size?"],
    ["Где рулетка?", "Where is the tape measure?"]
  ],
  gaps: [
    ["It's two ___ long.", "feet", ["feet", "foot", "inch"], "Длина — два фута."],
    ["1/2 inch = ___ inch", "a half", ["a half", "a quarter", "one eighth"], "Полдюйма"],
    ["1/4 inch = ___ inch", "a quarter", ["a half", "a quarter", "one eighth"], "Четверть дюйма"],
    ["The plate is one inch ___.", "thick", ["thick", "long", "cut"], "Лист толщиной в один дюйм."]
  ],
  dialog: { title: "Размеры по чертежу", setting: "Бригадир даёт задание на резку металла.",
    lines: [
      ["npc", "Cut this plate. Two feet long.", "Отрежь этот лист. Длиной два фута."],
      ["me", "Переспросите: два фута?", "Two feet?", ["two feet", "two feet long", "two feet ok", "sorry two feet"]],
      ["npc", "Yes, two feet. And it's three eighths thick.", "Да, два фута. И он толщиной 3/8."],
      ["me", "Спросите, где чертёж", "Where is the blueprint?", ["where is the blueprint", "where is blueprint", "where is the print"]],
      ["npc", "In the office. Measure twice, cut once!", "В офисе. Семь раз отмерь, один отрежь!"],
      ["me", "Ответьте: хорошо, понял", "OK, I understand.", ["ok i understand", "ok", "ok got it", "i understand", "ok thanks"]]
    ] },
  ai: "Ты бригадир. Давай мне задания с размерами в дюймах и футах, используй дроби 1/8, 1/4, 3/8, 1/2, 3/4. Я должен повторять размер, чтобы подтвердить. Если я ошибаюсь — поправь и переведи размер в миллиметры."
},

// ───────── Жизнь в США ─────────

l1: {
  track: "life", title: "Кафе: кофе с собой",
  goal: "Заказать кофе и еду, ответить на стандартные вопросы кассира.",
  theory: [
    { h: "Как заказывают в Америке",
      t: "Самый простой и вежливый способ: <b>Can I get …, please?</b> — Можно мне…? Или <b>I'd like …</b> — Я бы хотела… Просто назвать продукт тоже можно: «A coffee, please».",
      ex: [["Can I get a coffee, please?", "Можно мне кофе?"], ["I'd like a sandwich.", "Я бы хотела сэндвич."]] },
    { h: "Вопросы, которые вам зададут",
      t: "<b>For here or to go?</b> — Здесь или с собой? <b>What size?</b> — Какой размер? <b>Anything else?</b> — Что-нибудь ещё? <b>What's your name?</b> — имя пишут на стакане.",
      ex: [["For here or to go?", "Здесь или с собой?"], ["To go, please.", "С собой, пожалуйста."], ["Anything else?", "Что-нибудь ещё?"]] },
    { h: "Размеры и счёт",
      t: "<b>small, medium, large</b> — маленький, средний, большой. В кафе с официантом в конце просят <b>the check</b> — счёт. Чаевые (<b>tip</b>) в Америке обязательны: 15–20%.",
      ex: [["Medium, please.", "Средний, пожалуйста."], ["That's all, thanks.", "Это всё, спасибо."], ["Can I have the check, please?", "Можно счёт?"]] }
  ],
  words: [
    ["coffee", "кофе", "кОфи"],
    ["tea", "чай", "ти"],
    ["sandwich", "сэндвич", "сЭндвич"],
    ["menu", "меню", "мЭнью"],
    ["small", "маленький", "смол"],
    ["medium", "средний", "мИдиум"],
    ["large", "большой", "лардж"],
    ["to go", "с собой", "ту гоу"],
    ["for here", "здесь (в кафе)", "фор хиэр"],
    ["check", "счёт", "чек"],
    ["tip", "чаевые", "тип"],
    ["anything else", "что-нибудь ещё", "Энисинг элс"]
  ],
  phrases: [
    ["Can I get a coffee, please?", "Можно мне кофе?"],
    ["I'd like a sandwich.", "Я бы хотела сэндвич."],
    ["For here or to go?", "Здесь или с собой?"],
    ["To go, please.", "С собой, пожалуйста."],
    ["That's all, thanks.", "Это всё, спасибо."],
    ["Can I have the check, please?", "Можно счёт, пожалуйста?"]
  ],
  build: [
    ["Можно мне кофе?", "Can I get a coffee, please?"],
    ["С собой, пожалуйста.", "To go, please."],
    ["Это всё, спасибо.", "That's all, thanks."],
    ["Можно счёт, пожалуйста?", "Can I have the check, please?"]
  ],
  gaps: [
    ["For here or ___ go?", "to", ["to", "for", "at"], "Здесь или с собой?"],
    ["Can I ___ a coffee, please?", "get", ["get", "am", "do"], "Можно мне кофе?"],
    ["Small, ___ or large?", "medium", ["medium", "much", "middle"], "Маленький, средний или большой?"]
  ],
  dialog: { title: "Заказ в кофейне", setting: "Утро, вы в кофейне у кассы.",
    lines: [
      ["npc", "Hi! What can I get you?", "Привет! Что вам предложить?"],
      ["me", "Закажите кофе", "Can I get a coffee, please?", ["can i get a coffee please", "i would like a coffee", "a coffee please", "coffee please", "can i get a coffee"]],
      ["npc", "Sure. What size?", "Конечно. Какой размер?"],
      ["me", "Выберите размер", "Medium, please.", ["medium please", "small please", "large please", "small", "medium", "large"]],
      ["npc", "For here or to go?", "Здесь или с собой?"],
      ["me", "Ответьте: с собой", "To go, please.", ["to go please", "to go", "for here please", "for here"]],
      ["npc", "Anything else?", "Что-нибудь ещё?"],
      ["me", "Скажите: это всё, спасибо", "That's all, thanks.", ["that is all thanks", "that is all thank you", "no thank you", "no thanks", "that is all"]],
      ["npc", "That'll be four fifty.", "С вас 4 доллара 50 центов."]
    ] },
  ai: "Ты бариста в кофейне в Остине. Принимай у меня заказ: напитки, размер, здесь или с собой, имя для стакана, что-нибудь ещё. Называй цену. Говори дружелюбно и быстро, как настоящий бариста, но если я прошу — повторяй медленно."
},

l2: {
  track: "life", title: "Магазин и оплата",
  goal: "Найти товар, понять кассира и расплатиться.",
  theory: [
    { h: "Кассир всегда спрашивает",
      t: "<b>Did you find everything OK?</b> — Вы всё нашли? Это вежливость, отвечают «Yes, thanks». Потом: <b>Cash or card?</b> — Наличными или картой? <b>Do you need a bag?</b> — Нужен пакет?",
      ex: [["Did you find everything OK?", "Вы всё нашли?"], ["Cash or card?", "Наличными или картой?"]] },
    { h: "Налог на кассе",
      t: "На ценнике — цена <b>без налога</b>. На кассе добавят <b>sales tax</b> (в Техасе около 8%). Поэтому итог — <b>total</b> — всегда больше. Это нормально.",
      ex: [["Your total is twenty-three forty.", "С вас 23 доллара 40 центов."], ["Here is your receipt.", "Вот ваш чек."]] },
    { h: "Найти товар",
      t: "Товары стоят по рядам — <b>aisle</b> (айл, буква s не читается). Спрашивают: <b>Where can I find …?</b>",
      ex: [["Where can I find milk?", "Где найти молоко?"], ["It's in aisle five.", "В пятом ряду."]] }
  ],
  words: [
    ["store", "магазин", "стор"],
    ["grocery store", "продуктовый магазин", "грОусэри стор"],
    ["cash", "наличные", "кэш"],
    ["card", "карта", "кард"],
    ["receipt", "чек", "рисИт — p не читается"],
    ["bag", "пакет, сумка", "бэг"],
    ["price", "цена", "прайс"],
    ["total", "итого", "тОутл"],
    ["tax", "налог", "тэкс"],
    ["aisle", "ряд в магазине", "айл"],
    ["milk", "молоко", "милк"],
    ["bread", "хлеб", "брэд"]
  ],
  phrases: [
    ["Where can I find milk?", "Где найти молоко?"],
    ["Can I pay by card?", "Можно оплатить картой?"],
    ["Do you need a bag?", "Вам нужен пакет?"],
    ["Here is your receipt.", "Вот ваш чек."],
    ["Did you find everything OK?", "Вы всё нашли?"],
    ["Have a nice day!", "Хорошего дня!"]
  ],
  build: [
    ["Где найти молоко?", "Where can I find milk?"],
    ["Можно оплатить картой?", "Can I pay by card?"],
    ["Вам нужен пакет?", "Do you need a bag?"],
    ["Хорошего дня!", "Have a nice day!"]
  ],
  gaps: [
    ["Cash or ___?", "card", ["card", "cart", "car"], "Наличными или картой?"],
    ["Where can I ___ bread?", "find", ["find", "pay", "need"], "Где найти хлеб?"],
    ["Here is your ___.", "receipt", ["receipt", "price", "tax"], "Вот ваш чек."]
  ],
  dialog: { title: "На кассе", setting: "Продуктовый магазин, вы на кассе.",
    lines: [
      ["npc", "Hi! Did you find everything OK?", "Здравствуйте! Вы всё нашли?"],
      ["me", "Ответьте: да, спасибо", "Yes, thanks.", ["yes thank you", "yes thanks", "yes"]],
      ["npc", "Your total is twenty-three forty. Cash or card?", "С вас 23.40. Наличными или картой?"],
      ["me", "Скажите: картой", "Card, please.", ["card please", "card", "cash please", "cash", "by card"]],
      ["npc", "Do you need a bag?", "Нужен пакет?"],
      ["me", "Ответьте: да, пожалуйста — или: нет, спасибо", "Yes, please.", ["yes please", "no thank you", "no thanks", "yes"]],
      ["npc", "Here's your receipt. Have a nice day!", "Вот ваш чек. Хорошего дня!"],
      ["me", "Ответьте: вам тоже", "You too!", ["you too", "thank you you too", "thanks you too"]]
    ] },
  ai: "Ты кассир в супермаркете H-E-B в Техасе. Задавай стандартные вопросы кассира (Did you find everything OK?, Cash or card?, Do you need a bag?), называй сумму с центами. Потом стань продавцом в зале и помоги мне найти товары по рядам (aisle)."
},

l3: {
  track: "life", title: "Аптека и врач",
  goal: "Объяснить, что болит, и понять простые указания врача или фармацевта.",
  theory: [
    { h: "Если срочно",
      t: "<b>911</b> (найн-уан-уан) — единый номер экстренной помощи. Для несрочных случаев есть <b>urgent care</b> — клиника без записи. Лекарства — в <b>pharmacy</b> (аптека), часто внутри CVS, Walgreens, Walmart.",
      ex: [["I need a doctor.", "Мне нужен врач."], ["Call 911!", "Звоните 911!"]] },
    { h: "Что болит",
      t: "<b>I have a headache</b> — болит голова. <b>I have a fever</b> — температура. <b>I have a cough</b> — кашель. <b>It hurts here</b> — болит здесь (показываете рукой). <b>I feel sick</b> — мне плохо.",
      ex: [["I have a headache.", "У меня болит голова."], ["It hurts here.", "Болит здесь."], ["I feel sick.", "Мне плохо."]] },
    { h: "Рецепт и аллергия",
      t: "<b>prescription</b> — рецепт. Многие лекарства в США продают только по рецепту. Обязательно знайте фразу про аллергию: <b>I'm allergic to …</b>",
      ex: [["Do I need a prescription?", "Нужен рецепт?"], ["I'm allergic to penicillin.", "У меня аллергия на пенициллин."]] }
  ],
  words: [
    ["pharmacy", "аптека", "фАрмэси"],
    ["doctor", "врач", "дОктэр"],
    ["sick", "больной", "сик"],
    ["pain", "боль", "пэйн"],
    ["headache", "головная боль", "хЭдэйк"],
    ["fever", "температура, жар", "фИвэр"],
    ["cough", "кашель", "коф"],
    ["medicine", "лекарство", "мЭдисин"],
    ["pill", "таблетка", "пил"],
    ["prescription", "рецепт", "прискрИпшн"],
    ["allergic", "аллергия (есть)", "элЁрджик"],
    ["hurt", "болеть", "хёрт"]
  ],
  phrases: [
    ["I feel sick.", "Мне плохо."],
    ["I have a headache.", "У меня болит голова."],
    ["It hurts here.", "Болит здесь."],
    ["I need a doctor.", "Мне нужен врач."],
    ["Do I need a prescription?", "Нужен рецепт?"],
    ["I'm allergic to penicillin.", "У меня аллергия на пенициллин."]
  ],
  build: [
    ["Мне плохо.", "I feel sick."],
    ["Болит здесь.", "It hurts here."],
    ["Мне нужен врач.", "I need a doctor."],
    ["У меня температура.", "I have a fever."]
  ],
  gaps: [
    ["I have a ___. (голова)", "headache", ["headache", "fever", "cough"], "У меня болит голова."],
    ["It ___ here.", "hurts", ["hurts", "hurt", "pain"], "Болит здесь."],
    ["Do I need a ___?", "prescription", ["prescription", "pharmacy", "pill"], "Нужен рецепт?"]
  ],
  dialog: { title: "В аптеке", setting: "Вы пришли в аптеку CVS, у вас болит голова.",
    lines: [
      ["npc", "Hi, how can I help you?", "Здравствуйте, чем помочь?"],
      ["me", "Скажите, что у вас болит голова", "I have a headache.", ["i have a headache", "headache", "i have headache"]],
      ["npc", "Do you have a fever?", "Температура есть?"],
      ["me", "Ответьте коротко", "No, I don't.", ["no i do not", "yes i do", "no", "yes", "a little"]],
      ["npc", "Try this. Take two pills every six hours.", "Попробуйте это. По две таблетки каждые шесть часов."],
      ["me", "Попросите повторить медленно", "Can you repeat that, please? Slowly.", ["can you repeat that please", "slowly please", "can you repeat please", "sorry slowly please", "one more time please"]],
      ["npc", "Two pills. Every six hours.", "Две таблетки. Каждые шесть часов."],
      ["me", "Поблагодарите и спросите цену", "Thank you. How much is it?", ["thank you how much is it", "how much is it", "thanks how much is it", "how much"]]
    ] },
  ai: "Ты фармацевт в аптеке CVS, а потом — врач в urgent care. Я прихожу с простыми жалобами (головная боль, температура, кашель, болит горло). Задавай вопросы о симптомах, давай понятные указания про таблетки. Говори медленно и чётко."
},

l4: {
  track: "life", title: "Звонок и запись на приём",
  goal: "Позвонить, представиться, записаться и продиктовать имя.",
  theory: [
    { h: "По телефону сложнее всего",
      t: "Не видно лица и жестов, поэтому фразы для переспрашивания здесь важнее всего. Не стесняйтесь говорить: <b>Sorry, I speak a little English. Slowly, please.</b>",
      ex: [["Hi, this is {name}.", "Здравствуйте, это {name}."], ["I'm calling about my appointment.", "Я звоню по поводу записи."]] },
    { h: "Записаться — make an appointment",
      t: "<b>appointment</b> — запись на приём. <b>I'd like to make an appointment</b> — я хочу записаться. <b>Are you available on Tuesday?</b> — Вам удобно во вторник?",
      ex: [["I'd like to make an appointment.", "Я хочу записаться на приём."], ["Is Tuesday OK?", "Вторник подойдёт?"]] },
    { h: "Ждать и перезвонить",
      t: "<b>Hold on, please</b> — подождите на линии. <b>Can you call me back?</b> — Можете мне перезвонить? <b>Could you spell that?</b> — Продиктуйте по буквам.",
      ex: [["Hold on, please.", "Подождите, пожалуйста."], ["Can you call me back?", "Можете перезвонить?"]] }
  ],
  words: [
    ["call", "звонить; звонок", "кол"],
    ["call back", "перезвонить", "кол бэк"],
    ["appointment", "запись на приём", "эпОйнтмэнт"],
    ["available", "свободный, доступный", "эвЭйлэбл"],
    ["address", "адрес", "Эдрэс"],
    ["email", "электронная почта", "Имэйл"],
    ["message", "сообщение", "мЭсидж"],
    ["hold on", "подождите (на линии)", "хоулд он"],
    ["cancel", "отменить", "кЭнсл"],
    ["confirm", "подтвердить", "кэнфЁрм"],
    ["office", "офис, кабинет", "Офис"],
    ["calling", "звоню", "кОлинг"]
  ],
  phrases: [
    ["Hi, this is {name}.", "Здравствуйте, это {name}."],
    ["I'd like to make an appointment.", "Я хочу записаться на приём."],
    ["Can you call me back?", "Можете мне перезвонить?"],
    ["Could you spell that?", "Продиктуйте по буквам."],
    ["Hold on, please.", "Подождите, пожалуйста."],
    ["I'd like to cancel my appointment.", "Я хочу отменить запись."]
  ],
  build: [
    ["Я хочу записаться на приём.", "I'd like to make an appointment."],
    ["Можете мне перезвонить?", "Can you call me back?"],
    ["Подождите, пожалуйста.", "Hold on, please."],
    ["Я хочу отменить запись.", "I'd like to cancel my appointment."]
  ],
  gaps: [
    ["I'd like to make an ___.", "appointment", ["appointment", "address", "office"], "Я хочу записаться."],
    ["Can you call me ___?", "back", ["back", "on", "up"], "Можете перезвонить?"],
    ["Hi, ___ is Anna.", "this", ["this", "it", "my"], "Здравствуйте, это Анна."]
  ],
  dialog: { title: "Записаться к врачу", setting: "Вы звоните в офис врача.",
    lines: [
      ["npc", "Good morning, Doctor Smith's office. How can I help you?", "Доброе утро, офис доктора Смита. Чем могу помочь?"],
      ["me", "Скажите, что хотите записаться на приём", "I'd like to make an appointment.", ["i would like to make an appointment", "i want to make an appointment", "can i make an appointment", "appointment please"]],
      ["npc", "Sure. What's your name?", "Конечно. Как вас зовут?"],
      ["me", "Представьтесь", "My name is {name}.", ["my name is *", "it is *", "this is *", "i am *"]],
      ["npc", "Could you spell that?", "Продиктуйте по буквам."],
      ["me", "Продиктуйте имя по буквам", "{spelled}", ["{spellname}"]],
      ["npc", "Thank you. Is Tuesday at ten a.m. OK?", "Спасибо. Вторник в 10 утра подойдёт?"],
      ["me", "Согласитесь", "Yes, Tuesday is OK. Thank you.", ["yes that is ok", "yes tuesday is ok", "yes", "yes thank you", "ok thank you", "yes it is ok"]],
      ["npc", "Great. See you on Tuesday.", "Отлично. Ждём вас во вторник."]
    ] },
  ai: "Ты администратор в офисе врача (или в школе, или в автосервисе — меняй роль). Я звоню, чтобы записаться, перенести или отменить запись. Проси меня продиктовать имя по буквам, номер телефона, выбрать день и время. Говори как по телефону."
},

// ───────── Школа в Техасе (подросток) ─────────

s1: {
  track: "school", title: "Школа: первый день",
  goal: "Представиться в школе, сказать, в каком вы классе, и найти кабинет.",
  theory: [
    { h: "Как устроена американская школа",
      t: "12 классов — <b>grades</b>. В 15 лет обычно <b>9th или 10th grade</b>. 9–12 классы — <b>high school</b>. Учеников называют: 9 класс — freshman, 10 — sophomore, 11 — junior, 12 — senior. У каждого своё расписание — <b>schedule</b>, ученики сами переходят из кабинета в кабинет.",
      ex: [["I'm in tenth grade.", "Я в десятом классе."], ["This is my schedule.", "Это моё расписание."]] },
    { h: "Как обращаться к учителям",
      t: "Не по имени, а <b>Mr.</b> (мистер) + фамилия для мужчин и <b>Ms.</b> (миз) + фамилия для женщин: Mr. Brown, Ms. Garcia. Директор — <b>principal</b>, школьный консультант — <b>counselor</b> (к нему идут с любыми вопросами).",
      ex: [["Who is my teacher?", "Кто мой учитель?"], ["Good morning, Ms. Garcia.", "Доброе утро, мисс Гарсия."]] },
    { h: "ESL — вам помогут",
      t: "Для учеников, которые плохо знают английский, есть программа <b>ESL</b> (English as a Second Language). Это нормально и бесплатно. Фраза, которая поможет: <b>I'm new. I speak a little English.</b>",
      ex: [["I'm a new student.", "Я новый ученик."], ["Where is room twelve?", "Где кабинет 12?"]] }
  ],
  words: [
    ["school", "школа", "скул"],
    ["class", "урок; класс (группа)", "клас"],
    ["teacher", "учитель", "тИчэр"],
    ["grade", "класс (год); оценка", "грэйд"],
    ["classroom", "классная комната", "клАсрум"],
    ["room", "кабинет, комната", "рум"],
    ["schedule", "расписание", "скЕджул"],
    ["locker", "шкафчик", "лОкэр"],
    ["principal", "директор школы", "прИнсипл"],
    ["friend", "друг, подруга", "фрэнд"],
    ["homework", "домашнее задание", "хОумуёрк"],
    ["new", "новый", "нью"]
  ],
  phrases: [
    ["I'm a new student.", "Я новый ученик."],
    ["I'm in tenth grade.", "Я в десятом классе."],
    ["Where is room twelve?", "Где кабинет 12?"],
    ["Who is my teacher?", "Кто мой учитель?"],
    ["This is my schedule.", "Это моё расписание."],
    ["Where is my locker?", "Где мой шкафчик?"]
  ],
  build: [
    ["Я новый ученик.", "I'm a new student."],
    ["Я в десятом классе.", "I'm in tenth grade."],
    ["Где кабинет 12?", "Where is room twelve?"],
    ["Кто мой учитель?", "Who is my teacher?"]
  ],
  gaps: [
    ["I'm in tenth ___.", "grade", ["grade", "class", "school"], "Я в десятом классе."],
    ["I'm a ___ student.", "new", ["new", "now", "good"], "Я новый ученик."],
    ["Where is my ___?", "locker", ["locker", "teacher", "homework"], "Где мой шкафчик?"]
  ],
  dialog: { title: "Первый день в школе", setting: "Вы пришли в школьный офис (front office).",
    lines: [
      ["npc", "Hi! Are you a new student?", "Привет! Ты новый ученик?"],
      ["me", "Ответьте: да, я новый ученик", "Yes, I'm a new student.", ["yes i am a new student", "yes i am", "yes i am new", "yes"]],
      ["npc", "Welcome! What's your name?", "Добро пожаловать! Как тебя зовут?"],
      ["me", "Назовите имя", "My name is {name}.", ["my name is *", "i am *", "it is *"]],
      ["npc", "What grade are you in?", "В каком ты классе?"],
      ["me", "Скажите, в каком классе", "I'm in tenth grade.", ["i am in * grade", "* grade", "i am in *"]],
      ["npc", "OK, here's your schedule. Your first class is in room twelve.", "Вот твоё расписание. Первый урок в кабинете 12."],
      ["me", "Спросите, где кабинет 12", "Where is room twelve?", ["where is room twelve", "where is room 12", "where is the room"]],
      ["npc", "Go down the hall, on the left.", "Иди по коридору, налево."]
    ] },
  ai: "Ты сотрудник школьного офиса в американской high school, потом — дружелюбный одноклассник, который показывает мне школу. Спрашивай имя, класс, откуда я, помогай найти кабинеты по расписанию. Говори как американский подросток, но просто."
},

s2: {
  track: "school", title: "На уроке",
  goal: "Понимать указания учителя и попросить о помощи на уроке.",
  theory: [
    { h: "Что говорит учитель",
      t: "<b>Open your books to page twenty.</b> — Откройте книги на странице 20. <b>Take out a pencil.</b> — Достаньте карандаш. <b>Work in pairs.</b> — Работайте в парах. <b>Turn in your homework.</b> — Сдайте домашнее задание.",
      ex: [["Open your books to page twenty.", "Откройте книги на странице 20."], ["Turn in your homework.", "Сдайте домашку."]] },
    { h: "Что говорить вам",
      t: "<b>I don't understand the assignment.</b> — Я не понял задание. <b>Can you explain it again, please?</b> — Объясните ещё раз, пожалуйста. <b>What page?</b> — Какая страница? <b>I'm done.</b> — Я закончил.",
      ex: [["I don't understand the assignment.", "Я не понял задание."], ["Can you explain it again, please?", "Объясните ещё раз, пожалуйста."]] },
    { h: "Можно выйти?",
      t: "В американской школе выйти из класса можно только с разрешения: <b>May I go to the restroom?</b> (restroom — туалет, так вежливее, чем bathroom). Иногда дают пропуск — <b>hall pass</b>.",
      ex: [["May I go to the restroom?", "Можно выйти в туалет?"], ["Can I borrow a pencil?", "Можно взять карандаш?"]] }
  ],
  words: [
    ["book", "книга, учебник", "бук"],
    ["notebook", "тетрадь", "нОутбук"],
    ["pen", "ручка", "пэн"],
    ["pencil", "карандаш", "пЭнсл"],
    ["page", "страница", "пэйдж"],
    ["test", "контрольная", "тэст"],
    ["quiz", "короткий тест", "квиз"],
    ["assignment", "задание", "эсАйнмэнт"],
    ["restroom", "туалет", "рЭструм"],
    ["explain", "объяснить", "иксплЭйн"],
    ["borrow", "взять на время", "бОроу"],
    ["done", "готово, закончил", "дан"]
  ],
  phrases: [
    ["May I go to the restroom?", "Можно выйти в туалет?"],
    ["I don't understand the assignment.", "Я не понял задание."],
    ["Can you explain it again, please?", "Объясните ещё раз, пожалуйста."],
    ["What page?", "Какая страница?"],
    ["Can I borrow a pencil?", "Можно взять карандаш?"],
    ["I'm done.", "Я закончил."]
  ],
  build: [
    ["Какая страница?", "What page?"],
    ["Можно взять карандаш?", "Can I borrow a pencil?"],
    ["Я не понял задание.", "I don't understand the assignment."],
    ["Можно выйти в туалет?", "May I go to the restroom?"]
  ],
  gaps: [
    ["Open your books to ___ twenty.", "page", ["page", "pen", "pencil"], "Откройте книги на странице 20."],
    ["Can I ___ a pencil?", "borrow", ["borrow", "explain", "done"], "Можно взять карандаш?"],
    ["Can you ___ it again, please?", "explain", ["explain", "borrow", "open"], "Объясните ещё раз, пожалуйста."]
  ],
  dialog: { title: "Урок математики", setting: "Учитель объясняет задание, вы не всё поняли.",
    lines: [
      ["npc", "Open your books to page twenty.", "Откройте книги на странице 20."],
      ["me", "Переспросите: какая страница?", "Sorry, what page?", ["sorry what page", "what page", "what page please"]],
      ["npc", "Page twenty. Do you understand the assignment?", "Страница 20. Ты понял задание?"],
      ["me", "Скажите, что не поняли, и попросите объяснить", "No, I don't understand. Can you explain it again, please?", ["no i do not understand can you explain it again please", "i do not understand can you explain it again please", "no i do not understand", "sorry i do not understand", "can you explain it again please", "no can you explain it again please", "i do not understand the assignment"]],
      ["npc", "Sure. Read the question and write the answer.", "Конечно. Прочитай вопрос и напиши ответ."],
      ["me", "Попросите карандаш", "Can I borrow a pencil?", ["can i borrow a pencil", "can i borrow a pencil please", "can i have a pencil", "can i have a pencil please"]],
      ["npc", "Here you go.", "Держи."],
      ["me", "Поблагодарите", "Thank you!", ["thank you", "thanks", "thank you very much"]]
    ] },
  ai: "Ты учитель в американской школе, у тебя в классе новый ученик из России. Давай простые указания (open your books, take out a pencil, work in pairs), проверяй, понимаю ли я, и помогай. Иногда задавай вопрос по уроку математики очень простыми словами."
},

s3: {
  track: "school", title: "Предметы и расписание",
  goal: "Назвать школьные предметы, рассказать, что легко и что трудно.",
  theory: [
    { h: "Школьные предметы",
      t: "<b>math</b> — математика, <b>science</b> — естественные науки, <b>history</b> — история, <b>English</b> — английский (для американцев это родной язык и литература), <b>art</b> — рисование, <b>P.E.</b> (пи-и) — физкультура.",
      ex: [["My favorite subject is math.", "Мой любимый предмет — математика."], ["I have P.E. next.", "Следующий урок — физкультура."]] },
    { h: "Легко и трудно",
      t: "<b>easy</b> — легко, <b>hard</b> — трудно. Конструкция: <b>Math is easy for me</b> — математика мне даётся легко.",
      ex: [["Math is easy for me.", "Математика мне легко даётся."], ["English is hard for me.", "Английский мне трудно даётся."]] },
    { h: "Обед",
      t: "Обед — <b>lunch</b> в <b>cafeteria</b> (столовая). Друга зовут так: <b>Let's have lunch together!</b> — Давай пообедаем вместе!",
      ex: [["Let's have lunch together.", "Давай пообедаем вместе."], ["What class do you have next?", "Какой у тебя следующий урок?"]] }
  ],
  words: [
    ["math", "математика", "мэс"],
    ["science", "естествознание", "сАйэнс"],
    ["history", "история", "хИстэри"],
    ["art", "рисование, искусство", "арт"],
    ["P.E.", "физкультура", "пи-И"],
    ["subject", "предмет", "сАбджект"],
    ["favorite", "любимый", "фЭйврит"],
    ["easy", "лёгкий", "Изи"],
    ["hard", "трудный", "хард"],
    ["lunch", "обед", "ланч"],
    ["cafeteria", "столовая", "кэфэтИриа"],
    ["next", "следующий", "нэкст"]
  ],
  phrases: [
    ["My favorite subject is math.", "Мой любимый предмет — математика."],
    ["Math is easy for me.", "Математика мне легко даётся."],
    ["English is hard for me.", "Английский мне трудно даётся."],
    ["What class do you have next?", "Какой у тебя следующий урок?"],
    ["I have P.E. next.", "Следующий урок — физкультура."],
    ["Let's have lunch together.", "Давай пообедаем вместе."]
  ],
  build: [
    ["Мой любимый предмет — математика.", "My favorite subject is math."],
    ["Английский мне трудно даётся.", "English is hard for me."],
    ["Давай пообедаем вместе.", "Let's have lunch together."],
    ["Какой у тебя следующий урок?", "What class do you have next?"]
  ],
  gaps: [
    ["My ___ subject is art.", "favorite", ["favorite", "easy", "next"], "Мой любимый предмет — рисование."],
    ["Math is ___ for me.", "easy", ["easy", "lunch", "subject"], "Математика мне легко даётся."],
    ["What class do you have ___?", "next", ["next", "now", "new"], "Какой у тебя следующий урок?"]
  ],
  dialog: { title: "Разговор с одноклассником", setting: "Перемена, к вам подходит одноклассник.",
    lines: [
      ["npc", "Hey! What class do you have next?", "Привет! Какой у тебя следующий урок?"],
      ["me", "Назовите следующий урок", "I have math next.", ["i have * next", "*"]],
      ["npc", "Cool. Is math hard for you?", "Круто. Математика тебе трудно даётся?"],
      ["me", "Ответьте: нет, легко. Английский трудно", "No, math is easy for me. English is hard.", ["no math is easy for me", "no it is easy", "math is easy for me english is hard", "yes it is hard", "no it is easy for me"]],
      ["npc", "What's your favorite subject?", "Какой твой любимый предмет?"],
      ["me", "Назовите любимый предмет", "My favorite subject is art.", ["my favorite subject is *", "*"]],
      ["npc", "Nice! Let's have lunch together.", "Классно! Давай пообедаем вместе."],
      ["me", "Согласитесь", "Sure! Thank you.", ["sure", "ok", "yes", "sure thank you", "ok thanks", "yes let us"]]
    ] },
  ai: "Ты американский одноклассник (15 лет). Расспрашивай меня о предметах, расписании, что мне легко и что трудно, зови пообедать. Говори как подросток, но просто и медленно, и иногда учи меня школьному сленгу с переводом."
},

s4: {
  track: "school", title: "Друзья и свободное время",
  goal: "Подружиться: рассказать о хобби, позвать погулять, обменяться контактами.",
  theory: [
    { h: "Хобби и спорт",
      t: "<b>I like …</b> — мне нравится… Спорт: <b>soccer</b> — футбол (наш футбол!), <b>football</b> — американский футбол (в Техасе он очень популярен), <b>basketball</b>, <b>volleyball</b>. Ещё: <b>music</b>, <b>games</b>, <b>drawing</b>.",
      ex: [["I like soccer.", "Я люблю футбол."], ["I play basketball.", "Я играю в баскетбол."]] },
    { h: "Позвать погулять",
      t: "<b>hang out</b> — тусоваться, проводить время. <b>Do you want to hang out?</b> — Хочешь погулять? <b>What do you do on the weekend?</b> — Что делаешь на выходных?",
      ex: [["Do you want to hang out?", "Хочешь погулять?"], ["What do you do on the weekend?", "Что ты делаешь на выходных?"]] },
    { h: "Как реагировать",
      t: "<b>That's cool!</b> — Круто! <b>Awesome!</b> — Отлично! <b>Me too!</b> — Я тоже! Контакты: <b>Can I have your number?</b> — Дашь свой номер?",
      ex: [["That's cool!", "Круто!"], ["Me too!", "Я тоже!"], ["Can I have your number?", "Дашь свой номер?"]] }
  ],
  words: [
    ["hang out", "гулять, тусоваться", "хэнг аут"],
    ["weekend", "выходные", "уИкэнд"],
    ["soccer", "футбол", "сОкэр"],
    ["football", "американский футбол", "фУтбол"],
    ["basketball", "баскетбол", "бАскетбол"],
    ["play", "играть", "плэй"],
    ["music", "музыка", "мьЮзик"],
    ["game", "игра", "гэйм"],
    ["fun", "весело", "фан"],
    ["cool", "крутой, классный", "кул"],
    ["awesome", "потрясающе", "Осэм"],
    ["me too", "я тоже", "ми ту"]
  ],
  phrases: [
    ["Do you want to hang out?", "Хочешь погулять?"],
    ["What do you do on the weekend?", "Что ты делаешь на выходных?"],
    ["I like soccer.", "Я люблю футбол."],
    ["Can I have your number?", "Дашь свой номер?"],
    ["That's cool!", "Круто!"],
    ["See you tomorrow!", "Увидимся завтра!"]
  ],
  build: [
    ["Хочешь погулять?", "Do you want to hang out?"],
    ["Я люблю футбол.", "I like soccer."],
    ["Дашь свой номер?", "Can I have your number?"],
    ["Увидимся завтра!", "See you tomorrow!"]
  ],
  gaps: [
    ["Do you want to hang ___?", "out", ["out", "up", "on"], "Хочешь погулять?"],
    ["I ___ basketball.", "play", ["play", "go", "like to"], "Я играю в баскетбол."],
    ["What do you do on the ___?", "weekend", ["weekend", "week", "Monday"], "Что ты делаешь на выходных?"]
  ],
  dialog: { title: "Новый друг", setting: "После уроков вы разговорились с одноклассником.",
    lines: [
      ["npc", "Hey, what do you do on the weekend?", "Слушай, что ты делаешь на выходных?"],
      ["me", "Расскажите, что любите делать", "I like soccer and music.", ["i like *", "i play *", "*"]],
      ["npc", "No way! Me too! Do you want to hang out on Saturday?", "Да ладно! Я тоже! Хочешь погулять в субботу?"],
      ["me", "Согласитесь", "Sure! That's cool.", ["sure", "yes", "yes sure", "sure that is cool", "ok", "yes i want"]],
      ["npc", "Awesome. Can I have your number?", "Отлично. Дашь свой номер?"],
      ["me", "Продиктуйте номер", "Sure. It's 214 555 0193.", ["{digits}"]],
      ["npc", "Cool. See you tomorrow!", "Круто. Увидимся завтра!"],
      ["me", "Попрощайтесь", "See you tomorrow!", ["see you tomorrow", "see you", "bye", "bye see you tomorrow"]]
    ] },
  ai: "Ты американский подросток 15 лет из Техаса. Мы знакомимся после школы: спрашивай про мои хобби, спорт, музыку, игры, зови погулять, проси номер. Используй немного подросткового сленга и объясняй его по-русски."
}

});

// Контрольные: проверяют всё пройденное с прошлой контрольной
Object.assign(window.COURSE.lessons, {
  k1: { track: "check", title: "Контрольная №1", checkpoint: true, goal: "20 вопросов по первым урокам. Нужно 80%." },
  k2: { track: "check", title: "Контрольная №2", checkpoint: true, goal: "20 вопросов по урокам с прошлой контрольной. Нужно 80%." },
  k3: { track: "check", title: "Контрольная №3", checkpoint: true, goal: "Итоговая проверка первого месяца. Нужно 80%." }
});

window.COURSE.tracks = {
  welder: { title: "Сварщик в Техасе", short: "Сварщик", who: "Для работы сварщиком: безопасность, инструмент, размеры, чертежи",
    path: ["c1", "c2", "c3", "c4", "w1", "c5", "w2", "k1", "c6", "c7", "c8", "w3", "c9", "w4", "k2", "c10", "c11", "c12", "c13", "c14", "k3"] },
  life: { title: "Жизнь в США", short: "Жизнь в США", who: "Для повседневной жизни: кафе, магазин, врач, звонки",
    path: ["c1", "c2", "c3", "c4", "l1", "c5", "k1", "c6", "c7", "l2", "c8", "c9", "k2", "c10", "c11", "l3", "c12", "c13", "c14", "l4", "k3"] },
  school: { title: "Школа в Техасе", short: "Школа", who: "Для подростка: школа, уроки, учителя, друзья",
    path: ["c1", "c2", "c3", "c4", "s1", "c5", "k1", "c6", "s2", "c7", "c8", "c9", "s3", "k2", "c10", "c11", "c12", "c13", "s4", "c14", "k3"] }
};

window.COURSE.trackLabels = { common: "База", welder: "Сварщик", life: "Жизнь в США", school: "Школа", check: "Контрольная" };
