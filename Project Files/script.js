const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');


// List of words for game
const hwords =
[
  'koinonia',
  'minuscule',
  'rapport',
  'bourgeoisie',
  'bureaucracy',
  'maintenance',
  'liasion',
  'colonel',
  'onomatopoeia',
  'highfalutin',
  'homosapiens',
  'pomegranate',
  'superficial',
  'allosaurus',
  'archaeopteryx',
  'rhinoceros',
  'supersede',
  'cantaloupe',
  'congratulations',
  'mozambique',
  'fabaceae',
  'bombacaceae'
];

const ewords =
[
  'babble',
  'slam',
  'sigh',
  'tense',
  'splash',
  'mumble',
  'oxymoron',
  'ball',
  'pies',
  'juice',
  'buzz',
  'growl',
  'whoosh',
  'greek',
  'peter',
  'bad',
  'north',
  'bear',
  'oman',
  'admit',
  'drag',
  'loving',
  'champ',
  'cub',
  'puzzle',
  'copper',
  'teak'
];

const mwords = 
[
    'exaggerate',
    'hyperbole',
    'tamarind',
    'guava',
    'andorra',
    'maldives',
    'koala',
    'chameleon',
    'labernum',
    'quince',
    'eight',
    'feeble',
    'misspell',
    'airplane',
    'warlike',
    'dependent',
    'vocabulary',
    'thesarus',
    'dictionary',
    'steer',
    'silver',
    'baobab'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty value to medium
let difficulty =
  localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() 
{
    if(difficulty === 'easy')
    {
                        return ewords[Math.floor(Math.random() * ewords.length)];
    }
    else if (difficulty === 'medium' )
    {
                        return mwords[Math.floor(Math.random() * mwords.length)];
    }
    else if (difficulty === 'hard')
    {
                        return hwords[Math.floor(Math.random() * hwords.length)];
    }

}


// Add word to DOM
function addWordToDOM() 
{
      randomWord = getRandomWord();
      word.innerHTML = randomWord;
}

// Update score
function updateScore() 
{
      score += 10;
      scoreEl.innerHTML = score;
}

// Update time
function updateTime() 
{
      time--;
      timeEl.innerHTML = time + 's';

      if (time === 0) 
      {
            clearInterval(timeInterval);
            // end game
            gameOver();
      }
}

// Game over, show end screen
function gameOver() 
{
  endgameEl.innerHTML = 
    `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

  endgameEl.style.display = 'flex';
    confetti.start();
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', e => 
{
      const insertedText = e.target.value;

      if (insertedText === randomWord) 
      {
            addWordToDOM();
            updateScore();

            // Clear
            e.target.value = '';

            if (difficulty === 'hard') 
            {
                    time += 4;
            } 
            else if (difficulty === 'medium') 
            {
                    time += 5;
            } 
            else 
            {
                    time += 6;
            }

            updateTime();
      }
}
);

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => 
{
      difficulty = e.target.value;
      localStorage.setItem('difficulty', difficulty);
}
);

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));