// Game Data for The New Experience Quest Adventure - With Local Audio Filenames

const gameScenes = [{
    id: 1,
    type: 'choice',
    title: 'Zone 1: The Cool Green Forest',
    image: '../../../../images/G2/U2/G2U2Scene1Q1.png',
    storyText: 'Nori enters the cool green forest. A strange, jelly-like mushroom on a log begins to ___.',
    storyAudio: 'StoryText1.mp3',
    question: 'Zone 1: The Cool Green Forest',
    questionAudio: 'questionAudio1.mp3',
    hint: 'The mushroom moves gently side to side',
    hintAudio: 'G2U2Scene1Q1-hint.mp3',
    explanation: 'Great! Wobble means to shake or move unsteadily, just like a jiggly mushroom might do.',
    explanationAudio: 'Q1-explanation.mp3',
    choices: [{
        text: 'jump',
        correct: false,
        emoji: '🤾',
        audio: 'Scene1O1.mp3'
      },
      {
        text: 'wobble',
        correct: true,
        emoji: '🫨',
        audio: 'Scene1O2.mp3'
      },
      {
        text: 'run',
        correct: false,
        emoji: '🏃',
        audio: 'Scene1O3.mp3'
      },
      {
        text: 'shine',
        correct: false,
        emoji: '✨',
        audio: 'Scene1O4.mp3'
      },
    ],
  },
  {
    id: 2,
    type: 'choice',
    title: 'Zone 1: The Cool Green Forest',
    image: '../../../../images/G2/U2/G2U2Scene1Q2.webp',
    storyText: 'Nori sees a long vine on the ground that seems to ________ like a snake',
    storyAudio: 'StoryText2.mp3',
    question: 'Zone 1: The Cool Green Forest',
    questionAudio: 'questionAudio1.mp3',
    hint: 'Snakes move by sliding along the ground. ',
    hintAudio: 'G2U2Scene1Q2-hint.mp3',
    explanation: 'Yes! Slither means to slide smoothly, the way snakes move.',
    explanationAudio: 'Q2-explanation.mp3',
    choices: [{
        text: 'slither',
        correct: true,
        emoji: '🐍',
        audio: 'Scene2O1.mp3'
      },
      {
        text: 'fly',
        correct: false,
        emoji: '🕊️',
        audio: 'Scene2O2.mp3'
      },
      {
        text: 'talk',
        correct: false,
        emoji: '🗣️',
        audio: 'Scene2O3.mp3'
      },
      {
        text: 'stand',
        correct: false,
        emoji: '🧍',
        audio: 'Scene2O4.mp3'
      },
    ],
  },
  {
    id: 3,
    type: 'choice',
    title: 'Zone 1: The Cool Green Forest',
    image: '../../../../images/G2/U2/G2U2Scene1Q3.png',
    storyText: 'It gets a little dark, so Nori turns on the ________ to see the path ahead.',
    storyAudio: 'StoryText3.mp3',
    question: 'Zone 1: The Cool Green Forest',
    questionAudio: 'questionAudio1.mp3',
    hint: 'You use this object to help you see in the dark',
    hintAudio: 'G2U2Scene1Q3-hint.mp3',
    explanation: 'Right! A flashlight shines light to help people see when it is dark.',
    explanationAudio: 'Q3-explanation.mp3',
    choices: [{
        text: 'radio',
        correct: false,
        emoji: '📻',
        audio: 'Scene3O1.mp3'
      },
      {
        text: 'camera',
        correct: false,
        emoji: '📷',
        audio: 'Scene3O2.mp3'
      },
      {
        text: 'flashlight',
        correct: true,
        emoji: '🔦',
        audio: 'Scene3O3.mp3'
      },
      {
        text: 'fan',
        correct: false,
        emoji: '🌀',
        audio: 'Scene3O4.mp3'
      },


    ],
  },
  {
    id: 4,
    type: 'choice',
    title: 'Zone 1: The Cool Green Forest',
    image: '../../../../images/G2/U2/G2U2Scene1Q4.webp',
    storyText: "Nori carefully crosses a small __and gets a tiny __on a branch, but keeps going bravely.",
    storyAudio: 'StoryText4.mp3',
    question: 'Zone 1: The Cool Green Forest',
    questionAudio: 'questionAudio1.mp3',
    hint: 'Moving water + a tiny mark on the skin.',
    hintAudio: 'G2U2Scene1Q4-hint.mp3',
    explanation: 'Wonderful! A stream is a small body of flowing water, and a scratch is a small mark made by something sharp. ',
    explanationAudio: 'Q4-explanation.mp3',
    choices: [{
        text: 'mountain, gift',
        correct: false,
        emoji: '⛰️🎁',
        audio: 'Scene4O1.mp3'
      },
      {
        text: 'stream, scratch',
        correct: true,
        emoji: '🌊🐾',
        audio: 'Scene4O2.mp3'
      },
      {
        text: 'road, book',
        correct: false,
        emoji: '🛣️📘',
        audio: 'Scene4O3.mp3'
      },
      {
        text: 'cloud, song',
        correct: false,
        emoji: '☁️🎵',
        audio: 'Scene4O4.mp3'
      },

    ],
  },
  {
    id: 5,
    type: 'choice',
    title: 'Reflection Question',
    image: '../../../../images/G2/U2/Reflection_Question.webp',
    storyText: 'What did Nori learn from trying something new in nature?',
    storyAudio: 'StoryTextReflexion1.mp3',
    question: 'Reflection Question',
    questionAudio: 'ReflexionquestionAudio.mp3',
    hint: 'The story shows Nori exploring bravely.',
    hintAudio: 'G2U2Scene1-Reflexion.mp3',
    explanation: 'Great! Nori enjoyed discovering new things, so the message is positive.',
    explanationAudio: 'Reflexion1-explanation.mp3',
    choices: [{
        text: 'Trying new things can be cool.',
        correct: true,
        emoji: '🌟',
        audio: 'Scene5O1.mp3'
      },
      {
        text: 'I should stay inside.',
        correct: false,
        emoji: '🏠',
        audio: 'Scene5O2.mp3'
      },
      {
        text: 'Forests are boring.',
        correct: false,
        emoji: '🙄',
        audio: 'Scene5O3.mp3'
      },

    ],
  },
  {
    id: 6,
    type: 'choice',
    title: 'Zone 2: The Carnival of Surprises ',
    image: '../../../../images/G2/U2/G2U2Scene1Q5.webp',
    storyText: 'Nori walks around the bright and noisy __. Suddenly, a magician makes a rabbit appear, and the whole crowd lets out a ___.',
    storyAudio: 'StoryText5.mp3', // Audio should match the new storyText
    question: 'Zone 2: The Carnival of Surprises ',
    questionAudio: 'questionAudio2.mp3', // Audio should match the new question
    hint: 'A lively place + a surprised sound.',
    hintAudio: 'G2U2Scene1Q5-hint.mp3',
    explanation: 'Yes! A carnival is bright and noisy, and a gasp is a sound made when surprised.',
    explanationAudio: 'Q6-explanation.mp3',
    choices: [{
        text: 'library, whisper',
        correct: false,
        emoji: '📚🤫',
        audio: 'Scene6O1.mp3'
      },
      {
        text: 'carnival, gasp',
        correct: true,
        emoji: '🎡😲',
        audio: 'Scene6O2.mp3'
      },
      {
        text: 'school, laugh',
        correct: false,
        emoji: '🏫😄',
        audio: 'Scene6O3.mp3'
      },
      {
        text: 'park, yawn',
        correct: false,
        emoji: '🌳😴',
        audio: 'Scene6O4.mp3'
      },

    ],
  },
  {
    id: 7,
    type: 'choice',
    title: 'Zone 2: The Carnival of Surprises',
    image: '../../../../images/G2/U2/G2U2Scene1Q6.webp',
    storyText: 'Nori is given a simple ________: to catch a falling star in a game.To win, Nori must ______. ',
    storyAudio: 'StoryText6.mp3',
    question: 'Zone 2: The Carnival of Surprises',
    questionAudio: 'questionAudio2.mp3',
    hint: 'A job + working hard to do it well',
    hintAudio: 'G2U2Scene1Q6-hint.mp3',
    explanation: 'Excellent! A task is a job to do, and to succeed means to do it well',
    explanationAudio: 'Q7-explanation.mp3',
    choices: [{
        text: 'task, succeed',
        correct: true,
        emoji: '🏆✅',
        audio: 'Scene7O1.mp3'
      },
      {
        text: 'test, fail',
        correct: false,
        emoji: '❌📋',
        audio: 'Scene7O2.mp3'
      },
      {
        text: 'nap, sleep',
        correct: false,
        emoji: '😴🛌',
        audio: 'Scene7O3.mp3'
      },
      {
        text: 'song, listen',
        correct: false,
        emoji: '🎵👂',
        audio: 'Scene7O4.mp3'
      },


    ],
  },
  {
    id: 8,
    type: 'choice',
    title: 'Zone 2: The Carnival of Surprises',
    image: '../../../../images/G2/U2/G2U2Scene1Q7.webp',
    storyText: 'The star falls in a curve, shaped like the tip of a ___. Nori catches it and wins a small ___. ',
    storyAudio: 'StoryText7.mp3',
    question: 'Zone 2: The Carnival of Surprises',
    questionAudio: 'questionAudio2.mp3',
    hint: 'Pointy object + something you win. ',
    hintAudio: 'G2U2Scene1Q7-hint.mp3',
    explanation: 'Yes! A spear has a pointed tip, and a prize is something won in a game.',
    explanationAudio: 'Q8-explanation.mp3',
    choices: [{
        text: 'flower, rock',
        correct: false,
        emoji: '🌸🪨',
        audio: 'Scene8O1.mp3'
      },
      {
        text: 'spoon, leaf',
        correct: false,
        emoji: '🥄🍃',
        audio: 'Scene8O2.mp3'
      },
      {
        text: 'spear, prize',
        correct: true,
        emoji: '🗡️🏆',
        audio: 'Scene8O3.mp3'
      },
      {
        text: 'pillow, cloud',
        correct: false,
        emoji: '🛏️☁️',
        audio: 'Scene8O4.mp3'
      }
    ],

  },
  {
    id: 9,
    type: 'choice',
    title: 'Reflection Question',
    image: '../../../../images/G2/U2/Reflection2_Question.webp',
    storyText: 'What did Nori learn from trying something new at the carnival?',
    storyAudio: 'StoryTextReflexion2.mp3',
    question: 'Reflection Question',
    questionAudio: 'ReflexionquestionAudio.mp3',
    hint: 'Nori tried something new and won. ',
    hintAudio: 'G2U2Scene2-Reflexion.mp3',
    explanation: 'Nori succeeded because they tried. ',
    explanationAudio: 'Reflexion2-explanation.mp3',
    choices: [{
        text: 'Trying helps me succeed.',
        correct: true,
        emoji: '🌟🏆',
        audio: 'Scene9O1.mp3'
      },
      {
        text: 'Carnivals are too loud.',
        correct: false,
        emoji: '🎡🔊',
        audio: 'Scene9O3.mp3'
      },
      {
        text: 'Games are not fun.',
        correct: false,
        emoji: '🎮😕',
        audio: 'Scene9O2.mp3'
      },

    ],
  },
  {
    id: 10,
    type: 'choice',
    title: 'Zone 3: The Camping Stream',
    image: '../../../../images/G2/U2/G2U2Scene1Q8.webp',
    storyText: 'Nori arrives at the campsite and must ________ the tent. Then, it is time to ________ the supplies.',
    storyAudio: 'StoryText8.mp3',
    question: 'Zone 3: The Camping Stream',
    questionAudio: 'questionAudio3.mp3',
    hint: 'Open tent → take things out of bags.',
    hintAudio: 'G2U2Scene1Q8-hint.mp3',
    explanation: 'Great! You unlock something to open it, and unpack means to take items out.',
    explanationAudio: 'Q9-explanation.mp3',
    choices: [{
        text: 'close, pack',
        correct: false,
        emoji: '🚪❌',
        audio: 'Scene10O1.mp3'
      },
      {
        text: 'unlock, unpack',
        correct: true,
        emoji: '🔓📦',
        audio: 'Scene10O2.mp3'
      },
      {
        text: 'paint, draw',
        correct: false,
        emoji: '🎨✏️',
        audio: 'Scene10O3.mp3'
      },
      {
        text: 'find, lose',
        correct: false,
        emoji: '🔍❌',
        audio: 'Scene10O4.mp3'
      },

    ],
  },
  {
    id: 11,
    type: 'choice',
    title: 'Zone 3: The Camping Stream',
    image: '../../../../images/G2/U2/G2U2Scene1Q9.png',
    storyText: 'Nori lays out a warm ________ and eats a yummy ________ snack. The quiet forest begins to ________ Nori of exploring.',
    storyAudio: 'StoryText9.mp3',
    question: 'Zone 3: The Camping Stream',
    questionAudio: 'questionAudio3.mp3',
    hint: 'Something cozy + a small fruit + remembering something. ',
    hintAudio: 'G2U2Scene1Q9-hint.mp3',
    explanation: 'Nice try! A rock can be something Nori sits near, an apple is a tasty snack, and show means to help someone see or notice something.',
    explanationAudio: 'Q10-explanation.mp3',
    choices: [{
        text: 'rock, apple, show',
        correct: true,
        emoji: '🪨🍎👀',
        audio: 'Scene11O1.mp3'
      },
      {
        text: 'blanket, blueberry, remind',
        correct: false,
        emoji: '🛏️🫐🔔',
        audio: 'Scene11O2.mp3'
      },
      {
        text: 'shirt, banana, tell',
        correct: false,
        emoji: '👕🍌🗣️',
        audio: 'Scene11O3.mp3'
      },
      {
        text: 'book, cookie, ask',
        correct: false,
        emoji: '📖🍪❓',
        audio: 'Scene11O4.mp3'
      }
    ],

  },
  {
    id: 12,
    type: 'choice',
    title: 'Zone 3: The Camping Stream',
    image: '../../../../images/G2/U2/G2U2Scene1Q10.webp',
    storyText: 'Nori writes in a ________. Hearing a noise by the ________, Nori shines the ________ to see what it is.',
    storyAudio: 'StoryText10.mp3',
    question: 'Zone 3: The Camping Stream',
    questionAudio: 'questionAudio3.mp3',
    hint: 'A place to write + flowing water + light for dark places.',
    hintAudio: 'G2U2Scene1Q10-hint.mp3',
    explanation: 'Great! A journal is used for writing feelings, a stream is water, and a flashlight helps you see.',
    explanationAudio: 'Q11-explanation.mp3',
    choices: [{
        text: 'newspaper, road, lamp',
        correct: false,
        emoji: '📰🛣️💡',
        audio: 'Scene12O1.mp3'
      },
      {
        text: 'journal, stream, flashlight',
        correct: true,
        emoji: '📔🌊🔦',
        audio: 'Scene12O2.mp3'
      },
      {
        text: 'letter, house, candle',
        correct: false,
        emoji: '📬🏠🕯️',
        audio: 'Scene12O3.mp3'
      },
      {
        text: 'sign, car, fire',
        correct: false,
        emoji: '🚩🚗🔥',
        audio: 'Scene12O4.mp3'
      },

    ],
  },
  {
    id: 13,
    type: 'choice',
    title: 'Reflection Question',
    image: '../../../../images/G2/U2/Reflection3_Question.webp',
    storyText: 'What did Nori learn from trying camping?',
    storyAudio: 'StoryTextReflexion3.mp3',
    question: 'Reflection Question',
    questionAudio: 'ReflexionquestionAudio.mp3',
    hint: 'Nori was nervous but still tried. ',
    hintAudio: 'G2U2Scene3-Reflexion.mp3',
    explanation: 'Nori learned courage through trying. ',
    explanationAudio: 'Reflexion3-explanation.mp3',
    choices: [{
        text: 'I can try even when I feel unsure.',
        correct: true,
        emoji: '🌟',
        audio: 'SceneRef3O1.mp3'
      },
      {
        text: 'It is better to stay home.',
        correct: false,
        emoji: '🏠',
        audio: 'SceneRef3O2.mp3'
      },
      {
        text: 'Camping is too much work.',
        correct: false,
        emoji: '😴',
        audio: 'SceneRef3O3.mp3'
      }
    ],
  },

  {
    id: 14,
    type: 'choice',
    title: 'Zone 4: The Creative Blanket Studio',
    image: '../../../../images/G2/U2/G2U2Scene1Q11.png',
    storyText: "Nori's new task is to design a creative ________. First, Nori chooses a striking pattern that looks very impressive.",
    storyAudio: 'StoryText11.mp3',
    question: 'Zone 4: The Creative Blanket Studio',
    questionAudio: 'questionAudio4.mp3',
    hint: 'This object can have patterns and be designed. ',
    hintAudio: 'G2U2Scene1Q11-hint.mp3',
    explanation: 'Correct! A creative blanket can have designs and patterns.',
    explanationAudio: 'Q12-explanation.mp3',
    choices: [{
        text: 'blanket',
        correct: true,
        emoji: '🛏️',
        audio: 'Scene14O1.mp3'
      },
      {
        text: 'window',
        correct: false,
        emoji: '🪟',
        audio: 'Scene14O2.mp3'
      },
      {
        text: 'door',
        correct: false,
        emoji: '🚪',
        audio: 'Scene14O3.mp3'
      },
      {
        text: 'floor',
        correct: false,
        emoji: '🧱',
        audio: 'Scene14O4.mp3'
      },
    ],
  },

  {
    id: 15,
    type: 'choice',
    title: 'Zone 4: The Creative Blanket Studio',
    image: '../../../../images/G2/U2/G2U2Scene1Q12.png',
    storyText: 'Next, Nori adds a ________ to the design. It says, "My cool creation!"',
    storyAudio: 'StoryText12.mp3',
    question: 'Zone 4: The Creative Blanket Studio',
    questionAudio: 'questionAudio4.mp3',
    hint: 'A short phrase under a picture.',
    hintAudio: 'G2U2Scene1Q12-hint.mp3',
    explanation: 'Yes! A caption is a short line of text that explains or labels something.',
    explanationAudio: 'Q13-explanation.mp3',
    choices: [{
        text: 'caption',
        correct: true,
        emoji: '💬',
        audio: 'Scene15O1.mp3'
      },
      {
        text: 'number',
        correct: false,
        emoji: '🔢',
        audio: 'Scene15O2.mp3'
      },
      {
        text: 'button',
        correct: false,
        emoji: '🔘',
        audio: 'Scene15O3.mp3'
      },
      {
        text: 'sound',
        correct: false,
        emoji: '🔊',
        audio: 'Scene15O4.mp3'
      },
    ],
  },

  {
    id: 16,
    type: 'choice',
    title: 'Zone 4: The Creative Blanket Studio',
    image: '../../../../images/G2/U2/G2U2Scene1Q13.png',
    storyText: 'For a fun touch, Nori adds a simple ________ like "sun" and "fun." Finally, Nori ties a beautiful ________ around the finished project.',
    storyAudio: 'StoryText13.mp3',
    question: 'Zone 4: The Creative Blanket Studio',
    questionAudio: 'questionAudio4.mp3',
    hint: 'Words that sound alike + a decorative string.',
    hintAudio: 'G2U2Scene1Q13-hint.mp3',
    explanation: 'Great! A rhyme uses words that sound alike, and lace is a delicate decorative material.',
    explanationAudio: 'Q14-explanation.mp3',
    choices: [{
        text: 'story, rope',
        correct: false,
        emoji: '📖🪢',
        audio: 'Scene16O1.mp3'
      },
      {
        text: 'rhyme, lace',
        correct: true,
        emoji: '🎵🎀',
        audio: 'Scene16O2.mp3'
      },
      {
        text: 'puzzle, string',
        correct: false,
        emoji: '🧩🧵',
        audio: 'Scene16O3.mp3'
      },
      {
        text: 'question, ribbon',
        correct: false,
        emoji: '❓🎗️',
        audio: 'Scene16O4.mp3'
      },
    ],
  },

  {
    id: 17,
    type: 'choice',
    title: 'Reflection Question',
    image: '../../../../images/G2/U2/Reflection4_Question.webp',
    storyText: 'What did Nori learn from trying something creative?',
    storyAudio: 'StoryTextReflexion4.mp3',
    question: 'Reflection Question',
    questionAudio: 'ReflexionquestionAudio.mp3',
    hint: 'Nori enjoyed making something new',
    hintAudio: 'G2U2Scene4-Reflexion.mp3',
    explanation: 'Creativity comes from trying new ideas, not just from being an artist.',
    explanationAudio: 'Reflexion4-explanation.mp3',
    choices: [{
        text: 'Creativity grows when I try new ideas.',
        correct: true,
        emoji: '🌟',
        audio: 'SceneRef4O1.mp3'
      },
      {
        text: 'Making things is not for me.',
        correct: false,
        emoji: '😕',
        audio: 'SceneRef4O2.mp3'
      },
      {
        text: 'Only artists can be creative.',
        correct: false,
        emoji: '🎨',
        audio: 'SceneRef4O3.mp3'
      },
    ],
  },

  // -----------------------------
  // ZONE 5 STARTS HERE (id 18)
  // -----------------------------

  {
    id: 18,
    type: 'choice',
    title: 'Zone 5: The Journey Tower',
    image: '../../../../images/G2/U2/G2U2Scene1Q18.webp',
    storyText: 'Nori enters a tower of books to learn about a famous traveler\'s ________. A book opens with the ________: "The Travels of Ibn Battuta."',
    storyAudio: 'StoryText14.mp3',
    question: 'Zone 5: The Journey Tower',
    questionAudio: 'questionAudio5.mp3',
    hint: 'It is something travelers go on + the top line of a page.',
    hintAudio: 'G2U2Scene1Q14-hint.mp3',
    explanation: 'Correct! A journey is a long trip, and a heading is a title at the top of a page. ',
    explanationAudio: 'Q15-explanation.mp3',
    choices: [{
        text: 'journey, heading',
        correct: true,
        emoji: '🧭📘',
        audio: 'Scene18O1.mp3'
      },
      {
        text: 'party, title',
        correct: false,
        emoji: '🎉',
        audio: 'Scene18O2.mp3'
      },
      {
        text: 'lunch, word',
        correct: false,
        emoji: '🍽️',
        audio: 'Scene18O3.mp3'
      },
      {
        text: 'game, picture',
        correct: false,
        emoji: '🎮',
        audio: 'Scene18O4.mp3'
      },

    ],
  },

  {
    id: 19,
    type: 'choice',
    title: 'Zone 5: The Journey Tower',
    image: '../../../../images/G2/U2/G2U2Scene1Q19.png',
    storyText: 'Nori has to use ________ clues to guess a word’s meaning. Nori also gets to ________ a short animation and learn a word in a new ________.',
    storyAudio: 'StoryText15.mp3',
    question: 'Zone 5: The Journey Tower',
    questionAudio: 'questionAudio5.mp3',
    hint: 'Clues around a word + watching something + a way people speak. ',
    hintAudio: 'G2U2Scene1Q15-hint.mp3',
    explanation: 'Exactly! Context clues help with meaning, to witness means to see, and language is words used by people.',
    explanationAudio: 'Q16-explanation.mp3',
    choices: [{
        text: 'color, hear, song',
        correct: false,
        emoji: '🎨🎵',
        audio: 'Scene19O1.mp3'
      },
      {
        text: 'context, witness, language',
        correct: true,
        emoji: '📚👀🌐',
        audio: 'Scene19O2.mp3'
      },
      {
        text: 'number, see, math',
        correct: false,
        emoji: '🔢👁️',
        audio: 'Scene19O3.mp3'
      },
      {
        text: 'size, touch, science',
        correct: false,
        emoji: '📏✋🧪',
        audio: 'Scene19O4.mp3'
      },
    ],
  },

  {
    id: 20,
    type: 'choice',
    title: 'Zone 5: The Journey Tower',
    image: '../../../../images/G2/U2/G2U2Scene1Q20.webp',
    storyText: 'Another character looks ________ and bored, but joins in after Nori shares an ________: "Learning new things is fun!"',
    storyAudio: 'StoryText16.mp3',
    question: 'Zone 5: The Journey Tower',
    questionAudio: 'questionAudio5.mp3',
    hint: 'Not interested + what you think. ',
    hintAudio: 'G2U2Scene1Q16-hint.mp3',
    explanation: 'Perfect! Disinterested means not interested, and an opinion is a personal thought.',
    explanationAudio: 'Q17-explanation.mp3',
    choices: [{
        text: 'happy, idea',
        correct: false,
        emoji: '😊',
        audio: 'Scene20O1.mp3'
      },
      {
        text: 'disinterested, opinion',
        correct: true,
        emoji: '😐💬',
        audio: 'Scene20O2.mp3'
      },
      {
        text: 'excited, question',
        correct: false,
        emoji: '❓',
        audio: 'Scene20O3.mp3'
      },
      {
        text: 'sleepy, story',
        correct: false,
        emoji: '😴',
        audio: 'Scene20O4.mp3'
      },
    ],
  },

  {
    id: 21,
    type: 'choice',
    title: 'Reflection Question',
    image: '../../../../images/G2/U2/Reflection5_Question.png',
    storyText: 'What did Nori learn from learning about journeys?',
    storyAudio: 'StoryTextReflexion5',
    question: 'Reflection Question',
    questionAudio: 'ReflexionquestionAudio.mp3',
    hint: 'Nori learned something from stories. ',
    hintAudio: 'G2U2Scene5-Reflexion.mp3',
    explanation: 'Stories teach us about the world and ideas.',
    explanationAudio: 'Reflexion5-explanation.mp3',
    choices: [{
        text: 'Stories help me understand new ideas.',
        correct: true,
        emoji: '📖✨',
        audio: 'SceneRef5O1.mp3'
      },
      {
        text: 'Reading is boring.',
        correct: false,
        emoji: '😑',
        audio: 'SceneRef5O2.mp3'
      },
      {
        text: 'Traveling is not important.',
        correct: false,
        emoji: '🛑',
        audio: 'SceneRef5O3.mp3'
      },
    ],
  },


];
