import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

export const fetchingIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILS,
    };
};

export const initIngredients = () => {
    return (dispatch) => {
        axios
            .get("https://react-burger-bd72f.firebaseio.com/ingredients.json")
            .then((response) => {
                dispatch(setIngredients(response.data));
            })
            .catch((error) => {
                dispatch(fetchingIngredientsFailed);
            });
    };
};
