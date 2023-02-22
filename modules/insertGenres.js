import {
  movie as homeGenreDropdown,
  genreForm as popupGenreDropdown,
} from './selectors.js'

export const movies = {
  comedy: ['17-again', 'bruce-almighty', 'the-proposal'],
  drama: ['good-will-hunting', 'lean-on-me', 'the-blind-side'],
  thriller: ['lucky-number-slevin', 'memory', 'the-code'],
}

const genreList = Object.keys(movies)
console.log(genreList)

export function insertsGenres() {
  for (let i = 0; i < genreList.length; i++) {
    // Creates a new option element for our home genre dropdown box
    const homeOptionElement = document.createElement('option')
    // Creates a new option element for our popup genre dropdown box
    const popupOptionElement = document.createElement('option')
    // Adds genre name to the text content property of the newly created option elements
    homeOptionElement.textContent = genreList[i]
    popupOptionElement.textContent = genreList[i]
    // Add genre class to home option element
    homeOptionElement.className = 'genre'
    // Populates the home and popup genre dropdown boxes
    homeGenreDropdown.genres.add(homeOptionElement)
    popupGenreDropdown.genres.add(popupOptionElement)
  }
}
