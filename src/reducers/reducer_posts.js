import {FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions/index'
import _ from 'lodash'

export default function(state = {}, action){

  console.log('action', action);
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);

    case FETCH_POST: {
      // const post = action.payload.data;
      return {...state, [action.payload.data.id] : action.payload.data}
    }
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id')
      break;
    default: return state;

  }
}
