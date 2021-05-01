const todoForm = document.querySelector(".js-todoForm"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".js-todoList"),
  finishList = document.querySelector(".js-finList");

const TODO_LS = "PENDING";
const FIN_LS = "FINISHED";

let whatTD = [];
let finTD = [];


function saveToDos() {
  localStorage.setItem(TODO_LS,JSON.stringify(whatTD));
  localStorage.setItem(FIN_LS,JSON.stringify(finTD));
}

function delTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  todoList.removeChild(li);
  const clearToDo = whatTD.filter(function (TD) {
    return TD.id !== li.id;
  });
  whatTD = clearToDo
  saveToDos();
}

function chkTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.childNodes[0].innerText;

  finishTodo(text)
  todoList.removeChild(li);

  const clearToDo = whatTD.filter(function (TD) {
    return TD.id !== li.id;
  });
  whatTD = clearToDo;

  saveToDos();
}


function backTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.childNodes[0].innerText;

  finishList.removeChild(li);
  printTodo(text)

  const clearToDo = finTD.filter(function (TD) {
    return TD.id !== li.id;
  });
  finTD = clearToDo;

  saveToDos();
}



function printTodo(text) {

  const li = document.createElement("li");

  const delBtn = document.createElement("button");
  delBtn.innerText = "DELETE";
  delBtn.addEventListener("click", delTodo);

  const chkBtn = document.createElement("button");
  chkBtn.innerText = "DONE";
  chkBtn.addEventListener("click", chkTodo);

  const span = document.createElement("span");
  span.innerText = text;

  const toDoId = String(whatTD.length + 1);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(chkBtn);
  li.id = toDoId;

  todoList.appendChild(li);
  const toDoObj = {
    id: toDoId,
    text: text
  };

  whatTD.push(toDoObj);
  saveToDos();
}


function finishTodo(text){
  const li = document.createElement("li");

  const delBtn = document.createElement("button");
  delBtn.innerText = "DELETE";
  delBtn.addEventListener("click", delTodo);

  const chkBtn = document.createElement("button");
  chkBtn.innerText = "BACK";
  chkBtn.addEventListener("click", backTodo);

  const span = document.createElement("span");
  span.innerText = text;

  const toDoId = String(finTD.length + 1);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(chkBtn);
  li.id = toDoId;

  finishList.appendChild(li);

  const toDoObj = {
    id: toDoId,
    text: text
  };
  finTD.push(toDoObj);

  saveToDos();
}


function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value + " ";
  printTodo(currentValue);
  todoInput.value = "";
}

function readToDos() {
  const readToDos = localStorage.getItem(TODO_LS);
  const readFin = localStorage.getItem(FIN_LS);

  if (readToDos !== null || readFin !== null) {
    const parsedToDos = JSON.parse(readToDos);
    const parsedFin = JSON.parse(readFin);

    parsedToDos.forEach(function (TD) {
      printTodo(TD.text);
    })
    parsedFin.forEach(function (TD){
      finishTodo(TD.text);
    })
  }
}

function init() {
  readToDos();
  todoForm.addEventListener("submit", handleSubmit)
}

init();
