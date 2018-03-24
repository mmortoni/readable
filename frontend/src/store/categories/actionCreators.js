import { CATEGORY } from '../../constants/constants'

export function fetchCategories(payload) {
    return { type: CATEGORY.CATEGORY_FETCH_COLLECTION, payload };
}

export function fetchCategoriesSuccess(data, payload) {
    return { type: CATEGORY.CATEGORY_FETCH_COLLECTION_SUCCESS, data, payload };
}
