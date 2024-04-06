const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/csv", (req, res) => {
  const data = req.body.data;
  const metadata = req.body.metadata;
  const csvfile = processCSV(data, metadata);
  res.send(csvfile);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

const processCSV = (data, metadata) => {
  console.log("data");
  console.log(`metadata ${metadata}`);
  return "hello world";
};


