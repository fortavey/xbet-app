import { questionsCounter } from '../data/questionsCounter'

export const getRandomObject = (arr) => {
  const useArray = []
  while (useArray.length !== questionsCounter) {
    const rand = Math.floor(Math.random() * arr.length)
    if (!useArray.includes(rand)) useArray.push(rand)
  }
  return useArray.map((index) => arr[index])
}
