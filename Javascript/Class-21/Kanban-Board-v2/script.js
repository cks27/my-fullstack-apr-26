const todoTaskContainer = document.querySelector('.todo-tasks');
const inprogressTaskContainer = document.querySelector('.inprogress-tasks');
const doneTaskContainer = document.querySelector('.done-tasks');
const addTaskForm = document.querySelector('.add-task-modal-content form');
const addTaskBtn = document.querySelector('#add-task-btn');
const modalContainer = document.querySelector('.modal-container');
const closeModalBtn = document.querySelector('#close-modal-btn');
const taskBoard = document.querySelector('.task-board');
const toolBox = document.querySelector('.tool-box');
const editModal = document.querySelector('.edit-modal');
const editModalContainer = document.querySelector('.edit-modal-container-content')

// https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
function uuid() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

const allStatus = ['todo', 'inprogress', 'done'];
const priorities = ['pink', 'green', 'blue', 'black', 'grey'];


// status = Todo | InProgress | Done
const tasks = [
    {
        desc: "Fixed API Timeout",
        status: "todo",
        priority: 'pink',
        id: uuid(),
        dateCreated: new Date().toISOString(),
        locked: true
    },
    {
        desc: "Build Autopayment Flow",
        status: "inprogress",
        priority: 'blue',
        id: uuid(),
        dateCreated: new Date().toISOString(),
        locked: false
    },
    {
        desc: "Build a auto debit cron",
        status: "done",
        priority: 'green',
        id: uuid(),
        dateCreated: new Date().toISOString(),
        locked: true
    },
    {
        desc: "Build a auto debit cron",
        status: "done",
        priority: 'pink',
        id: uuid(),
        dateCreated: new Date().toISOString(),
        locked: true
    },
    {
        desc: "Add a new payment method",
        status: "todo",
        priority: 'black',
        id: uuid(),
        dateCreated: new Date().toISOString(),
        locked: true
    }
];

function createTaskUI(task) {
    return `<div class="task" data-priority="${task.priority}" data-id="${task.id}">
        <p>${task.desc}</p>
        <p>${task.status}</p>
        <p>${task.priority }</p>
        ${task.locked ? '<i class="bi bi-lock"></i>' : '<i class="bi bi-unlock"></i>'}
        ${task.locked === false ? '<i class="bi bi-pencil-square"></i>': ''}
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

// Rerender the whole board
function renderTasks(priority='all') {

    todoTaskContainer.innerHTML = '';
    inprogressTaskContainer.innerHTML = '';
    doneTaskContainer.innerHTML = '';

    const priorityTasks = priority === 'all'
        ? tasks : tasks.filter((task) => task.priority === priority);

    const todoTasks = priorityTasks.filter((task) => task.status === 'todo');
    const inprogressTasks = priorityTasks.filter((task) => task.status === 'inprogress');
    const doneTasks = priorityTasks.filter((task) => task.status === 'done');

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

function lockTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        throw new Error('id is not valid')
    }
    task.locked = true;
    renderTasks();
}

function unLockTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        throw new Error('id is not valid')
    }
    task.locked = false;
    renderTasks();
}

function updateTask(id, newDesc, newStatus, newPriority) {
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        throw new Error('id is not valid')
    }

    task.desc = newDesc;
    task.status = newStatus;
    task.priority = newPriority;
    renderTasks();
}

function createEditModalUI(task) {
    const form = document.createElement('form');
    form.classList.add('edit-modal-form')
    const textarea = document.createElement('textarea');
    textarea.value = task.desc;

    // create the dropdown for status
    const statusDropdown = document.createElement('select');
    for (let status of allStatus) {
        const option = document.createElement('option');
        if (task.status === status) {
            option.setAttribute('selected', true);
        }
        option.innerText = status;
        statusDropdown.append(option);
    }

    // create the dropdown of priorities
    const prioritiesDropdown = document.createElement('select');
    for (let priority of priorities) {
        const option = document.createElement('option');
        if (task.priority === priority) {
            option.setAttribute('selected', true);
        }
        option.innerText = priority;
        prioritiesDropdown.append(option);
    }

    form.append(textarea);
    form.append(statusDropdown);
    form.append(prioritiesDropdown);

    const savebtn = document.createElement('button');
    savebtn.innerText = 'Save';
    form.append(savebtn);

    const cancelEditBtn = document.createElement('button');
    cancelEditBtn.innerText = 'Cancel Edit';
    form.append(cancelEditBtn);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const newDesc = form.elements[0].value;
        const newStatus = form.elements[1].value;
        const newPriority = form.elements[2].value;
        updateTask(task.id, newDesc, newStatus, newPriority);
        editModal.style.display = 'none';
    })

    editModalContainer.append(form);
}

function openEditModal(id) {
    editModal.style.display = 'block';
    editModalContainer.innerHTML = '';
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        throw new Error('id is not valid')
    }
    createEditModalUI(task);
}

function registerEventListener() {
    addTaskForm.addEventListener('submit', function (event) {
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
        // will be executed for delete icon
        if (event.target.nodeName === 'I' && event.target.classList.contains('bi-trash')) {
            const taskIdToBeDeleted = event.target.parentElement.getAttribute('data-id');
            deleteTask(taskIdToBeDeleted);
            return;
        }

        if (event.target.nodeName === 'I' && event.target.classList.contains('bi-lock')) {
            // if you click on lock button then the task should be unlocked.
            const id = event.target.parentElement.getAttribute('data-id');
            unLockTask(id)
            return;
        }

        if (event.target.nodeName === 'I' && event.target.classList.contains('bi-unlock')) {
            // if u click of unlock the task should be locked
            const id = event.target.parentElement.getAttribute('data-id');
            lockTask(id)
            return;
        }

        if (event.target.nodeName === 'I' && event.target.classList.contains('bi-pencil-square')) {
            // if u click of unlock the task should be locked
            const id = event.target.parentElement.getAttribute('data-id');
            openEditModal(id);
            return;
        }
    });
    
    toolBox.addEventListener('click', function (event) {
        if (event.target.nodeName !== 'DIV') {
            return;
        }
        const currPriority = event.target.getAttribute('data-priority');
        renderTasks(currPriority);
    });
}

function initializeApp() {
    renderTasks();
    registerEventListener()
}

initializeApp();