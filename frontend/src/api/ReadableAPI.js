/* eslint-env jest */

const api = process.env.REACT_APP_READABLE_API || "https://localhost:3001";

let token = localStorage.token;

if (!token)
token = localStorage.token = Math.random()
.toString(36)
.substr(-8);

const headers = {
    Accept: "application/json",
    Authorization: token,
    "Content-Type": "application/json"
};


// This commands loads the mocked request.js as defined in __mocks__/request.js
jest.mock('../request')

const github = require('../github')

// A simple example test
describe('#getUser() using Promises', () => {
  it('should load user data', () => {
    return github.getUser('vnglst')
    .then(data => {
      expect(data).toBeDefined()
      expect(data.entity.name).toEqual('Koen van Gilst')
    })
  })
})

// The exact same test using async/await
describe('#getUser() using async/await', () => {
  it('should load user data', async () => {
    const data = await github.getUser('vnglst')
    expect(data).toBeDefined()
    expect(data.entity.name).toEqual('Koen van Gilst')
  })
})



export const getPosts = () =>
    fetch('posts', { headers }).then(res => res.json());

export const addPost = () =>
    fetch('posts', {
        method: "POST",
        headers
    })
        .then(res => res.json())
        .then(data => console.log(data));

export const votePost = (postID, status) =>
    fetch(`posts/${postID}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ option: status })
    })
        .then(res => res.json())
        .catch(error => error);

export const getComments = postID =>
    fetch(`posts/${postID}/comments`, {
        method: "GET",
        headers
    }).then(res => res.json());

export const voteComment = (postID, status) =>
    fetch(`comments/${postID}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ option: status })
    })
        .then(res => res.json())
        .catch(error => error);

export const addComment = comment =>
    fetch('comments', {
        method: "POST",
        headers,
        // body: JSON.stringify(comment)
        body: JSON.stringify(comment)
    })
        .then(res => res.json())
        .catch(error => error);

export const deleteComment = commentID =>
    fetch(`comments/${commentID}`, {
        method: "DELETE",
        headers
    })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .catch(error => error);

export const getCategories = () =>
    fetch('categories', { headers })
        .then(res => res.json())
        .catch(error => error);
