const express = require("express");
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("server started at port 3000...");
});

// get method , sending the data to the client
app.get("/user", (req, res) => {
  res.send({ id: 1, name: "john", age: 20 });
});

// patch method, updating the specific data of the user
app.patch("/user/:id", (req, res) => {
  console.log(`PATCH → updating user with id ${req.params.id}`, req.body);
  res.send("user successfully updated with data by patch");
});

// post method, receiving the data from the client
app.post("/user", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send({
    message: "user successfully created",
    user: data
  });
});

// put method, updating the data of the user
app.put("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const newData = req.body;

  console.log(`PUT → updating user with id ${userId}`, newData);

  res.send({
    message: `user with id ${userId} successfully updated`,
    user: newData
  });
});
// delete method, deleting the user
app.delete("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  console.log(`DELETE → deleting user with id ${userId}`);
  res.send({ message: `user with id ${userId} successfully deleted` });
});