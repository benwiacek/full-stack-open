const dummy = (blogs) => {
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

module.exports = { dummy, totalLikes, favoriteBlog }
