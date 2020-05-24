import { Action, createReducer, on } from "@ngrx/store";
import { Product } from '../models/product.model';
import * as ProductActions from "../actions/product.actions";
import { v4 as uuidv4 } from 'uuid';

export interface ProductState {
  products: { [key: string]: Product };
  search: string;
}

export const initialState: ProductState = {
  products: {},
  search: ''
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.addProduct, (state, { category, name, price }) => {
    const product: Product = {
      category,
      date: new Date(),
      id: uuidv4(),
      name,
      price
    }
    const products = { ...state.products };
    products[product.id] = product
    return {
      ...state,
      products
    };
  }),
  on(ProductActions.deleteProduct, (state, { id }) => {
    const products = { ...state.products };

    delete products[id]
    return {
      ...state,
      products
    };
  }),
  on(ProductActions.editProduct, (state, { category, name, price, id }) => {
    const products = { ...state.products };

    const product: Product = { ...products[id], category, name, price };

    products[product.id] = product
    return {
      ...state,
      products
    };
  }),
  on(ProductActions.editSearch, (state, { search }) => {
    return {
      ...state,
      search
    };
  })
);

export function reducer(state: ProductState | undefined, action: Action) {
  return productReducer(state, action);
}
