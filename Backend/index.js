import express from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { token } from "morgan";
import cookieParser from "cookie-parser";

const app = express();

//middle Ware
app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser())

//APIs

// this is for signup
app.post("/signup", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = db.collection("users");
    const result = await collection.insertOne(userData);
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
        res.send({ success: true, msg: "signup done", token });
      });
    }
  } else {
    res.send({ success: false, msg: "signup not done"});
  }
});

// this is for login
app.post("/login", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = db.collection("users");
    const result = await collection.findOne({email:userData.email, password:userData.password});
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
        res.send({ success: true, msg: "Login done", token });
      });
    }else{
      res.send({success:false, msg:'user not found'})
    }
  } else {
    res.send({ success: false, msg: "Login not done", token });
  }
});

// this is add task form
app.post("/add-task", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(req.body);

  if (result.insertedId) {
    res.json({ success: true, message: "New task added" });
  } else {
    res.json({ success: false, message: "Task not added" });
  }
});

// this is update form
app.get("/tasks", verifyJWTToken, async (req, res) => {
  const db = await connection();
  console.log("cookies tset",req.cookies['token']);
  
  const collection = db.collection(collectionName);
  const result = await collection.find().toArray();
  if (result) {
    res.send({ success: true, result });
  } else {
    res.send("Err try after sometime");
  }
});

//this is for update task in form choosen by list
app.get("/task/:id", verifyJWTToken, async (req, res) => {
  const id = req.params.id;
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.findOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({ messege: "task fetched", success: true, result });
  } else {
    res.send("Err try after sometime");
  }
});
// this for update data in databse and then show in list
app.put("/update-task", verifyJWTToken, async (req, res) => {
  const { id, title, description } = req.body;
  const db = await connection();
  const collection = db.collection(collectionName);
  
  const update = { $set: { title, description } };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, update);
  
  res.send({
    success: true,
    message: "Task updated successfully",
    result,
  });
});

// this is for single delete
app.delete("/delete/:id", verifyJWTToken, async (req, res) => {
  const id = req.params.id;
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({ messege: "task deleted", success: true, result });
  } else {
    res.send("Err try after sometime");
  }
});

//this is for multiple delete
app.delete("/delete-multiple", verifyJWTToken, async (req, res) => {
  const ids = req.body;
  const objectIds = ids.map((item) => new ObjectId(item));
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.deleteMany({ _id: { $in: objectIds } });
  if (result) {
    res.send({
      message: "Tasks deleted successfully",
      success: true,
    });
  } else {
    res.send({ message: "error try after sometimes", success: false });
  }
});

// verify Token
function verifyJWTToken(req,res,next){
  // console.log('cookies test',req.cookies['token']);
  const token = req.cookies['token']
  jwt.verify(token,"Google",(error,decoded) =>{
    if (error) {
      res.send("invalid token")
    }next()
    console.log(decoded);
    
  })
 
}
app.listen(3200);
