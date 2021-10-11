import { CHANGE_LANG, FETCH_LANG } from '../types'

export const langReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_LANG:
      return { lang: action.lang }
    default:
      return state
  }
}
