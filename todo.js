let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const toDoBtn = document.getElementById("btn")

// for checking working or not 
console.log('Working');

// this is the document object model with the help of user can interfiar 

// in this it append to the list 
function addTaskToDOM(task) {

    // creating li tag 
    const li = document.createElement('li');

    li.innerHTML = `
          <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <img src="Images/bin.svg" class="delete" data-id="${task.id}" />
    
    `;

    tasksList.append(li);
}


function renderList() {
    tasksList.innerHTML = "";


    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }

    // this is for length of the task 
    tasksCounter.innerHTML = tasks.length;
}

// This function help to select or deselect the task 
function togglTask(taskId) {
    const task = tasks.filter(function (task) {
        return (task.id == taskId)
    });

    if (task.length > 0) {
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification("Task toggled successfully")
        return;

    }
    showNotification("could not toggle the task");

}

// this function help to delete task 
function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return (task.id !== taskId)
    })

    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
}

// using this function adding task functionality work 
function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        showNotification("Task added successfully");
        return;
    }

    showNotification("Task can not be added")
}

// this is notifications help to check if task added or delete is working or not 
function showNotification(text) {
    alert(text);
    // PopStateEvent(text);
}

// Handle keypress event 
function handleInputKeypress(e) {
    if (e.key == 'Enter') {
        const text = e.target.value;


        if (!text) {
            showNotification("Task text can not be empty");
            return;
        }

        // here the task is object 
        const task = {
            text: text,
            id: Date.now().toString(),
            done: false
        }

        e.target.value = '';
        addTask(task);
    }
}

// mouse click event 
function handleInputClick(e) {

    const text = addTaskInput.value;


    if (!text) {
        showNotification("Task text can not be empty");
        return;
    }

    const task = {
        text: text,
        id: Date.now().toString(),
        done: false
    }

    addTaskInput.value = '';
    addTask(task);
}




function handleClickListner(e) {
    const target = e.target;


    if (target.className == 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;


    } else if (target.className == 'custom-checkbox') {
        const taskId = target.id;
        togglTask(taskId);
        return;
    }
}


function initializeApp() {
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickListner);

    toDoBtn.addEventListener("click", handleInputClick)

}

initializeApp();

