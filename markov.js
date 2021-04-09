/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.toLowerCase().split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};

    for (let i = 0; i < this.words.length; i++) {
      if (!this.chains[this.words[i]]) {

        if (this.words[i + 1]) {
          this.chains[this.words[i]] = [this.words[i + 1]];
        } else {
          this.chains[this.words[i]] = [null];
        }

      } else {
        if (this.words[i + 1]) {
          this.chains[this.words[i]].push(this.words[i + 1]);
        } else {
          this.chains[this.words[i]].push(null);
        }
      }
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    if (numWords === 0) {
      return null;
    } else {
      const words = Object.keys(this.chains);
      let randWord = words[Math.floor(Math.random() * words.length)]

      if (numWords === 1) {
        return randWord;
      } else {
        const result = [randWord];
        for (let i = result.length; i <= numWords; i++) {
          const randChain = this.chains[randWord][Math.floor(Math.random() * this.chains[randWord].length)]
          
          if (randChain === null || i == numWords) {
            return result.join(" ");
          } else {
            result.push(randChain);
            randWord = randChain;
          }
        }
      }
    }
  }
}

module.exports = MarkovMachine;