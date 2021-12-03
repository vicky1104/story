const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/SumDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database connected"))
  .catch((err) => console.log(err));

const SumSchema = mongoose.Schema({
  number1: Number,
  number2: Number,
  total: Number,
});

const SumModel = mongoose.model("Sums", SumSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var sum = num1 + num2;

  const getSum = async () => {
    let sum1 = new SumModel({ number1: num1, number2: num2, total: sum });

    await sum1
      .save()
      .then(console.log("row added"))
      .catch((err) => console.log(err));
  };
  getSum();
  res.status(200).send("data submited and your ans is " + sum);
});

app.listen(8081);
