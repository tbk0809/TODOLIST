const db =require('./database.js');

const express=require('express');//use the express again
const router=express.Router();//create the router 

router.get('/',(req,res)=>{//'/'for the visitor,req=request to visit, res =res later have 

  const sql="SELECT * from todos";//sql code
  db.query(sql,(err,results)=>{
    if (err) {
  return res.status(500).json({ error: "Database error" });
}
      else{
      res.json(results);
    }
  });
});
router.post('/',(req,res)=>{

  const title=req.body.title;//the text that user type at the frontend;
  const sql="INSERT INTO todos (title) VALUES (?)";
  db.query(sql,[title],(err,results)=>{
        if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    else{
      res.json({ message: "tasks added succesfully" });
    }
  });
});
router.delete('/:id',(req,res)=>{

  const id=req.params.id;//the id that user wants to delete;
   const sql="DELETE FROM todos WHERE id=?";
  db.query(sql,[id],(err,results)=>{
    if(err){
      return res.status(500).json({ error: "Database error" });
    }
    else{
      res.json({ message: "tasks deleted succesfully" });
    }
  });
});


router.patch('/:id',(req,res)=>{
   const id=req.params.id;//same as before
   const sql="UPDATE todos SET completed = TRUE WHERE id=?";//the ?is a blank space/variable that handle the value/id from user 
  db.query(sql,[id],(err,results)=>{
    if(err){
      return res.status(500).json({ error: "Database error" });
    }
    else{
      res.json({ message: "tasks updated succesfully" });
    }
  });
});

module.exports=router;






