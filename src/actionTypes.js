/*
 * action types
 */
export const VIEW_MOVIE = 'VIEW_MOVIE'

/*
 * other constants
 */
 
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const MoviesFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_GENRE: 'SHOW_GENRE'
}

/*
 * action creators
 */

export function viewMovie(text) {
  return { type: VIEW_MOVIE, text }
}

export function setMovieFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}