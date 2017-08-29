/* CODE
 * ========================================================================== */

import Prism from 'prismjs'

// Import additional languages
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-django'
import 'prismjs/components/prism-scss'

// Specify the supported highlight languages
//
// Key: Prism.js language name
// Value: Array of aliases for this language
const supportedLanguages = {
  bash: ['command', 'sh', 'terminal'],
  css: ['style', 'stylesheet'],
  html: ['markup'],
  javascript: ['js', 'script'],
  jinja2: ['njk', 'nunjucks'],
  scss: ['sass']
}

/**
 * Get Prims.js language
 * @param {string} language Name of the language
 * @returns {(string|false)} Language name or false
 */
function getLanguage (language) {
  language = language.toLowerCase()

  for (let lang in supportedLanguages) {
    if (language === lang) {
      return lang
    }

    if (supportedLanguages[lang].indexOf(language) >= 0) {
      return lang
    }
  }

  return false
}

/**
 * Highlight the content of a code element
 * @param {HTMLElement} element DOM element with code to highlight
 */
function highlight (element) {
  let lang = getLanguage(element.dataset.lang)

  // Quit if the language is not supported
  if (!lang) return

  let code = element.textContent
  element.innerHTML = Prism.highlight(code, Prism.languages[lang])
}

const codeElements = document.querySelectorAll('code[data-lang]')

for (let i = 0; i < codeElements.length; i++) {
  highlight(codeElements[i])
}
