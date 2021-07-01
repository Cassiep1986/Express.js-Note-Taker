const fs = require("fs/promises");
const express = require("express");
const uuid = require("uuid");
const app = express();

const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", function (req, res) {
  res.sendFile(__dirname + "/public/notes.html");
});

app.get("/api/notes", async function (req, res) {
    try {
        const data = await fs.readFile("./db/db.json", "utf8");

        res.json(JSON.parse(data));
    }catch (err) {
        res.status(500).end("Server failed");
    }
});

app.post("/api/notes", async function (req, res) {
  const notes = req.body;
  console.log(notes);
  try {
    const data = await fs.readFile("./db/db.json", "utf8");
    const parse = JSON.parse(data);
    notes.id = uuid.v1();
    parse.push(notes);
    fs.writeFile("./db/db.json", JSON.stringify(parse)).then (
      fs.readFile("./db/db.json", "utf8")
    ).then (res.send(JSON.parse(data)))
  
}catch (err) {
  throw err
}
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
