import fetch from 'isomorphic-fetch';

const apiHost = 'https://hacker-news.firebaseio.com/v0/';

export function getStoriesList(listOf) {
  return fetch(`${apiHost}${listOf}.json?print=pretty`)
          .then(response => {
            if (response.status >= 400) {
              throw new Error('Bad response from server');
            }
            return response.json();
          });
}

export function getStory(id) {
  return fetch(`${apiHost}item/${id}.json?print=pretty`)
          .then(response => {
            if (response.status >= 400) {
              throw new Error('Bad response from server');
            }
            return response.json();
          });
}

export function getUser(id) {
  return fetch(`${apiHost}user/${id}.json?print=pretty`)
          .then(response => {
            if (response.status >= 400) {
              throw new Error('Bad response from server');
            }
            return response.json();
          });
}

