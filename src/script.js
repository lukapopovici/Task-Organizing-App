var Task=0;

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

function add_task(taskTitle, taskDesc, taskEmail) {

  const task = document.createElement('div');
  task.id = "TaskID";
  task.setAttribute('isDone', false);
  task.innerHTML = `
    <strong>Title:</strong> ${taskTitle}<br>
    <strong>Description:</strong> ${taskDesc}<br>
    <strong>Email:</strong> ${taskEmail}<br>
    <button onclick="this.parentNode.remove()">Remove</button><br>
    <button onclick="taskDone(this)">Completed</button><br>
  `;
  document.getElementById('tasks').appendChild(task);

}

  document.getElementById('FORM').addEventListener('submit', handleSubmit);
