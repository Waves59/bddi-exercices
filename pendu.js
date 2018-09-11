// Prérequis pour le prompteur (pas d'importance pour le cours)

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// La fonction Game a terminer (ça se corse)

const WORD_LIST = ['chevre', 'vache']

class Game {
  constructor() {
    let letters = [], // letters entered by user
      lives = 5, // lives left
      word, // the current word
      missing // number of letters missing

    function init() {
      lives = 5

      word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];// TODO: récupérer un mot random depuis WORD_LIST (1 ligne
        letters = [];
      // Count without duplicated
      missing = Array.prototype.filter.call(word, (letter, i) => {
        return word.indexOf(letter) == i
      }).length
    }

    function addLetter(letter) {

      if (letters.indexOf(letter) > -1) return // Already tried
      letters.push(letter)
      if (word.indexOf(letter) < 0)
        lives--
      else
        missing--
    }
      

    

    function displayWord() {
      
      var display = ''
      
      for (var i = 0, len = word.length; i < len; i++) {
        if (letters.indexOf(word[i]) < 0) {
          // Not found letter
          display += '_'
        } else {
          // Found letter
          display += word[i]
        }
      }
      return display

      // TODO: cette fonction doit:
      // - retourner une chaine de caractère
      // - les lettres trouvées et celles manquantes remplacées par un underscore
      // - exemple : v_ch_e
      // - Utiliser une boucle for et la concaténation
      // - (9 lignes)
    }

    function prompt(cb) {
      console.log(Array(lives + 1).join('❤'))
      rl.question(displayWord() + '\r\n', cb)
    }

    function onAnswer(answer) {
      addLetter(answer[0])

      if (missing > 0 && lives > 0) {
        prompt(onAnswer)
      }
      else {
        console.log(['End of the game.', 'you', missing > 0 ? 'lose' : 'win', '!'].join(' '))
        rl.close()
      }
    }

    return {
      play() {
        init()
        console.log('Vous êtes prêts ? Devinez le mot.')
        prompt(onAnswer)
      }
    }
  }
  play() { }
}

const game = new Game()

game.play()
