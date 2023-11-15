const name = document.getElementById("name")
const msg = document.getElementById("message")
const email = document.getElementById("email")
const sendBtn = document.getElementById("sendBtn")
const form = document.getElementById("form")

navLang.forEach(l => {
  l.addEventListener("click", (e) => {
    changeInput()
  })
});
changeInput()

function changeInput() {
  const lang = localStorage.getItem('preferredLanguage')

  if (lang === "hu") {
    name.placeholder = "Név"
    msg.placeholder = "Üzenet"
    sendBtn.value = "Küldés"
  } else if (lang === "ru") {
    name.placeholder = "Имя"
    msg.placeholder = "Сообщение"
    sendBtn.value = "Отправить"
  } else {
    name.placeholder = "Name"
    msg.placeholder = "Message"
    sendBtn.value = "Send"
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const params = {
    sendername: name.value,
    senderemail: email.value,
    message: msg.value
  }
  sendMessage(params)
})

const apiKey = window.myAppConfig;

function sendMessage(form) {

  (function () {
    emailjs.init(apiKey.emailApi)
  })()

  var serviceID = apiKey.serviceID
  var templateID = apiKey.templateID

  emailjs.send(serviceID, templateID, form)
    .then(res => {
      alert('Thank you, ' + form['sendername'] + '! Your message has been sent.')
    })
    .catch()
  clearForm()
}

function clearForm() {
  name.value = ""
  email.value = ""
  msg.value = ""
  sendBtn.classList.add("sent")
}

