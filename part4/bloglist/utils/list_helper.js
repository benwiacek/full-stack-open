const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const reducer = (best, blog) => {
      return blog.likes > best.likes ? blog : best
    }

    return blogs.reduce(reducer, blogs[0])
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authorList = _.countBy(blogs, 'author')

  const authorsArray = Object.entries(authorList)
  const [authorName, blogCount] = _.maxBy(
    authorsArray,
    ([, authCount]) => authCount,
  )

  return { author: authorName, blogs: blogCount }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
