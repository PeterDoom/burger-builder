import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}; 


const addIngredients = (state, action) => {

    const addedIngredient = {
        [action.ingredientName]:
            state.ingredients[action.ingredientName] + 1,
    };
    const addedIngredients = updateObject(
        state.ingredients,
        addedIngredient
    );
    const addIngredientsToState = {
        ingredients: addedIngredients,
        totalPrice:
            state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, addIngredientsToState);
};

const removeIngredients = (state, action) => {

    const removedIngredient = {
        [action.ingredientName]:
            state.ingredients[action.ingredientName] - 1,
    };
    const removedIngredients = updateObject(
        state.ingredients,
        removedIngredient
    );
    const removeIngredientsFromState = {
        ingredients: removedIngredients,
        totalPrice:
            state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, removeIngredientsFromState);
};


const setIngredients = (state, action) => {

    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false
    });

};

const fetchIngredientsFail = (state, action) => {
    return updateObject(state, {
        ...state,
        error: true,
    });

};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state,action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILS: return fetchIngredientsFail(state, action);
        default:
            return state;
    }
};

export default reducer;
