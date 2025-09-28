
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const exp = express();
const PORT = 5000;
const DATA_FILE = "data.json";

exp.use(bodyParser.json());

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data || "[]");
}

function writeData(posts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

exp.post("/posts", (req, res) => {
  const { title, content, description } = req.body; 
  if (!title || !content || !description) {
  return res.status(400).json({ message: "Title, content, and description are required" });
  }

  const posts = readData();
  console.log("REQ BODY:", req.body);
  const newPost = {
    id: Date.now(), 
    title,
    content,
    description: description || ""
  };

  posts.push(newPost);
  writeData(posts);

  res.status(201).json(newPost);
});

exp.get("/posts", (req, res) => {
  const posts = readData();
  res.json(posts);
});

exp.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, description } = req.body;

  const posts = readData();
  const postIndex = posts.findIndex((p) => p.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts[postIndex].title = title || posts[postIndex].title;
  posts[postIndex].content = content || posts[postIndex].content;
  posts[postIndex].description = description || posts[postIndex].description;

  writeData(posts);

  res.json(posts[postIndex]);
});

exp.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  let posts = readData();
  const postIndex = posts.findIndex((p) => p.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  const deletedPost = posts.splice(postIndex, 1);
  writeData(posts);

  res.json(deletedPost[0]);
});

exp.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
