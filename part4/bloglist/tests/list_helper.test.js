const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]

  test('when list only has one blog, equals like of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  const emptyList = []

  test('when list of blogs is empty, equals 0', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  const multipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '9b421aa71b54a676234w75a1',
      title: 'New blog test 1',
      author: 'Ben',
      url: 'https://google.com',
      likes: 4,
      __v: 0,
    },
    {
      _id: '2z666aa71b54a676234h17l7',
      title: 'New blog test 2',
      author: 'Atiaf',
      url: 'https://fullstackopen.com',
      likes: 6,
      __v: 0,
    },
    {
      _id: '3l486dj71b54a6736219t76d2',
      title: 'New blog test 3',
      author: 'Someone',
      url: 'https://lemonde.fr',
      likes: 0,
      __v: 0,
    },
  ]

  test('when multiple blogs list, equals sum of likes for each blog', () => {
    const result = listHelper.totalLikes(multipleBlogs)
    assert.strictEqual(result, 15)
  })
})
