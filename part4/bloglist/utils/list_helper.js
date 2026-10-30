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

  const authorsArray = _.map(authorList, (blogCount, author) => {
    return { author, blogs: blogCount }
  })

  return _.maxBy(authorsArray, 'blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const groupedList = _.groupBy(blogs, 'author')

  const newList = _.map(groupedList, (authorBlogs, author) => {
    return {
      author,
      likes: _.sumBy(authorBlogs, 'likes'),
    }
  })

  return _.maxBy(newList, 'likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
