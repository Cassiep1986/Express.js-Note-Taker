const fs = require("fs/promises");

const express = require("express");
const { accessSync } = require("fs");
const app = express();

const PORT = 8080;

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

app.post("api/notes", function (req, res) {
    console.log(req.body);
  res.json([
    {
      title: "Test Title",
      text: "Test text",
    },
  ]);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
