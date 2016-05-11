const escape = require('escape-html');

module.exports = {
  tabs(title, header, content) {
    return `<div class="codetabs">
    <div class="codetabs-header">
      ${ header.join('') }
      <div class="tab pull-right">${ title }</div>
    </div>
    <div class="codetabs-body">${ content.join('') }</div>
  </div>`
  },
  tab(block, i, isActive) {
    return `<div class="tab ${ isActive ? 'active' : '' }" data-codetab="${ i }">${ block.name }</div>`;
  },
  tabBody(block, i, isActive) {
    return `<div class="tab ${ isActive ? 'active' : '' }" data-codetab="${ i }"><pre><code class="lang-${ block.name }">${ escape(block.body) }</code></pre></div>`;
  }
}