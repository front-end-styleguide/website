/* CODE
 * ========================================================================== */

import Prism from 'prismjs'

// Prism.js already ships with highlighting for
//   HTML
//   CSS
//   JavaScript

// Import additional languages
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-scss'

// Specify the supported highlight languages
const allowedHighlights = [
  'bash',
  'css',
  'html',
  'javascript',
  'scss'
]

/**
 * Highlight the content of a code element
 * @param {node} element code element to highlight
 */
function highlight (element) {
  let code = element.innerText
  let lang = element.getAttribute('lang')

  // Quit if the language attribute is not supported
  if (allowedHighlights.indexOf(lang) === -1) return

  element.innerHTML = Prism.highlight(code, Prism.languages[lang])
}

const codeElements = document.querySelectorAll('code[lang]')

for (let i = 0; i < codeElements.length; i++) {
  highlight(codeElements[i])
}
