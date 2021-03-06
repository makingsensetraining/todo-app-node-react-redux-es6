import * as types from './actionTypes';
import todoAPI from '../api/mockTodoApi';
import fetch from 'isomorphic-fetch';

export function loadTodoSuccess(todos){
    return { type: types.LOAD_TODO_SUCCESS, todos };
}

export function createTodoSuccess(todo){
    return { type: types.CREATE_TODO_SUCCESS, todo };
}

export function updateTodoSuccess(todo){
    return { type: types.UPDATE_TODO_SUCCESS, todo };
}

export function deleteTodoSuccess(todoId){
    return { type: types.DELETE_TODO_SUCCESS, todoId };
}

export function filterTodoSuccess(todos){
    return { type: types.FILTER_TODO_SUCCESS, todos };
}

export function loadTodos(){
    return dispatch => {
        return todoAPI.getAllTodos().then(todos => {
            dispatch(loadTodoSuccess(todos));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveTodo(todo){
    return (dispatch, getState) => {
        return todoAPI.saveTodo(todo).then(todoSaved => {
            todo.id ? dispatch(updateTodoSuccess(todoSaved)) :
                dispatch(createTodoSuccess(todoSaved));
        }).catch(error => {
            throw(error);
        });
    };
}

export function deleteTodo(todoId){
    return dispatch => {
        return todoAPI.deleteTodo(todoId).then(() => {
            dispatch(deleteTodoSuccess(todoId));
        }).catch(error => {
            throw(error);
        });
    };
}

export function filterTodo(filterType){
    return dispatch => {
        return todoAPI.filterTodo(filterType).then(todos => {
            dispatch(filterTodoSuccess(todos));
        }).catch(error => {
            throw(error);
        });
    }
}

/*
    For using REAL Api Calls
    -> Example http call from original doc: http://redux.js.org/docs/advanced/AsyncActions.html
    using thunk and fetch (needs polyfill)


function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestPosts(subreddit))
        return fetch(`http://www.reddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(subreddit, json)))
    }
}

// Other example:
 return fetch('http://<apiURL>')
     .then(response => response.json())
     .then(json => console.log(json));

// Fetch using Post JSON:
 fetch('/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
    })
 })
*/
