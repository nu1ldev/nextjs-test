const app = require('express')()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const slug = require('slug')

app.use(require('cors')(), require('body-parser').json())

app.get('/posts/:slug', async (req, res) => {
  const post = await prisma.post.findFirst({
    where: {
      slug: req.params.slug
    }
  })
  res.send({ post })
})

app.post('/posts/new', async (req, res) => {
  const { author, title, content, tags } = req.body
  await prisma.post.create({
    data: {
      author,
      title,
      content,
      tags,
      slug: slug(title)
    }
  })

  const post = await prisma.post.findFirst({
    where: {
      author,
      title,
      content,
      tags,
      slug: slug(title)
    }
  })
  res.send({ newPost: post })
})

app.get('/users/:username', async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      username: req.params.username
    }
  })
  res.send({ user })
})

app.post('/users/new', async (req, res) => {
  const { username, displayName, email, password } = req.body
  const user = await prisma.user.create({
    data: {
      username,
      displayName,
      email,
      password
    }
  })
  res.send({ newUser: user })
})

app.post('/users/get', async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findFirst({
    where: {
      email,
      password
    }
  })
  res.send({ user })
})

app.listen(9000, () => {
  console.log('started server')
})