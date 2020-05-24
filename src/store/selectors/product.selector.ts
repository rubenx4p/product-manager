import { AppState } from "../reducers";
import { createSelector } from "@ngrx/store";
import { ProductState } from "../reducers/product.reducer";

export const selectProducts = (state: AppState) => state.products;

export const selectProductsDic = createSelector(
    selectProducts,
    (state: ProductState) => {
        const { search } = state
        let products = Object.values(state.products)

        if (search) {
            products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        }

        return products;
    }
);

export const selectSearchProduct = createSelector(
    selectProducts,
    (state: ProductState) => state.search
);