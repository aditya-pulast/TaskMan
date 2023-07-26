const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const auth = require("./middleware/auth");
// console.log('tSK')
const Task = require("./models/tasks");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/tasks");
// console.log('tSK')
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.use((req, res, next) => {
  res.status(503).send("Site is down");
});
app.listen(port, () => {
  console.log("server is on port " + port);
});
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
