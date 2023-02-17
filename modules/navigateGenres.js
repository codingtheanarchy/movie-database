import {movie} from './selectors.js'

const movies = {
  comedy: ['17-again', 'bruce-almighty', 'the-proposal'],
  drama: ['good-will-hunting', 'lean-on-me', 'the-blind-side'],
  thriller: ['lucky-number-slevin', 'memory', 'the-code'],
}

//state management variables (what users clicke on is active)
let usersActiveGenre = undefined
let usersActiveMovies = undefined
let usersActiveBtnIndex = 0

export default function navigateGenres() {

  for (let i = 0; i < movie.genres.children.length; i++) {
    // check if option element has a value
    if (movie.genres.children[i].value) {
      movie.genres.children[i].addEventListener('click', function (event) {
        // resets the highlighted button to #1
        if (usersActiveBtnIndex > 0) {
          movie.buttons.children[usersActiveBtnIndex].classList.remove(
            'highlight'
          )
        }

        // resetting state management
        usersActiveBtnIndex = 0
        usersActiveGenre = event.target.value
        usersActiveMovies = movies[usersActiveGenre]

        //injectiong the first movie poster (0 injects 1st movie of array)
        movie.poster.src = `./images/${usersActiveGenre}/${movies[usersActiveGenre][0]}.webp`

        // reset all buttons to hidden
        for (let i = 0; i < movie.buttons.children.length; i++) {
          movie.buttons.children[i].classList.add('hidden')
        }

        //this code looks at how many movies are in the chosen genre and displays that many buttons
        for (let i = 0; i < usersActiveMovies.length; i++) {
          movie.buttons.children[i].classList.remove('hidden')
        }

        // adding highlight class to the first button when user selects a new genre
        movie.buttons.children[0].classList.add('highlight')
      })
    }
  }

  movie.buttons.addEventListener('click', function (event) {
    // removing previously hightlighted button
    movie.buttons.children[usersActiveBtnIndex].classList.remove('highlight')
    // reassign the active button index (textContent - 1 = back to index not length)
    usersActiveBtnIndex = event.target.textContent - 1

    // Add highlighted class to the targeted button
    event.target.classList.add('highlight')

    //this is the file path to the movie poster image
    movie.poster.src = `./images/${usersActiveGenre}/${usersActiveMovies[usersActiveBtnIndex]}.webp`
  })
}


