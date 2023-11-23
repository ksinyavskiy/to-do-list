'use strict';

document.getElementById('addBtn').addEventListener('click', () => {
  const inputElem = document.querySelector('.input-container input');
  if (inputElem.value === '') {
    alert('Enter a task, please. You cannot add an enpty task to the list');
    return;
  }

  addTaskHandler();
  inputElem.value = '';
});