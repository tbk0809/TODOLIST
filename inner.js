/*const addbutton=document.getElementById("addbutton");
const deletebutton=document.getElementById("deletebutton");
const upsdatebutton=document.getElementById("updatebutton");
const viewbutton=document.getElementById("viewbutton");

addbutton.onclick()=function()={
  const tasks=document.createElement()
  
}
*/
// Grab the buttons and containers from the HTML
const addbutton = document.getElementById("addbutton");
const deletebutton = document.getElementById("deletebutton");
const updatebutton = document.getElementById("updatebutton");
const viewbutton = document.getElementById("viewbutton");
const actionArea = document.getElementById("action-area");
const taskList = document.getElementById("task-list");

// The URL where your Express server is listening
const API_URL = "http://localhost:3000/todos";

// --- VIEW TASKS (GET) ---
viewbutton.onclick = async function() {
  actionArea.innerHTML = ""; //clear all the action before(add,update ,delete), make sure the output is clean
  
  try {
    // Fetch the data from your backend
    const response = await fetch(API_URL);
    const tasks = await response.json(); // Convert the JSON back into a JS array
    
    
    taskList.innerHTML = "";// Clear the current list, set it to comment cuz a duplicate result
    
    // Loop through the results and display them
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = `ID: ${task.id} | Task: ${task.title} | Completed: ${task.completed}`;
      taskList.appendChild(li);//parent node is tasklist , li is child node , use append child to display them all
    });
  } catch (error) {
    console.error("Error viewing tasks:", error);
  }
};

// --- ADD TASK (POST) ---
addbutton.onclick = function() {
  // Create the label, textbox, and save button
  actionArea.innerHTML = `
    <label>Enter your task:</label>
    <input type="text" id="newTaskInput">
    <button id="saveNewTask">Save</button>
  `;

  // Make the new save button work
  document.getElementById("saveNewTask").onclick = async function() {
    const taskTitle = document.getElementById("newTaskInput").value;
    
    try {
      // Send a POST request to your backend
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskTitle }) // Send the title inside a JSON object
      });
      
      alert("Task added successfully!");
      actionArea.innerHTML = ""; // Clear the textbox away
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
};

// --- DELETE TASK (DELETE) ---
deletebutton.onclick = function() {
  actionArea.innerHTML = `
    <label>Enter task ID to delete:</label>
    <input type="number" id="deleteIdInput">
    <button id="confirmDelete">Delete</button>
  `;

  document.getElementById("confirmDelete").onclick = async function() {
    const taskId = document.getElementById("deleteIdInput").value;
    
    try {
      // Send a DELETE request to /todos/:id
      await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE"
      });
      
      alert("Task deleted successfully!");
      actionArea.innerHTML = "";
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
};

// --- UPDATE TASK (PATCH) ---
updatebutton.onclick = function() {
  actionArea.innerHTML = `
    <label>Enter task ID to mark as completed:</label>
    <input type="number" id="updateIdInput">
    <button id="confirmUpdate">Update</button>
  `;

  document.getElementById("confirmUpdate").onclick = async function() {
    const taskId = document.getElementById("updateIdInput").value;
    
    try {
      // Send a PATCH request to /todos/:id
      await fetch(`${API_URL}/${taskId}`, {
        method: "PATCH"
      });
      
      alert("Task updated to completed!");
      actionArea.innerHTML = "";
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
};