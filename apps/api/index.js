const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(bodyParser.json())

app.post('/users/create-user', async (req, res) => {
  const { email, password, displayName, username } = req.body;
  const user = await prisma.user.create({
    data: {
      displayName,
      email,
      password,
      username
    }
  });
  res.send({ message: `Created user '${user.username}'`, user });
});

app.post('/posts/create-post', async (req, res) => {
  const { title, content, tags, currentUser } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      tags,
      author: currentUser,
      authorId: currentUser.id
    }
  });
  res.send({ message: `Created post: ${post.title}`, post });
});

app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  const post = await prisma.post.findFirst({
    where: {
      id: postId
    }
  })
  res.send({ post });
});

app.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const user = await prisma.user.findFirst({
    where: {
      id: userId
    }
  });
  res.send({ user });
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email,
      password
    }
  });
  res.send({ user })
})

app.listen(3001, () => console.log('Listening on port: 3001'));