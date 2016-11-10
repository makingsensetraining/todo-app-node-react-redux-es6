import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function todoReducer(state = initialState.todos, action){
    switch (action.type){
        case types.LOAD_TODO_SUCCESS:
            console.log(action.todos);
            return action.todos;

        case types.CREATE_TODO_SUCCESS:
            console.log(action.todo);
            return [
                ...state,
                Object.assign({}, action.todo)
            ];

        case types.UPDATE_TODO_SUCCESS:
            return [
                ...state.filter(todo => todo.id !== action.todo.id), //We remove the updated item from the list.
                Object.assign({}, action.todo)
            ].sort((a, b) => { //After the array is with all the elements, we sort by todoId alphabetically
                return a.id - b.id;
            });

        default:
            return state;
    }
}
