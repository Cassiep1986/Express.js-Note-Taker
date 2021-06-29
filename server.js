const express = require("express");
const app = express();

const PORT = 1234;

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(_dirname + "public/index.html");
});

app.get("/notes", function (req, res) {
  res.sendFile(_dirname + "public/notes.html");
});

app.get("api/notes", function (req, res) {
  res.json([
    {
      title: "Test Title",
      text: "Test text",
    },
  ]);
});

app.get("api/notes", function (req, res) {
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
