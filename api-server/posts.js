const clone = require('clone')
// http://facebook.github.io/jest/pt-BR/
let db = {}

const defaultData = {
  byId: {
    "8xf0y6ziyjabvozdd253nd": {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      comments: ['894tuq4ut84ut8v4t8wun89g', '8tu4bsun805n8un48ve89'],
      voteScore: 6,
      deleted: false,
      commentCount: 2
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: '6ni6ok3ym7mf1p33lnez',
      timestamp: 1468479767190,
      title: 'Learn Redux in 10 minutes!',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thingone',
      category: 'redux',
      comments: [],
      voteScore: -5,
      deleted: false,
      commentCount: 0
    },
    "8xf0y6ziyjabvozdd253nds": {
      id: '8xf0y6ziyjabvozdd253nds',
      timestamp: 1467166872634,
      title: 'Udacity - Cursos de Tecnologia‎',
      body: 'Udacity é uma organização educacional com fins lucrativos fundada por Sebastian Thrun, David Stavens, e Mike Sokolsk',
      author: 'Wikipédia',
      category: 'udacity',
      comments: [],
      voteScore: 16,
      deleted: false,
      commentCount: 0
    }
  },
  allIds: ['8xf0y6ziyjabvozdd253nd', '6ni6ok3ym7mf1p33lnez', '8xf0y6ziyjabvozdd253nds']
}

function getData(token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory(token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get(token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll(token, q, field) {

  return new Promise((res) => {
    const posts = getData(token)
    let result = [];

    result.push(Object.keys(posts['byId'])
      .filter(keyF => !posts['byId'][keyF].deleted)
      .map(keyM => posts['byId'][keyM])
    )

    if (typeof q !== "undefined" && field !== "undefined") {
      q = q.toLowerCase()

      result[0] = result[0].filter(post => {
        let fieldMatch = false
        if (Array.isArray(field)) {
          fieldMatch = field.some(f => post[f].toLowerCase().indexOf(q) !== -1)
        } else {
          fieldMatch = post[field].toLowerCase().indexOf(q) !== -1
        }

        return fieldMatch
      }
      )
        .map(post => post)
    }

    result.push(result[0].map(post => post.id))

    res(result)
  })
}

function add(token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts.byId[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      comments: [],
      voteScore: 0,
      deleted: false,
      commentCount: 0
    }

    posts.allIds.push(post.id)

    res(posts[post.id])
  })
}

function vote(token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    let post = posts.byId[id]
    switch (option) {
      case "upVote":
        post.voteScore = post.voteScore + 1
        break
      case "downVote":
        post.voteScore = post.voteScore - 1
        break
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`)
    }

    res(post)
  })
}

function disable(token, id) {
  return new Promise((res) => {
    let posts = getData(token)
    let post = posts.byId[id]
    post.deleted = true
    res(post)
  })
}

function edit(token, id, postObject) {
  return new Promise((res) => {
    let posts = getData(token)
    let post = posts.byId[id]

    let prop
    for (prop in postObject) {
      post[prop] = postObject[prop]
    }

    res(post)
  })
}

function incrementCommentCounter(token, idPost, idComment, action) {
  const posts = getData(token)

  if (posts.byId[idPost]) {
    if (action == 'add') {
      posts.byId[idPost].comments.push(idComment)
    } else {
      posts.byId[idPost].comments = posts.byId[idPost].comments.filter(item => item !== idComment)
    }
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
