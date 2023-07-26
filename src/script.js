
function deleteTask(taskTitle, taskDesc, taskEmail) {
  let existingData = localStorage.getItem('tasks');

  if (existingData) {
    existingData = JSON.parse(existingData);
    if (Array.isArray(existingData)) {
      const indexToDelete = existingData.findIndex(
        (task) =>
          task.title === taskTitle &&
          task.description === taskDesc 
      );
        existingData.splice(indexToDelete, 1);
        localStorage.setItem('tasks', JSON.stringify(existingData));
      }
    }
}

function writeDB(taskTitle, taskDesc, taskEmail) {
  let allTasks = localStorage.getItem('tasks');
  const newTask = {
    title: taskTitle,
    description: taskDesc,
    email: taskEmail
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
    add_task(TI,TD,TE);
    writeDB(TI,TD,TE);
}

function taskDone(button) {
  const task = button.parentNode;
  const isDone = task.getAttribute('isDone') === 'true';

  if (!isDone) {
    task.setAttribute('isDone', 'true');
    task.style.backgroundColor = 'green';
    button.parentNode.removeChild(button);
  } 
}

function removeTask(button) {
  const task = button.parentNode;
  deleteTask(task.childNodes[2].textContent, task.childNodes[4].textContent);
  console.log(task.childNodes[2].textContent, task.childNodes[4].textContent);
  task.remove()
}


function add_task(taskTitle, taskDesc, taskEmail) {

  const task = document.createElement('div');
  task.id = "TaskID";
  task.setAttribute('isDone', false);
  task.innerHTML = `
    <strong>Title:</strong> ${taskTitle}<br>
    <strong>Description:</strong> ${taskDesc}<br>
    <strong>Email:</strong> ${taskEmail}<br>
    <button onclick="removeTask(this)">Remove</button><br>
    <button onclick="taskDone(this)">Completed</button><br>
  `;
  document.getElementById('tasks').appendChild(task);
}

  document.getElementById('FORM').addEventListener('submit', handleSubmit);
