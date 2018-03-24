const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  byId: {
    "894tuq4ut84ut8v4t8wun89g": {
      id: '894tuq4ut84ut8v4t8wun89g',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1468166872634,
      body: 'Hi there! I am a COMMENT.',
      author: 'thingtwo',
      voteScore: 6,
      deleted: false,
      parentDeleted: false
    },
    "8tu4bsun805n8un48ve89": {
      id: '8tu4bsun805n8un48ve89',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1469479767190,
      body: 'Comments. Are. Cool.',
      author: 'thingone',
      voteScore: -5,
      deleted: false,
      parentDeleted: false
    }
  },
  allIds: ['894tuq4ut84ut8v4t8wun89g', '8tu4bsun805n8un48ve89']
}

function getData(token) {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

function getByParent(token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let result = [];

    result.push(Object.keys(comments['byId'])
      .filter(keyF => comments['byId'][keyF].parentId === parentId && !comments['byId'][keyF].deleted)
      .map(keyM => comments['byId'][keyM])
    )

    result.push(result[0].map(comment => comment.id))

    res(result)
  })
}

function get(token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]
    )
  })
}

function add(token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments.byId[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: comment.voteScore,
      deleted: comment.deleted,
      parentDeleted: comment.parentDeleted
    }

    posts.incrementCommentCounter(token, comment.parentId, comment.id, 'add')

    comments.allIds.push(comment.id)
    res(comments.byId[comment.id])
  })
}

function vote(token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments.byId[id]
    switch (option) {
      case "upVote":
        comment.voteScore = comment.voteScore + 1
        break
      case "downVote":
        comment.voteScore = comment.voteScore - 1
        break
      default:
        console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent(token, post) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    let filtered_keys = keys.filter(key => comments[key].parentId === post.id)
    filtered_keys.forEach(key => comments[key].parentDeleted = true)
    res(post)
  })
}

function disable(token, id) {
  return new Promise((res) => {
    let comments = getData(token)
    comments.byId[id].deleted = true
    posts.incrementCommentCounter(token, comments.byId[id].parentId, id, 'disable')
    res(comments.byId[id])
  })
}

function edit(token, id, commentObject) {
  return new Promise((res) => {
    let comments = getData(token)
    let comment = comments.byId[id]

    let prop
    for (prop in commentObject) {
      comment[prop] = commentObject[prop]
    }
    res(comment)
  })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
