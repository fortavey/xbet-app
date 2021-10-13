export const getRandomObject = (arr) => {
  const useArray = []
  while (useArray.length !== 3) {
    const rand = Math.floor(Math.random() * arr.length)
    if (!useArray.includes(rand)) useArray.push(rand)
  }
  return useArray.map((index) => arr[index])
}
