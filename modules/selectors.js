//querySelectors made into objects assigning variables
export const movie = {
  genres:document.querySelector('select'),
  poster:document.querySelector('.movie-poster'),
  buttons:document.querySelector('.movie-showcase-btns')
}

// Element objects associated with adding a new genre 
export const genreForm = {
  popup: document.querySelector('#add-movie-popup'),
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
  }
}
