/* GITHUB
 * ========================================================================== */

import axios from 'axios'

const wrapper = document.querySelector('.js-github-repos')

function createCards (repos) {
  let cardMarkup = ''

  repos.forEach(repo => {
    cardMarkup += `
      <article class="card">
        <header class="card__header">
          <h3 class="card__title">
            <a href="${repo.html_url}">${repo.name}</a>
          </h3>
        </header>
        <div class="card__content">
          <p>${repo.description}</p>
        </div>
      </article>`
  })

  wrapper.innerHTML = cardMarkup
}

function handleError (error) {
  wrapper.innerHTML = `
    <article class="card">
      <header class="card__header">
        <h3 class="card__title">An error ocurred…</h3>
      </header>
      <div class="card__content">
        <p>${error}</p>
      </div>
    </article>
  `
}

if (wrapper) {
  axios.get('https://api.github.com/orgs/front-end-styleguide/repos')
    .then(response => createCards(response.data))
    .catch(error => handleError(error))
}
