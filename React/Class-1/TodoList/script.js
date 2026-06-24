const input = document.querySelector('input');
const button = document.querySelector('button');
const ul = document.querySelector('ul');

const todos = ["Learn Swimming", "Learn React", "Buy Groceries"];

function render() {
    ul.innerHTML = '';
    for (let todo of todos) {
        const li = document.createElement('li');
        li.innerText = todo;
        ul.append(li);
    }
}

function addTodo(todo) {
    todos.push(todo);
    render();
}

button.addEventListener('click', function () {
    const todoText = input.value;
    addTodo(todoText);
});

render();