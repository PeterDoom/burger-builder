import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorhander from "../../hoc/withErrorHandling/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrder(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;

        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map((el) => (
                        <Order
                            key={el.id}
                            ingredients={el.ingredients}
                            price={el.price}
                        />
                    ))}
                </div>
            );
        }

        return orders;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrder: (token, userId) => dispatch(actions.fetchOrder(token, userId)),
    };
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorhander(Orders, axios));
