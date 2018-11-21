import { User } from './../../models/auth.model';
import { Action } from '@ngrx/store'
import * as fromAuth from './../actions/auth.action';


//export type Action = fromAuth.AuthAction;

const defaultUser = new User(null, 'GUEST');

export function authReducer(state: User = defaultUser, action: fromAuth.AuthAction) {
  switch (action.type) {

    case fromAuth.GET_USER:
        return { ...state, loading: true };
    
    case fromAuth.AUTHENTICATED:
        
        return { ...state, ...action.payload, loading: false };

    case fromAuth.NOT_AUTHENTICATED:
        return { ...state, ...defaultUser, loading: false };

    case fromAuth.AUTH_ERROR:
      return { ...state, ...action.payload, loading: false };

    case fromAuth.LOGOUT:
      return { ...state, loading: true };

    default:
        console.log(state);
        return state;

  }
}