document.addEventListener('DOMContentLoaded', loadTasks);

const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', addTask);
todoList.addEventListener('click', handleTaskAction);

function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText !== '') {
        const li = createTaskElement(taskText);
        todoList.appendChild(li);
        saveTask(taskText);
        todoInput.value = '';
    }
}

function handleTaskAction(e) {
    if (e.target.classList.contains('delete-btn')) {
        const task = e.target.parentElement;
        deleteTask(task);
        task.remove();
    } else if (e.target.classList.contains('complete-btn')) {
        const task = e.target.parentElement;
        task.classList.toggle('completed');
        updateTaskStatus(task);
    }
}

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        ${taskText}
        <span>
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        </span>
    `;
    return li;
}

function saveTask(taskText) {
    let tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => {
        const li = createTaskElement(task.text);
        if (task.completed) {
            li.classList.add('completed');
        }
        todoList.appendChild(li);
    });
}

function deleteTask(task) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(t => t.text !== task.textContent.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(task) {
    let tasks = getTasksFromStorage();
    tasks = tasks.map(t => {
        if (t.text === task.textContent.trim()) {
            t.completed = !t.completed;
        }
        return t;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}