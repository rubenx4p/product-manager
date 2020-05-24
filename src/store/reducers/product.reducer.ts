import { Action, createReducer, on } from "@ngrx/store";
import { Product } from '../models/product.model';
// import * as LoginActions from "../actions/user.action";

export interface ProductState {
  products: { [key: string]: Product };
}

export const initialState: ProductState = {
  products: {}
};

export const productReducer = createReducer(
  initialState,
  // on(LoginActions.login, (state, { username }) => {
  //   console.log("username = ", username);
  //   return {
  //     ...state,
  //     username: username
  //   };
  // })
);

export function reducer(state: ProductState | undefined, action: Action) {
  return productReducer(state, action);
}
