const todoTaskContainer = document.querySelector('.todo-tasks');
const inprogressTaskContainer = document.querySelector('.inprogress-tasks');
const doneTaskContainer = document.querySelector('.done-tasks');
const form = document.querySelector('form');
const addTaskBtn = document.querySelector('#add-task-btn');
const modalContainer = document.querySelector('.modal-container');
const closeModalBtn = document.querySelector('#close-modal-btn');
const taskBoard = document.querySelector('.task-board');
// https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
function uuid() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}


// status = Todo | InProgress | Done
const tasks = [
    {
        desc: "Fixed API Timeout",
        status: "todo",
        priority: 'pink',
        id: uuid(),
        dateCreated: new Date().toISOString()
    },
    {
        desc: "Build Autopayment Flow",
        status: "inprogress",
        priority: 'blue',
        id: uuid(),
        dateCreated: new Date().toISOString()
    },
    {
        desc: "Build a auto debit cron",
        status: "done",
        priority: 'green',
        id: uuid(),
        dateCreated: new Date().toISOString()
    },
    {
        desc: "Build a auto debit cron",
        status: "done",
        priority: 'pink',
        id: uuid(),
        dateCreated: new Date().toISOString()
    },
    {
        desc: "Add a new payment method",
        status: "todo",
        priority: 'black',
        id: uuid(),
        dateCreated: new Date().toISOString()
    }
];

function createTaskUI(task) {
    return `<div class="task" data-priority="${task.priority}" data-id="${task.id}">
        <p>${task.desc}</p>
        <p>${task.status}</p>
        <p>${task.priority }</p>
        <i class="bi bi-trash"></i>
    </div>`
}


function renderListToUI(container, list) {
    for (let task of list) {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = createTaskUI(task);
        container.append(taskElement);
    }
}

function renderTasks() {

    todoTaskContainer.innerHTML = '';
    inprogressTaskContainer.innerHTML = '';
    doneTaskContainer.innerHTML = ''

    const todoTasks = tasks.filter((task) => task.status === 'todo');
    const inprogressTasks = tasks.filter((task) => task.status === 'inprogress');
    const doneTasks = tasks.filter((task) => task.status === 'done');

    renderListToUI(todoTaskContainer, todoTasks);
    renderListToUI(inprogressTaskContainer, inprogressTasks);
    renderListToUI(doneTaskContainer, doneTasks);
}

function addTask(task) {
    tasks.push(task);
    renderTasks();
}

function deleteTask(idToBeDeleted) {
    const taskIndex = tasks.findIndex((task) => task.id === idToBeDeleted);
    if (taskIndex === -1) {
        throw new Error('Invalid id');
    }

    tasks.splice(taskIndex, 1);
    renderTasks();
}

function registerEventListener() {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskDesc = form.elements[0].value;
        const priorityInp = document.querySelector('.add-task-modal form input:checked');

        const newTask = {
            id: uuid(),
            desc: taskDesc,
            status: 'todo',
            priority: priorityInp.value,
            dateCreated: new Date().toISOString()
        }
        addTask(newTask);
        modalContainer.style.display = 'none'
    });

    addTaskBtn.addEventListener('click', function () {
        modalContainer.style.display = 'block'
    });

    closeModalBtn.addEventListener('click', function () {
        modalContainer.style.display = 'none'
    });

    taskBoard.addEventListener('click', function (event) {
        if (event.target.nodeName !== 'I') {
            return;
        }
        const taskIdToBeDeleted = event.target.parentElement.getAttribute('data-id');
        deleteTask(taskIdToBeDeleted);
    })  
}

function initializeApp() {
    renderTasks();
    registerEventListener()
}

initializeApp();