const melchior = require('./melchior');

module.exports = {
  book: {
    assets: './assets',
    css: [ 'codetabs.css' ],
    js: [ 'codetabs.js' ]
  },
  filters: {
    melchior(includeFile, ...languages) {
      const path = this.config.get('pluginsConfig.melchior.includes');
      return melchior(this.resolve(path))(includeFile, ...languages);
    }
  },
  melchior
};