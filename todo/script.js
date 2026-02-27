// const form = document.querySelector(".input-section");
// const taskInput = document.getElementById("taskInput");
// const todoList = document.querySelector(".todo-list");

// let taskCount = 1;


// form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     if (taskInput.value.trim() === "") return;
//     const taskText = taskInput.value;


//     taskCount++;

//     const li = document.createElement("li");

//     const btn = document.createElement("button");
//     btn.type = "button"
//     btn.textContent = "clear";
//     btn.id = "task" + taskCount

//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.id = "task" + taskCount;


//     const label = document.createElement("label");
//     label.setAttribute("for", checkbox.id);
//     label.textContent = taskInput.value;

//     li.appendChild(checkbox);
//     li.appendChild(label);
//     li.appendChild(btn);

//     todoList.appendChild(li);

//     btn.addEventListener("click", () => li.remove())

//     checkbox.addEventListener("change", function () {
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     const index = Array.from(todoList.children).indexOf(li);

//     tasks[index].completed = checkbox.checked;

//     localStorage.setItem("tasks", JSON.stringify(tasks));
// });

//     saveTaskToLocalStorage(taskText,checkbox.checked);
//     taskInput.value = "";
// });
// function saveTaskToLocalStorage(task,completed) {
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     tasks.push({
//         text: task,
//         completed: completed 
//     });

//     localStorage.setItem("tasks", JSON.stringify(tasks));
// }


// window.addEventListener("DOMContentLoaded", function () {
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     tasks.forEach(function (task, index) {

//         const li = document.createElement("li");

//         const checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.checked = task.completed;

//         const btn = document.createElement("button");
//         btn.type = "button";
//         btn.textContent = "clear";

//         const label = document.createElement("label");
//         label.textContent = task.text;

//         li.appendChild(checkbox);
//         li.appendChild(label);
//         li.appendChild(btn);
//         todoList.appendChild(li);

//         btn.addEventListener("click", function () {
//             li.remove();

//             let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//             tasks.splice(index, 1);
//             localStorage.setItem("tasks", JSON.stringify(tasks));
//         });

//     });
// });




const form = document.querySelector(".input-section");
const taskInput = document.getElementById("taskInput");
const todoList = document.querySelector(".todo-list");


// ================= ADD TASK =================
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (taskInput.value.trim() === "") return;

    const taskText = taskInput.value;

    const task = {
        id: Date.now(), // unique id
        text: taskText,
        completed: false
    };

    addTaskToDOM(task);
    saveTask(task);

    taskInput.value = "";
});


// ================= ADD TASK TO DOM =================
function addTaskToDOM(task) {

    const li = document.createElement("li");
    li.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const label = document.createElement("label");
    label.textContent = task.text;

    const btn = document.createElement("button");
    btn.textContent = "clear";

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(btn);
    todoList.appendChild(li);


    // ===== Checkbox Change =====
    checkbox.addEventListener("change", function () {
        let tasks = getTasks();
        tasks = tasks.map(t =>
            t.id == task.id ? { ...t, completed: checkbox.checked } : t
        );
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });


    // ===== Delete Button =====
    btn.addEventListener("click", function () {
        li.remove();

        let tasks = getTasks();
        tasks = tasks.filter(t => t.id != task.id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
}


// ================= SAVE TASK =================
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ================= GET TASKS =================
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}


// ================= LOAD ON REFRESH =================
window.addEventListener("DOMContentLoaded", function () {
    const tasks = getTasks();
    tasks.forEach(task => addTaskToDOM(task));
});