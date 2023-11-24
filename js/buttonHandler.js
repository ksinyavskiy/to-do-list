'use strict';

let removeBtnIdCounter = 0;
let editBtnIdCounter = 0;
let saveBtnId = 0;

function addTaskHandler() {
  const dataContainer = document.querySelector('#data-container');
  const item = createItemDiv();
  const textDiv = document.createElement('div');
  textDiv.classList.add('task-text');

  const task = document.querySelector('.input-container input');
  const span = document.createElement('span');
  
  span.textContent = task.value;
  textDiv.appendChild(span);

  item.appendChild(textDiv);
  dataContainer.appendChild(item);

  /* we need to add it here cause the remove and edit buttons don't exist in the DOM before the Add Task button's click */
  configureActionsButton();
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

  const editBtn = createBtn(`editBtn-${editBtnIdCounter}`, 'Edit Task');
  const removeBtn = createBtn(`removeBtn-${removeBtnIdCounter}`, 'Remove Task');
  const buttons = [editBtn, removeBtn];

  editBtnIdCounter++;
  removeBtnIdCounter++;

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

/* actions' buttons logic */
function configureActionsButton() {
  const actions = document.querySelectorAll('.actions');

  for (const action of actions) {
    action.addEventListener('click', e => {
      const itemWrapper = e.target.closest('.item');
      const btnId = e.target.id;

      if (btnId.startsWith('removeBtn')) {
        removeTask(itemWrapper);
      } else {
        editTask(itemWrapper);
      }
    });
  }
}

function removeTask(item) {
  item.classList.add('removeAnimation');
  setTimeout(() => {
    document.querySelector('#data-container').removeChild(item);
  }, 1100);
}

function editTask(itemWrapper) {
  const taskDiv = itemWrapper.querySelector('.task-text');
  const span = itemWrapper.querySelector('.task-text span');
  let spanText = span.innerHTML;

  taskDiv.removeChild(span);
  const inputText = document.createElement('input');
  inputText.value = spanText;
  inputText.placeholder = 'Enter the edited task here...';

  taskDiv.appendChild(inputText);

  const actions = itemWrapper.querySelector('.actions');

  const saveBtn = createBtn(`saveBtn-${saveBtnId}`, 'Save Changes');
  saveBtn.addEventListener('click', () => {
    const span = document.createElement('span');
    span.textContent = inputText.value;
    taskDiv.removeChild(inputText);
    taskDiv.appendChild(span);

    const editBtn = createBtn(`editBtn-${editBtnIdCounter}`, 'Edit Task');
    const removeBtn = createBtn(`removeBtn-${removeBtnIdCounter}`, 'Remove Task');
    const buttons = [editBtn, removeBtn];
    const ul = createUlWithBtn(buttons);

    actions.replaceChildren(ul);
  });

  actions.replaceChildren(saveBtn);
}