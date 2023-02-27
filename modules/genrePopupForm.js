import { genreForm } from './selectors.js'
import { movies } from './insertGenres.js'
const previousPoster = [{ name: undefined }]
let fileReaderInfo = undefined

export default function genrePopupForm() {
  genreForm.toggle.open.addEventListener('click', function () {
    console.log(genreForm.popup)
    genreForm.popup.style.display = 'flex'
  })

  genreForm.toggle.close.addEventListener('click', function () {
    // Reset the form field values to empty strings
    genreForm.genres.value = ''
    genreForm.newGenreInput.value = ''
    genreForm.newMovieInput.value = ''
    // Reset the display property values for applicable elements
    genreForm.newGenreInput.style.display = 'none'
    genreForm.genres.style.display = 'block'
    genreForm.addGenreBtn.style.display = 'block'
    genreForm.popup.style.display = 'none'
    // Reset poster preview
    genreForm.poster.preview.src = '../images/upload.png'
    genreForm.poster.detailsBox.style.display = 'none'
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

    // copy instance to global scope
    fileReaderInfo = reader

    reader.addEventListener('loadstart', function (event) {
      // Display movie poster details box
      genreForm.poster.detailsBox.style.display = 'flex'
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
      console.log(
        'FileReader has loaded these many bytes so far: ',
        event.loaded
      )
      if (event.loaded >= divisorMultiplier) {
        progress += 10
        divisorMultiplier += divisor
        console.log(`Updating progress to ${progress}%`)
      }
    })

    reader.addEventListener('load', function () {
      console.log('The FileReader has completed')
      // set progress to 100% all the time
      progress = 100 % console.log('Progress is 100%')
      // Display Green check mark and status: "complete"
      genreForm.poster.status.success.style.visibility = 'visible'
      genreForm.poster.status.text.textContent = 'complete'
      // Reset progress
      progress = 0
      genreForm.poster.preview.src = reader.result
    })

    reader.readAsDataURL(file)
  })

  genreForm.poster.status.trash.addEventListener('click', function () {
    genreForm.poster.detailsBox.style.display = 'none'
    genreForm.poster.preview.src = './images/upload.png'
  })

  genreForm.addGenreBtn.addEventListener('click', function () {
    // Remove the add genre button from the document flow
    genreForm.addGenreBtn.style.display = 'none'
    // Change the display model of the genre <select> dropdown to none
    genreForm.genres.style.display = 'none'
    // Change the display model of the genre <input> to block
    genreForm.newGenreInput.style.display = 'block'
    // focus the genre input element
    genreForm.newGenreInput.focus()
    // change cursor from pointer to text
    genreForm.newGenreInput.style.cursor = 'text'
    // Add placeholder text to inform the user to input a new genre
    genreForm.newGenreInput.placeholder = 'Input new genre...'
  })

  // Sumits a new movie to the local database
  genreForm.submitMovieBtn.addEventListener('click', function () {
    const movieGenres = Object.keys(movies)
    const genreSelected = movieGenres.includes(genreForm.genres.value)
    const usersMovie = {
      movieTitle: genreForm.newMovieInput.value,
      poster: fileReaderInfo.result,
    }

    // Runs only when user selects a genre from dropdown box
    if (
      genreSelected &&
      genreForm.newMovieInput.value &&
      genreForm.newGenreInput.value === ''
    ) {
      // Verify that user selected a poster
      if (previousPoster[0].name !== checkCurrentPoster()) {
        // Add new movie to database
        movies[genreForm.genres.value].push(usersMovie)
        console.log(movies)
        // Resets the genre form
        resetForm()
        // Remove previously set or spreaded file object
        previousPoster.pop()
        // Spread the updated FileList into FileListStatus array
        previousPoster.push(...genreForm.poster.inputElement.files)
      } else {
        console.log('Upload a movie poster')
      }
    }
    // Runs only when a user adds new genre
    else if (genreForm.newGenreInput.value && genreForm.newMovieInput.value) {
      if (previousPoster[0].name !== checkCurrentPoster()) {
        // Ignore adding new genre, and just push movie
        if (movieGenres.includes(genreForm.newGenreInput.value)) {
          movies[genreForm.newGenreInput.value].push(usersMovie)
        }
        // Add new genre to movies object, along with the associated movie
        else {
          movies[genreForm.newGenreInput.value] = [usersMovie]
        }

        console.log(movies)
        // Resets the genre form
        resetForm()
        // Remove previously set or spreaded file object
        previousPoster.pop()
        // Spread the updated FileList into FileListStatus array
        previousPoster.push(...genreForm.poster.inputElement.files)
      } else {
        console.log('Upload a movie poster')
      }
    } else {
      console.log(
        ' Please select or input a genre, and movie title before submission'
      )
    }
  })
}

function checkCurrentPoster() {
  try {
    const fileName = genreForm.poster.inputElement.files[0].name
    console.log('This try block runs')
    return fileName
  } catch (err) {
    console.error(
      'The filename was undefined because the File object does not exist'
    )
    console.log('This catch block runs')
    return undefined
  }
}

function resetForm() {
  // Reset form
  genreForm.genres.value = ''
  genreForm.newGenreInput.value = ''
  genreForm.newMovieInput.value = ''

  // Reset the display property values for applicable elements
  genreForm.newGenreInput.style.display = 'none'
  genreForm.genres.style.display = 'block'
  genreForm.addGenreBtn.style.display = 'block'

  // Reset poster preview
  genreForm.poster.preview.src = '../images/upload.png'
  genreForm.poster.detailsBox.style.display = 'none'
}
