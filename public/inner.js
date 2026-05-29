const addbutton = document.getElementById("addbutton");
const deletebutton = document.getElementById("deletebutton");
const updatebutton = document.getElementById("updatebutton");
const viewbutton = document.getElementById("viewbutton");
const actionArea = document.getElementById("action-area");
const taskList = document.getElementById("task-list");

const API_URL = "http://localhost:3000/todos";




viewbutton.onclick = async function() {
  actionArea.innerHTML = ""; 
  
  try {
    const response = await fetch(API_URL);
    
    // The server sends back a flat JSON string. This turns it back into a usable JavaScript Array.
    const tasks = await response.json(); 
    
    taskList.innerHTML = ""; // Wipes the visual board clean so we don't get duplicates
    
    // Loop through every single task we got from the database
    tasks.forEach(task => {
      const li = document.createElement("li"); // Create a blank HTML bullet point
      li.textContent = `ID: ${task.id} | Task: ${task.title} | Completed: ${task.completed}`; // Write the data on it
      taskList.appendChild(li); // Pin it to the actual list on the screen
    });
  } catch (error) {
    console.error("Error viewing tasks:", error);
  }
};
addbutton.onclick = function() {
  actionArea.innerHTML = `
    <label style={{border: '1px solid #ccc', padding: '5px', borderRadius: '4px'}}>Enter your task:</label>
    <input type="text" id="newTaskInput"  style={{border: '1px solid #ccc', padding: '5px', borderRadius: '4px', marginLeft: '10px'}}>
    <button id="saveNewTask" style={{border: '1px solid #ccc', padding: '5px', borderRadius: '10px', marginLeft: '10px'}}>Save</button>
  `;

  document.getElementById("saveNewTask").onclick = async function() {
    const taskTitle = document.getElementById("newTaskInput").value; 
    
    try {
      await fetch(API_URL, {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ title: taskTitle }) 
      });
      
      alert("Task added successfully!");
      actionArea.innerHTML = ""; 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
};

deletebutton.onclick = function() {
 
  actionArea.innerHTML = `
    <label style={{border: '1px solid #ccc', padding: '5px', borderRadius: '4px'}}>Enter task ID to delete:</label>
    <input type="number" id="deleteIdInput"  style={{border: '1px solid #ccc', padding: '5px', borderRadius: '4px', marginLeft: '10px'}}>
    <button id="confirmDelete" style={{border: '1px solid #ccc', padding: '5px', borderRadius: '10px', marginLeft: '10px'}}>Delete</button>
  `;

  document.getElementById("confirmDelete").onclick = async function() {
    const taskId = document.getElementById("deleteIdInput").value; // Grab the number (e.g., 5)
    
    try {
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



updatebutton.onclick = function() {
  // Draw an input box for the ID number
  actionArea.innerHTML = `
    <label style={{border: '1px solid #ccc', padding: '5px', borderRadius: '4px'}}>Enter task ID to mark as completed:</label>
    <input type="number" id="updateIdInput"  style={{border: '1px solid #ccc', padding: '5px', borderRadius: '4px', marginLeft: '10px'}}>
    <button id="confirmUpdate" style={{border: '1px solid #ccc', padding: '5px', borderRadius: '10px', marginLeft: '10px'}}>Update</button>
  `;

  document.getElementById("confirmUpdate").onclick = async function() {
    const taskId = document.getElementById("updateIdInput").value;
    
    try {
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