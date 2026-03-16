//build a server first 
//localhost  3000
//import the tools 

const express = require('express');//for the server 
const cors = require('cors');
const path = require('path');

require('./database.js');
const todorouters=require("./routes.js");

//the first one is must ,second one can be any other language wanna interact with

const app=express();//create the server, the previous is the material , this one use material to create the server actually
const port=3000;//where the server is,localhost 3000

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
//server understand the json files from website
app.use('/todos', todorouters);
// This tells the server: "If someone goes to /todos, let the router handle it!"



// 4. Opening the Doors
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

/*
1. The Rule (app.get)
This block creates a rule for your website.

app.get('/'): This means "When someone visits my main home page."

req: This stands for Request. It is what the visitor is asking for.

res: This stands for Response. It is how your server talks back.

res.send: This is your server's actual answer. It sends the text "The server is up and running!" to the visitor's screen.

2. The "ON" Switch (app.listen)
Even with rules, your server is currently turned off. This block turns it on.

app.listen(port): This tells your server to wake up. It stays awake and listens for visitors on a specific channel (called a port).

console.log: This is a message just for you. It prints text on your own computer screen so you know the server started without any errors.
*/
