const input = document.querySelector('input');
const btn = document.querySelector('#add-btn');
const list = document.querySelector('#list');

const todos = JSON.parse(localStorage.getItem('todos') || '[]');

function syncToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.innerText = todo.task;
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    li.append(input);
    return li;
}

function refreshUI() {
    // Reset the list to empty string
    list.innerHTML = '';
    const fragment = document.createDocumentFragment();
    for (let todo of todos) {
        const element = createTodoElement(todo);
        fragment.append(element);
    }
    list.append(fragment);
}

function addTodo(todo) {
    todos.push(todo);
    refreshUI();
    syncToLocalStorage();
}

function registerEventListeners() {
    btn.addEventListener('click', function () {
        const todoText = input.value;
        addTodo({ id: todos.length + 1, task: todoText, completed: false });
    })
}

function initializeApp() {
    refreshUI();
    registerEventListeners();
}

initializeApp();




