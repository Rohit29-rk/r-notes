
const connectToMongo = require("./db");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var cors=require('cors');



app.use(cors())
connectToMongo();
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

if (process.env.NODE_ENV ="production"){
  app.use(express.static("client/build"));
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
