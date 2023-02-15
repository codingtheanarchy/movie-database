const movies = {
  comedy: ['17-again', 'bruce-almighty', 'the-proposal'],
  drama: ['good-will-hunting', 'lean-on-me', 'the-blind-side'],
  thriller: ['lucky-number-slevin', 'memory', 'the-code'],
}

//state management variables (what users clicke on is active)
let usersActiveGenre = undefined
let usersActiveMovies = undefined
let usersActiveBtnIndex = 0

//querySelectors made into objects assigning variables
const genres = document.querySelector('select')
const moviePoster = document.querySelector('.movie-poster')
const movieShowcaseBtns = document.querySelector('.movie-showcase-btns')

// Element objects associated with adding a new genre 
const genreForm = {
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
      text: document.querySelector(".status-text")
    }
  }
}

//adding click event listeners to each genre inside select.
//if statement does not add event listener to a value property assign ""
for (let i = 0; i < genres.children.length; i++) {
  // check if option element has a value
  if (genres.children[i].value) {
    genres.children[i].addEventListener('click', function (event) {
      // resets the highlighted button to #1
      if (usersActiveBtnIndex > 0) {
        movieShowcaseBtns.children[usersActiveBtnIndex].classList.remove(
          'highlight'
        )
      }

      // resetting state management
      usersActiveBtnIndex = 0
      usersActiveGenre = event.target.value
      usersActiveMovies = movies[usersActiveGenre]

      //injectiong the first movie poster (0 injects 1st movie of array)
      moviePoster.src = `./images/${usersActiveGenre}/${movies[usersActiveGenre][0]}.webp`

      // reset all buttons to hidden
      for (let i = 0; i < movieShowcaseBtns.children.length; i++) {
        movieShowcaseBtns.children[i].classList.add('hidden')
      }

      //this code looks at how many movies are in the chosen genre and displays that many buttons
      for (let i = 0; i < usersActiveMovies.length; i++) {
        movieShowcaseBtns.children[i].classList.remove('hidden')
      }

      // adding highlight class to the first button when user selects a new genre
      movieShowcaseBtns.children[0].classList.add('highlight')
    })
  }
}

movieShowcaseBtns.addEventListener('click', function (event) {
  // removing previously hightlighted button
  movieShowcaseBtns.children[usersActiveBtnIndex].classList.remove('highlight')
  // reassign the active button index (textContent - 1 = back to index not length)
  usersActiveBtnIndex = event.target.textContent - 1

  // Add highlighted class to the targeted button
  event.target.classList.add('highlight')

  //this is the file path to the movie poster image
  moviePoster.src = `./images/${usersActiveGenre}/${usersActiveMovies[usersActiveBtnIndex]}.webp`
})

genreForm.toggle.open.addEventListener('click', function () {
  console.log(genreForm.popup)
  genreForm.popup.style.display = 'flex'
})

genreForm.toggle.close.addEventListener('click', function () {
  genreForm.popup.style.display = 'none'
})

// Active state for the FileReader
let fileSize = undefined
let divisor = undefined
let divisorMultiplier = 0
let progress = 0

genreForm.poster.inputElement.addEventListener('change', function () {
  // Accessing a FileList for a File object
  const file = genreForm.poster.inputElement.files[0]
  const reader = new FileReader()

  reader.addEventListener('loadstart', function (event) {
    // Display movie poster details box
    genreForm.poster.detailsBox.style.display = "flex" 
    // Display filename 
    genreForm.poster.status.fileName.textContent = file.name
    // Initiate files total size in bytes
    fileSize = event.total
    // Initiate the divisor
    divisor = Number(
      fileSize.toString().slice(0, fileSize.toString().length - 1)
    )
    divisorMultiplier = divisor
    console.log('The FileReader has started the read operation')
    console.log('The divisor has been set to: ', divisor)
  })

  reader.addEventListener('progress', function (event) {
    console.log('FileReader has loaded these many bytes so far: ', event.loaded)
    if (event.loaded >= divisorMultiplier) {
      progress += 10
      divisorMultiplier += divisor
      console.log(`Updating progress to ${progress}%`)
    }
  })

  reader.addEventListener('load', function () {
    console.log('The FileReader has completed')
    // set progress to 100% all the time
    progress = 100%
    console.log('Progress is 100%')
    // Display Green check mark and status: "complete"
    genreForm.poster.status.success.style.visibility = "visible"
    genreForm.poster.status.text.textContent = "complete"
    // Reset progress
    progress = 0
    genreForm.poster.preview.src = reader.result
  })

  reader.readAsDataURL(file)
})
