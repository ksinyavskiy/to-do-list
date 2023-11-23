'use strict';

function addTaskHandler() {
  const dataContainer = document.querySelector('.data-container');
  const item = createItemDiv();
  const textDiv = document.createElement('div');
  textDiv.classList.add('task-text');

  item.appendChild(textDiv);
  dataContainer.appendChild(item);

  const task = document.querySelector('.input-container input');
  const span = document.createElement('span');
  
  span.textContent = task.value;
  textDiv.appendChild(span);
}

function createItemDiv() {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('item');

  const actionsDiv = createActionsDiv();
  itemDiv.appendChild(actionsDiv);

  return itemDiv;
}

function createActionsDiv() {
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');

  const editBtn = createBtn('editBtn', 'Edit Task');
  const removeBtn = createBtn('removeBtn', 'Remove Task');
  const buttons = [editBtn, removeBtn];

  const ul = createUlWithBtn(buttons);
  actionsDiv.appendChild(ul);

  return actionsDiv;
}

function createUlWithBtn(buttons) {
  const ul = document.createElement('ul');

  for (const button of buttons) {
    const li = document.createElement('li');
    li.appendChild(button);
    ul.appendChild(li);
  }

  return ul;
}

function createBtn(id, text) {
  const btn = document.createElement('button');

  btn.setAttribute('id', id);
  btn.classList.add('btn');
  btn.textContent = text;

  return btn;
}