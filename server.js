const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const db_username = process.env.MONGO_DB_USERNAME;
const db_password = process.env.MONGO_DB_PWD;
const PORT = process.env.APP_PORT || 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = `mongodb://${db_username}:${db_password}@mongo:27017`;
const client = new MongoClient(MONGO_URL);

//GET all users
app.get("/getUsers", async (req, res) => {
  await client.connect(MONGO_URL);
  console.log("Connected successfully to server");

  const db = client.db("apnacollege-db");
  const data = await db.collection("users").find({}).toArray();

  client.close();
  res.send(data);
});

//POST new user
app.post("/addUser", async (req, res) => {
  const userObj = req.body;
  console.log(req.body);

  await client.connect(MONGO_URL);
  console.log("Connected successfully to server");

  const db = client.db("apnacollege-db");
  const data = await db.collection("users").insertOne(userObj);
  console.log(data);
  console.log("data inserted in DB");

  client.close();
  res.send({ status: "ok" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server running on port ${PORT}`);
});
