// Grab the buttons and containers from your HTML page
const addbutton = document.getElementById("addbutton");
const deletebutton = document.getElementById("deletebutton");
const updatebutton = document.getElementById("updatebutton");
const viewbutton = document.getElementById("viewbutton");
const actionArea = document.getElementById("action-area");
const taskList = document.getElementById("task-list");

// This is the address of your backend Express server. 
// Whenever inner.js needs data, it sends a messenger (fetch) to this exact address.
const API_URL = "http://localhost:3000/todos";


// ==========================================
// 1. READ (GET) - Fetching data from MySQL
// Connects to: router.get('/') in routes.js
// ==========================================
viewbutton.onclick = async function() {
  actionArea.innerHTML = ""; // Clears the input boxes so the screen is clean
  
  try {
    // fetch() without a "method" automatically assumes you mean "GET".
    // It knocks on 'http://localhost:3000/todos' and asks for the data.
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


// ==========================================
// 2. CREATE (POST) - Sending new text to MySQL
// Connects to: router.post('/') in routes.js
// ==========================================
addbutton.onclick = function() {
  // First, we draw a textbox and a Save button on the screen
  actionArea.innerHTML = `
    <label>Enter your task:</label>
    <input type="text" id="newTaskInput">
    <button id="saveNewTask">Save</button>
  `;

  // Now, we tell that new "Save" button what to do when clicked
  document.getElementById("saveNewTask").onclick = async function() {
    const taskTitle = document.getElementById("newTaskInput").value; // Grab what the user typed
    
    try {
      // Send the messenger to your backend
      await fetch(API_URL, {
        method: "POST", // THIS tells routes.js to use router.post()
        headers: { "Content-Type": "application/json" }, // Tells server.js "Hey, I'm sending JSON!"
        // JSON.stringify turns our text into a format that can safely travel the web.
        // routes.js catches this exactly as: req.body.title
        body: JSON.stringify({ title: taskTitle }) 
      });
      
      alert("Task added successfully!");
      actionArea.innerHTML = ""; // Hide the textbox now that we are done
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
};


// ==========================================
// 3. DELETE - Removing a row from MySQL
// Connects to: router.delete('/:id') in routes.js
// ==========================================
deletebutton.onclick = function() {
  // Draw an input box for the ID number
  actionArea.innerHTML = `
    <label>Enter task ID to delete:</label>
    <input type="number" id="deleteIdInput">
    <button id="confirmDelete">Delete</button>
  `;

  document.getElementById("confirmDelete").onclick = async function() {
    const taskId = document.getElementById("deleteIdInput").value; // Grab the number (e.g., 5)
    
    try {
      // Notice the URL changes here! 
      // If taskId is 5, it sends the messenger to "http://localhost:3000/todos/5"
      // routes.js catches that "5" using req.params.id!
      await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE" // Tells routes.js to use router.delete()
      });
      
      alert("Task deleted successfully!");
      actionArea.innerHTML = "";
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
};


// ==========================================
// 4. UPDATE (PATCH) - Changing false to TRUE
// Connects to: router.patch('/:id') in routes.js
// ==========================================
updatebutton.onclick = function() {
  // Draw an input box for the ID number
  actionArea.innerHTML = `
    <label>Enter task ID to mark as completed:</label>
    <input type="number" id="updateIdInput">
    <button id="confirmUpdate">Update</button>
  `;

  document.getElementById("confirmUpdate").onclick = async function() {
    const taskId = document.getElementById("updateIdInput").value;
    
    try {
      // Just like Delete, we attach the ID to the end of the URL
      await fetch(`${API_URL}/${taskId}`, {
        method: "PATCH" // Tells routes.js to use router.patch()
      });
      
      alert("Task updated to completed!");
      actionArea.innerHTML = "";
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
};
