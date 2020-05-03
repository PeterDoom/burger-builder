import React, {Component} from "react";
import {connect} from "react-redux";
import Aux from "../hoc/AuxComponent";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from "../axios-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHander from "../hoc/withErrorHandling/withErrorHandler";
import * as burgerBuilderactions from "../store/actions/index";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: null,
    };

    componentDidMount() {
        this.props.onInitIngredients()
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetRedirectAuthPath("checkout");
            this.props.history.push("/auth");
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    render() {
        const disableInfo = {
            ...this.props.ings,
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? (
            "Ingredients can't be loaded"
        ) : (
            <Spinner/>
        );

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price}
                    />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.props.price}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        console.log(this.state.purchasing);
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderactions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderactions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderactions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderactions.purchaseInit()),
        onSetRedirectAuthPath: (path)=> dispatch(burgerBuilderactions.setAuthRedirectPath(path))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHander(BurgerBuilder, axios));
