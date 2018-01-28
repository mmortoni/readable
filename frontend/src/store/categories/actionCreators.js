import * as actionTypes from './actionTypes';

export function fetchCategories(payload) {
    return {type: actionTypes.CATEGORY_FETCH_COLLECTION, payload};
}

export function fetchCategoriesSuccess(data, payload) {
    return {type: actionTypes.CATEGORY_FETCH_COLLECTION_SUCCESS, data, payload};
}
