'use strict';
const gradient = document.querySelector('.gradient');
const btn = document.querySelector('button');
const putV = document.querySelector('input');
const ulGrab = document.querySelector('ul');
localStorage.getItem('track');
function onMouseMove(event) {
  gradient.style.backgroundImage =
  'radial-gradient(at ' +
  event.clientX +
  'px ' +
  event.clientY +
  'px, rgba(159,0,191,.9) 0, #4D4FA7 70%)';
}
document.addEventListener('mousemove', onMouseMove);
let todo = []
let sum=0
renderData()
btn.addEventListener('click', () => {
  const tempV = putV.value.trim();
  if (!tempV) return;
  const todoWork = {
    text: tempV,
    index:sum++
  }
  todo.push(todoWork);
  taskDisplay(todoWork);
  stLocalStorage();
})
function taskDisplay(task) {
  const html = `<li data-id="${task.index}"><p>${task.text}</p><a>X</a></li>`;
  ulGrab.insertAdjacentHTML(`beforeend`, html);
}

// 📌📌 Event Delegation  Very very important
ulGrab.addEventListener('click', (e) => {
  if (e.target.tagName === 'P') {
    e.target.classList.toggle('done');
  }
  if (e.target.tagName === 'A') {
    const list = e.target.closest('li');
    const idx=parseInt(list.dataset.id)
    todo = todo.filter(a => a.index !==idx);
    list.remove();
    console.log(todo)
  }
  stLocalStorage();
})
// 📌📌
function stLocalStorage() {
  localStorage.setItem('track', JSON.stringify(todo));
}
function renderData() {
  const info = localStorage.getItem('track');
  if (info) {
    todo = JSON.parse(info)
    todo.forEach(element => {
      taskDisplay(element)
    });
  }
}