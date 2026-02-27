const form = document.querySelector(".input-section");
const taskInput = document.getElementById("taskInput");
const todoList = document.querySelector(".todo-list");

let taskCount = 1;


form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (taskInput.value.trim() === "") return;
    const taskText = taskInput.value;


    taskCount++;

    const li = document.createElement("li");

    const btn = document.createElement("button");
    btn.type = "button"
    btn.textContent = "clear";
    btn.id = "task" + taskCount

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "task" + taskCount;


    const label = document.createElement("label");
    label.setAttribute("for", checkbox.id);
    label.textContent = taskInput.value;

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(btn);

    todoList.appendChild(li);

    btn.addEventListener("click", (e) => li.remove())

    saveTaskToLocalStorage(taskText);
    taskInput.value = "";
});
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: task,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


window.addEventListener("DOMContentLoaded", function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task, index) {

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "clear";

        const label = document.createElement("label");
        label.textContent = task.text;

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(btn);
        todoList.appendChild(li);

        btn.addEventListener("click", function () {
            li.remove();

            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

    });
});