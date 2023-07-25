var Task=0;
function add_task(){
    const task = document.createElement('div');
    task.innerHTML = 'Task '+String(Task);
    document.getElementById('tasks').appendChild(task);
    Task++;
  }
  
  const h1 = document.getElementById('heading');
  h1.addEventListener('click', function() {
    add_task();
  });
  