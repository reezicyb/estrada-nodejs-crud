# Node.js CRUD API (Express + JSON File Storage)
A simple **RESTful API** built with Node.js and Express, using a local `data.json` file as storage.
Supports basic CRUD (Create, Read, Update, Delete) operations on posts.
---
## ■ Features
- **Create** → POST /posts → Add a new post (title & content).
- **Read** → GET /posts → Get all posts.
- **Update** → PUT /posts/:id → Update a post by ID.
- **Delete** → DELETE /posts/:id → Delete a post by ID.
- Data is persisted in a local `data.json` file.
---
## ■ Project Setup
### 1. Clone Repo
```
git clone https://github.com//lastname-nodejs-crud.git
cd lastname-nodejs-crud
```
### 2. Install Dependencies
```
npm install
```
### 3. Run Server
```
npm start
```
Server will run on:
■ http://localhost:5000
---
## ■ Example Data (`data.json`)
```
[
{
"id": 1,
"title": "First Post",
"content": "This is my first post."
}
]
```
---
## ■ API Endpoints
### ■ Create Post
```
POST /posts
Content-Type: application/json
```
Body:
```
{
"title": "Second Post",
"content": "This is another post."
}
```
---
### ■ Get All Posts
```
GET /posts
```
---
### ✏■ Update Post
```
PUT /posts/:id
Content-Type: application/json
```
Body:
```
{
"title": "Updated Title",
"content": "Updated content"
}
```
---
### ■ Delete Post
```
DELETE /posts/:id
```
---
## ■ 4. Test with Thunder Client / Postman
### Create
```
POST http://localhost:5000/posts
Content-Type: application/json
{
"title": "Second Post",
"content": "This is another post."
}
```
### Read
```
GET http://localhost:5000/posts
```
### Update
```
PUT http://localhost:5000/posts/2
Content-Type: application/json
{
"title": "Updated Post",
"content": "This content was updated."
}
```
### Delete
```
DELETE http://localhost:5000/posts/2
```
---
## ■ Testing
You can test endpoints using:
- Thunder Client (VSCode extension)
- Postman
- curl in terminal
Example:
```
curl http://localhost:5000/posts
```
---
## ■ License
This project is for educational purposes.
Feel free to fork and modify! ■