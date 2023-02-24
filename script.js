import {insertsGenres} from './modules/insertGenres.js'
import navigateGenres from './modules/navigateGenres.js'
import genrePopupForm from './modules/genrePopupForm.js'
import {genreForm} from './modules/selectors.js'

window.genreForm = genreForm

// Populates drop down menus with movie genres
insertsGenres()
// Allows users to navigate different genres and their associated movies
navigateGenres()
// Allows users to add a new movie and/or genre to the database
genrePopupForm()



