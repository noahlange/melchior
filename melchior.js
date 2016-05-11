const fs = require('fs');
const map = require('lang-map');
const path = require('path');
const create = require('./create');
const first = arr => Array.isArray(arr) ? arr[0] : arr;

module.exports = function(root) {
  return function (includeFile, ...args) {
    // if the user is passing in an array, use that arg as the languages array,
    // otherwise all of the latter arguments as an array.
    const languages = Array.isArray(first(args)) ? first(args) : args;
    // get the un-extensioned name of the file to be included
    const include = `${root}/${includeFile}`;
    // just the last part of the filename, again sans extension
    const title = path.basename(include);
    // files in the directory containing our include
    const dir = fs.readdirSync(path.dirname(include));

    // two empty arrays for stringing
    const tabsContent = [];
    const tabsHeader = [];

    // if we don't have languages, we follow a slightly different mapping fn than if we do. 
    const files = languages ?

      languages
        .map(name => {
          // get the lowercase language name.
          const lc = name.toLowerCase();
          // fetch the first language result.
          const ext = first(map.extensions(lc));
          // is the include + extension in the directory?
          const found = dir.indexOf(`${title}.${ext}`) !== -1;
          // return false if not, otherwise an object we can generate a tab from.
          return found ? { name, body: fs.readFileSync(`${include}.${ext}`) } : found;
        }) :

      dir
        .filter(file => {
          // is the name of the file in the directory (sans ext) the same as the include?
          return path.basename(file, path.extname(file)) === path.basename(inc);
        })
        .map(file => {
          // get the extension name
          const ext = path.extname(file);
          // fetch the first language result for the extension
          const name = first(map.languages(ext));
          // return false si no existe, otherwise an object we can generate a tab from.
          return name ? { name, body: fs.readFileSync(`${include}${ext}`) } : false;
        });

    files
      .filter(file => !!file)
      .forEach((block, i) => {
        // first index
        const isActive = (i === 0);
        // push a new tab and tab body to header and content
        tabsHeader.push(create.tab(block, i, isActive));
        tabsContent.push(create.tabBody(block, i, isActive));
      });

    // generate our widget
    return create.tabs(title, tabsHeader, tabsContent);
  }
}