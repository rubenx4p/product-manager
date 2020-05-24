import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { productReducer, ProductState } from "./product.reducer";
import { InjectionToken } from "@angular/core";

export interface AppState {
  products: ProductState;
}

export const reducers: ActionReducerMap<AppState> = {
  products: productReducer
};

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>("Registered Reducers", {
  factory: () => ({
    products: productReducer,
    // const serv = inject(SomeService);
    // // return reducers synchronously
    // return serv.getReducers();
  })
});

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
