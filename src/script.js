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
function add_task(taskTitle, taskDesc, taskEmail) {
    const task = document.createElement('div');
    task.id = "TaskID";
    task.innerHTML = `
      <strong>Title:</strong> ${taskTitle}<br>
      <strong>Description:</strong> ${taskDesc}<br>
      <strong>Email:</strong> ${taskEmail}
    `;
    document.getElementById('tasks').appendChild(task);
  }
  

  document.getElementById('FORM').addEventListener('submit', handleSubmit);
