//querySelectors made into objects assigning variables
export const movie = {
  genres:document.querySelector('#home-genre-box select'),
  poster:document.querySelector('.movie-poster'),
  buttons:document.querySelector('.movie-showcase-btns')
}

// Element objects associated with adding a new genre 
export const genreForm = {
  popup: document.querySelector('#add-movie-popup'),
  genres: document.querySelector('#popup-genre-box select'),
  addGenreBtn: document.querySelector('#popup-genre-box button'),
  newGenreInput: document.querySelector('#popup-genre-box input'),
  newMovieInput: document.querySelector('#movie-title'),
  toggle: {
    open: document.querySelector('footer button'),
    close: document.querySelector('#exit-form-btn')
  },
  poster: {
    inputElement: document.querySelector('input[type=file]'),
    preview: document.querySelector('#drag-n-drop-box img'),
    detailsBox: document.querySelector('#uploaded-movie-file'),
    status: {
      success: document.querySelector(".green-check"),
      failure: document.querySelector(".red-cross"),
      fileName: document.querySelector(".file-name"),
      text: document.querySelector(".status-text"),
      trash: document.querySelector(".trash")
    }
  },
  submitMovieBtn: document.querySelector("#submission-box button")
}
