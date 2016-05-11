const melchior = require('./melchior');

module.exports = {
  book: {
    assets: './assets',
    css: [ 'codetabs.css' ],
    js: [ 'codetabs.js' ]
  },
  filters: {
    melchior(includeFile, ...languages) {
      return melchior(`${ this.book.root }/_includes`)(includeFile, ...languages);
    }
  },
  melchior
};