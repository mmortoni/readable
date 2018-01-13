const clone = require('clone')
// http://facebook.github.io/jest/pt-BR/
let db = {}

const defaultData = {
  byId : {
    "8xf0y6ziyjabvozdd253nd": {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      comments : ['894tuq4ut84ut8v4t8wun89g','8tu4bsun805n8un48ve89'],
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
      comments : [],
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
      comments : [],
      voteScore: 16,
      deleted: false,
      commentCount: 0
    }
  },
  allIds : ['8xf0y6ziyjabvozdd253nd','6ni6ok3ym7mf1p33lnez','8xf0y6ziyjabvozdd253nds']
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}
/*
function getData (token) {
  if(!db[token])
    db[token] = JSON.parse(JSON.stringify(defaultData))

  let data = JSON.parse(JSON.stringify(db[token]))
  return data
}
*/
function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token,q,field) {
  return new Promise((res) => {
    const posts = getData(token)

    let filtered_keys = Object.keys(posts['byId']).filter(key => !posts['byId'][key].deleted)

    if(typeof q !== "undefined" && field !== "undefined") {
      q = q.toLowerCase()
      filtered_keys = filtered_keys.filter(key => {
          let result = false
          if(Array.isArray(field)){
            result = field.some(f => posts['byId'][key][f].toLowerCase().indexOf(q) !== -1)
          } else {
            result = posts['byId'][key][field].toLowerCase().indexOf(q) !== -1
          }
          return result
        }
      )
    }

    for(let key in posts['byId']) {
      if(filtered_keys.indexOf(key) === -1)
        delete posts['byId'][key]
    }

    posts['allIds'] = filtered_keys

    filtered_keys = Object.keys(posts)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts.byId[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      comments : [],
      voteScore: 1111,
      deleted: false,
      commentCount: 0
    }

    posts.allIds.push(post.id)

console.log(posts[post.id])
    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    let post = posts.byId[id]
    switch(option) {
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

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, postObject) {
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

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
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
