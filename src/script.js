function closeDialog(){
  dialog=document.getElementById('dialog');
  const form = document.getElementById('FORM');
  form.reset();
  dialog.style.display='none';
}

function loadTasks() {
  const allTasks = localStorage.getItem('tasks');
  if (allTasks) {
      const parsed = JSON.parse(allTasks);
      for (const task of parsed) {
        AddTask(task.title, task.description, task.email, task.status);
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
        if (task.status == 'not-completed')
        AddTask(task.title, task.description, task.email, task.status);
        console.log(task.title);
      }
  } 
}

function removeAllTasks() {
  const elements = document.querySelectorAll('div.taskID');
  elements.forEach((element) => {
    element.parentNode.removeChild(element);
  });
}
function loadTasksButton(){
  removeAllTasks();
  loadUncompletedOnly();
}
function deleteTask(taskTitle) {
  taskTitle = taskTitle.trim();

  let allTasks = localStorage.getItem('tasks');

  if (allTasks) {
    allTasks = JSON.parse(allTasks);
    if (Array.isArray(allTasks)) {
      allTasks = allTasks.filter((task) => task.title.trim() !== taskTitle);
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
    AddTask(TI,TD,TE,'not-completed');
    writeDB(TI,TD,TE,'not-completed');
}

function MarkTaskAsDone(button) {
  const parentInnerHtml = button.parentNode.innerHTML;
  const titleRegex = /<strong>Title:<\/strong> (.+?)<br>/;
  const match = parentInnerHtml.match(titleRegex);

  if (match && match[1]) {
    const taskTitle = match[1];
    const tasksData = JSON.parse(localStorage.getItem('tasks'));
    const matchingTask = tasksData.find(task => task.title === taskTitle);

    if (matchingTask) {
      matchingTask.status = 'completed';
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


function AddTask(taskTitle, taskDesc, taskEmail, taskStatus) {

  const task = document.createElement('div');
  task.className = "taskID";
  let taskContent = `
      <strong>Title:</strong> ${taskTitle}<br>
      <strong>Description:</strong> ${taskDesc}<br>
      <strong>Email:</strong> ${taskEmail}<br>
      <button onclick="removeTask(this)">Remove</button><br>
      ${taskStatus == 'completed' ? '' : '<button onclick="MarkTaskAsDone(this)">Completed</button><br>'}
  `;
  task.innerHTML = taskContent;
  
  if (taskStatus == 'completed') {
    task.style.backgroundColor = 'green';
  }

  document.getElementById('tasks').appendChild(task);
}
 loadTasks();
  document.getElementById('FORM').addEventListener('submit', handleSubmit);

// event listener sa resetez formul
  const form = document.getElementById('FORM');

  form.addEventListener('submit', function (event) {
      event.preventDefault(); 
      submitForm();
  });
  
  function submitForm() {
      form.reset();
  }