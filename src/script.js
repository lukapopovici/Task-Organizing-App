
function loadTasks() {
  const allTasks = localStorage.getItem('tasks');
  if (allTasks) {
      const parsed = JSON.parse(allTasks);
      for (const task of parsed) {
        add_task(task.title, task.description, task.email, task.status);
        console.log(task.title);
      }
  } 
}

function getAllTasksBack() {
  removeAllTasks();
  loadTasks();
}

function loadUncompletedOnly() {
  const allTasks = localStorage.getItem('tasks');
  if (allTasks) {
      const parsed = JSON.parse(allTasks);
      for (const task of parsed) {
        if (task.status == 'False')
        add_task(task.title, task.description, task.email, task.status);
        console.log(task.title);
      }
  } 
}

function removeAllTasks() {
  const elements = document.querySelectorAll('div#TaskID');
  elements.forEach((element) => {
    element.parentNode.removeChild(element);
  });
}
function loadTasksButton(){
  removeAllTasks();
  loadUncompletedOnly();
}
function deleteTask(taskTitle) {
  console.log(taskTitle);
  let allTasks = localStorage.getItem('tasks');

  if (allTasks) {
    allTasks = JSON.parse(allTasks);
    if (Array.isArray(allTasks)) {
      allTasks = allTasks.filter((task) => task.title !== taskTitle);
      localStorage.setItem('tasks', JSON.stringify(allTasks));
    }
  }
}

function writeDB(taskTitle, taskDesc, taskEmail,taskStatus) {
  let allTasks = localStorage.getItem('tasks');
  const newTask = {
    title: taskTitle,
    description: taskDesc,
    email: taskEmail,
    status: taskStatus
  };

  if (allTasks) {
    allTasks = JSON.parse(allTasks);
    if (Array.isArray(allTasks)) {
      allTasks.push(newTask);
    } else {
      allTasks = [newTask];
    }
  } else {
    allTasks = [newTask];
  }

  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

function openDialog() {
    const dialog = document.getElementById('dialog');
    dialog.style.display = 'block';
  }

function handleSubmit(event) {
    event.preventDefault();
    const TI = document.getElementById('TaskInput').value;
    const TD = document.getElementById('TaskDescription').value;
    const TE = document.getElementById('TaskAsignee').value;
    const dialog = document.getElementById('dialog');
    dialog.style.display = 'none';
    add_task(TI,TD,TE,'False');
    writeDB(TI,TD,TE,'False');
}

function taskDone(button) {
  const parentInnerHtml = button.parentNode.innerHTML;
  const titleRegex = /<strong>Title:<\/strong> (.+?)<br>/;
  const match = parentInnerHtml.match(titleRegex);

  if (match && match[1]) {
    const taskTitle = match[1];
    const tasksData = JSON.parse(localStorage.getItem('tasks'));
    const matchingTask = tasksData.find(task => task.title === taskTitle);

    if (matchingTask) {
      matchingTask.status = 'True';
      localStorage.setItem('tasks', JSON.stringify(tasksData));
    }
  }

  const task = button.parentNode;
  task.style.backgroundColor = 'green';
  button.parentNode.removeChild(button);
}

function removeTask(button) {
  const task = button.parentNode;
  deleteTask(task.childNodes[2].textContent);
  console.log(task.childNodes[2].textContent);
  task.remove()
}


function add_task(taskTitle, taskDesc, taskEmail,taskStatus) {

  const task = document.createElement('div');
  task.id = "TaskID";
  task.innerHTML = `
    <strong>Title:</strong> ${taskTitle}<br>
    <strong>Description:</strong> ${taskDesc}<br>
    <strong>Email:</strong> ${taskEmail}<br>
    <button onclick="removeTask(this)">Remove</button><br>
  `;
  if (taskStatus == 'True'){
    task.style.backgroundColor = 'green';
  }
  else{
    task.innerHTML += '<button onclick="taskDone(this)">Completed</button><br>';
  }
  document.getElementById('tasks').appendChild(task);
}
 loadTasks();
  document.getElementById('FORM').addEventListener('submit', handleSubmit);
