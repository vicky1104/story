const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
mongoose
  .connect("mongodb://localhost:27017/practices", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected"))
  .catch((err) => console.log(err));

const schema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  address: [
    {
      address: String,
      street: String,
      country: String,
      city: String,
      state: String,
      pincode: { type: Number },
    },
  ],
  hobbies: Array,
  dob: String,
  skills: Array,
  education: [{ coures: String, year: Number, grade: String }],
});
const model = new mongoose.model("practice", schema);

//````````express

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("/index.html");
});

app.post("/", (req, res) => {
  try {
    console.log(req.body);
    const getData = async () => {
      let data1 = new model({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        address: req.body.address.map((ele) => {
          return {
            address: ele.address,
            street: ele.street,
            city: ele.city,
            state: ele.state,
            coutry: ele.country,
            pincode: ele.pincode,
          };
        }),
        skills: req.body.skills,
        hobbies: req.body.hobbies,
        education: req.body.education,
      });
      await data1.save();
    };

    getData();
    res
      // .header({
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      // })
      .status(200)
      .send("Data added");
  } catch (err) {
    res
      // .header({
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      // })
      .status(500)
      .send(err);
  }
});
app.listen(8080);
