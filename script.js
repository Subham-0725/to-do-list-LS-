// Wait for the entire DOM to load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Getting the reference of the ids

  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  // Retrieve tasks from localStorage (if available), otherwise initialize as empty array

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Initialize an empty array to store tasks
  // JSON.parse() converts the stored string back to a JavaScript array

  // Loop through all saved tasks and display them on the page
  tasks.forEach((task) => {
    renderTasks(task); // Render each task using the renderTasks function
  });

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim(); // Get the trimmed value from the input field

    if (taskText === "") return; // If the input is empty, do not add the task

    // Create a new task object with a unique ID, the entered text, and a default completed status
    const newTask = {
      id: Date.now(), // Unique ID based on current timestamp
      text: taskText, // Store the task text entered by the user
      completed: false, // New tasks are not completed by default
    };

    tasks.push(newTask); // Add the new task to the tasks array
    saveTask(); // Save updated tasks array to localStorage
    renderTasks(newTask); // Render the new task on the page
    todoInput.value = ""; // Clear the input field
    console.log(tasks);
  });

  // Function to render/display a task on the web page

  function renderTasks(task) {
    const li = document.createElement("li"); // Creating a new list item element
    li.setAttribute("data-id", task.id); // Setting a custom attribute 'data-id' to the task's ID
    if (task.completed) {
      li.classList.add("completed"); // If the task is completed, add a 'completed' class to the list item
    }

    // Set inner HTML with task text and a delete button

    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;

      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the click event from bubbling up to the list item
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove()
      saveTask()
    });

    todoList.appendChild(li); // Append the new list item to the todoList element
  }

  // Function to save the tasks array into localStorage
  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks)); //JSON.stringify() converts the data from other datatype to string
    //setItem(key, value) takes 2 items (key,value)    (values must be strings)
    //it always stores strings
  }
});
