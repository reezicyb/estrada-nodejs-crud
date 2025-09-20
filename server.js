import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const PORT = 5000;
const DATA_FILE = "data.json";

app.use(bodyParser.json());

// Helper: Read data.json
function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data || "[]");
}

// Helper: Write to data.json
function writeData(posts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

// Create → POST /posts
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const posts = readData();
  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
  };

  posts.push(newPost);
  writeData(posts);

  res.status(201).json(newPost);
});

// Read → GET /posts
app.get("/posts", (req, res) => {
  const posts = readData();
  res.json(posts);
});

// Update → PUT /posts/:id
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const posts = readData();
  const postIndex = posts.findIndex((p) => p.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts[postIndex].title = title || posts[postIndex].title;
  posts[postIndex].content = content || posts[postIndex].content;

  writeData(posts);

  res.json(posts[postIndex]);
});

// Delete → DELETE /posts/:id
app.delete("/posts/:id", (req, res) => {
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
