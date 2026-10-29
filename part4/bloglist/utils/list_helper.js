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

  const authorList = {}

  blogs.forEach(
    (blog) => (authorList[blog.author] = (authorList[blog.author] ?? 0) + 1),
  )

  const authorsArray = Object.entries(authorList)
  const bestAuthor = authorsArray.reduce(
    ([mostName, mostCount], [authorName, authorCount]) => {
      return authorCount > mostCount
        ? [authorName, authorCount]
        : [mostName, mostCount]
    },
    authorsArray[0],
  )
  const [author, blogCount] = bestAuthor
  return { author, blogs: blogCount }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
