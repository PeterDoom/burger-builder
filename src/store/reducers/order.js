import * as actionTypes from "../actions/actionTypes";

const initalState = {
    orders: [],
    loading: false,
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderDate,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)

            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading:true
            }

        default:
            return state;
    }
};


export default reducer