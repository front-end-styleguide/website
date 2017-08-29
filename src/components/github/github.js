/* GITHUB
 * ========================================================================== */

const wrapper = document.querySelector('.js-github-repos')

/**
 * Create and inject markup for GitHub cards
 * @param {{name: string, description: string, html_url: string}[]} repos List of GitHub repositories
 */
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

/**
 * Handle fetch error
 * @param {string} url Requested URL
 * @param {number} status HTTP status code
 * @param {string} statusText HTTP status as text
 */
function handleError (url, status, statusText) {
  wrapper.innerHTML = `
    <article class="card">
      <header class="card__header">
        <h3 class="card__title">An error ocurred…</h3>
      </header>
      <div class="card__content">
        <p>
          ${status} ${statusText}<br>
          <small>${url}</small>
        </p>
      </div>
    </article>`
}

if (wrapper) {
  window.fetch('https://api.github.com/orgs/front-end-styleguide/repos')
    .then(response => {
      if (!response.ok) {
        handleError(response.url, response.status, response.statusText)
      }

      return response.json()
    })
    .then(data => createCards(data))
}
