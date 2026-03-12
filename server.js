//build a server first 
//localhost  3000

const express = require('express');//for the server 
const mysql = require('mysql2');//for the sql
//import the tools 
//the first one is must ,second one can be any other language wanna interact with

const app=express();//create the server, the previous is the material , this one use material to create the server actually
const port=3000;//where the server is,localhost 3000

app.use(express.json());
//server understand the json files from website

const db=mysql.createConnection({//createConnection ,a tool to connect with mysql

  host: 'localhost',
  user: `root`,
  password: `TBK@89boonkai`,
  database: `tododb`
});

db.connect((err)=>{
  if(err){
    console.error("unable to connect");
  }
  else{
    console.log("successfully connected");
  }
});

app.get('/', (req, res) => {
  res.send('The server is up and running!');
});

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