// Getting references to HTML elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

// Variable to track the task being edited
let editingTaskItem = null;

// Load tasks from localStorage when the page loads
window.addEventListener('load', function () {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
    savedTasks.forEach(task => {
      addTaskToList(task);
    });
  }
});



// Event listener for form submission
taskForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!editingTaskItem) {
    addTask();
  } else {
    editTask();
  }
});



// Function to add a new task
function addTask() {
  const task = taskInput.value.trim();
  if (!task) {
    alert('Please enter a task.');
    return;
  }
  addTaskToList(task);
  taskInput.value = '';
}



// Function to add and remove task to the list and localStorage
function addTaskToList(taskContent) {
  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';
  const taskContentElement = document.createElement('span');
  taskContentElement.className = 'task-content';
  taskContentElement.textContent = taskContent;  

  const editButton = document.createElement('button');
  editButton.id = 'edit';
  editButton.textContent = 'Edit';

  const deleteButton = document.createElement('button');
  deleteButton.id = 'delete';
  deleteButton.textContent = 'Delete';

  taskItem.appendChild(taskContentElement);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  taskList.insertAdjacentElement('afterbegin', taskItem);

  editButton.addEventListener('click', function () {
    taskInput.value = taskContentElement.textContent;
    addButton.textContent = 'Update';
    editingTaskItem = taskItem;
  });

  deleteButton.addEventListener('click', function () {
    taskList.removeChild(taskItem);
    updateLocalStorage();
  });
  updateLocalStorage();
}



// Function to update localStorage with new tasks
function updateLocalStorage() {
  const tasks = Array.from(taskList.children).map(taskItem => {
    return taskItem.querySelector('.task-content').textContent;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Function to edit task
function editTask() {
  const editedTask = taskInput.value.trim();
  if (!editedTask) {
    alert('Please enter a task.');
    return;
  }  
  const editedTaskContent = editingTaskItem.querySelector('.task-content');  
  editedTaskContent.textContent = editedTask;
  addButton.textContent = 'Add';
  editingTaskItem = null;
  taskInput.value = '';
  updateLocalStorage();
}


