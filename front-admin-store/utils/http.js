const host = process.env.NODE_ENV === 'production' ?  'http://localhost:4000' : 'ws://server-image-food.herokuapp.com/graphql';

function post(path, body) {
  console.log(host + path)
  return fetch(`${host}${path}`, {
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors'
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return data;
    });
}

function get(path) {
  return fetch(`${host}${path}`, {
    method: 'GET',
    mode: 'cors'
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return data;
    });
}

const http = {
  post: post,
  get: get
};

export default http;
