let input = document.querySelector(".input"),
  submit = document.querySelector(".add"),
  tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

getDataFromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    addTasksToArray(input.value);
    input.value = "";
  }
};

// Delete Element From Page

tasksDiv.addEventListener("click", e => {
  // Remove Element From Local Storage
  removeTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
  // Remove Element From Page
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
  // Update Status
  if (e.target.classList.contains("task")) {
    // Update Status In Local Storage
    updateStatusWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTasksToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To ArrayOfTasks
  arrayOfTasks.push(task);
  // Add Task to Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Task To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty TasksDiv Content
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach(task => {
    // Create Task
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task Is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    // Add Task To Page
    div.appendChild(document.createTextNode(task.title));
    tasksDiv.appendChild(div);
    // Create Delete Button
    let span = document.createElement("span");
    span.appendChild(document.createTextNode("Delete"));
    span.className = "delete";
    // Add Delete btn To Page
    div.appendChild(span);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  localStorage.setItem("Tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = localStorage.getItem("Tasks");
  if (data) {
    arrayOfTasks = JSON.parse(data);
  }
  addElementsToPageFrom(arrayOfTasks);
}

function removeTaskFromLocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter(task => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function updateStatusWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}