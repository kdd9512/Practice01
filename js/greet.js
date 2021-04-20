const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greet = document.querySelector(".js-greet");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveData(text){
  localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreet(currentValue);
  saveData(currentValue);
}

function askForName(){
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit",handleSubmit)
}

function paintGreet(text) {
  form.classList.remove(SHOWING_CN);
  greet.classList.add(SHOWING_CN);
  greet.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
      askForName();
  } else {
    paintGreet(currentUser);
  }

}

function init() {
  loadName();
}

init();
