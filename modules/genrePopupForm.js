import {genreForm} from "./selectors.js"

export default function genrePopupForm() {
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
}