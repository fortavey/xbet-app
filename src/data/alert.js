const alertTitle = {
  RU: 'Выберите вариант ответа',
  EN: 'Choose answer',
}
const alertText = {
  RU: 'Вы не можете перейти к следующему вопросу. Необходимо дать ответ на текущий вопрос',
  EN: 'You cannot go to the next question. It is necessary to answer the current question',
}
const cancelText = {
  RU: 'Отмена',
  EN: 'Cancel',
}

export function moveForwardAlert(Alert, lang) {
  return Alert.alert(alertTitle[lang], alertText[lang], [
    {
      text: cancelText[lang],
      style: 'cancel',
    },
    { text: 'OK' },
  ])
}
