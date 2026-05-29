
const mysql = require('mysql2');//for the sql

//the first one is must ,second one can be any other language wanna interact with


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

module.exports=db;


