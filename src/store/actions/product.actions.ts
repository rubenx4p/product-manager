import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Product } from '../models/product.model';

export const addProduct = createAction(
  "[Product] Add product",
  props<{ name: string, price: number, category: string }>()
);

export const deleteProduct = createAction(
  '[Product ] Delete Product',
  props<{ id: string }>()
);

export const editProduct = createAction(
  "[Product] Edit product",
  props<{ name: string, price: number, category: string, id: string }>()
);

export const editSearch = createAction(
  "[Product] Edit search",
  props<{ search: string }>()
);