import { CHANGE_LANG, CHANGE_QUESTIONS, CHANGE_MUSIC } from '../types'

export const langReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_LANG:
      return { ...state, lang: action.lang }
    case CHANGE_MUSIC:
      return { ...state, music: action.music }
    case CHANGE_QUESTIONS:
      return { ...state, questions: action.questions }
    default:
      return state
  }
}
