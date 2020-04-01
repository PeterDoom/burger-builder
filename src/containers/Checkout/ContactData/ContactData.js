import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    };

    orderHandler = event => {
        event.preventDefault();
        console.log(this.props.ingredients, this.props.price);

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Peter Doom",
                address: "SomePlace North"
            }
        };
        axios
            .post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
                this.props.history.push("/")
            }
            )
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    };

    render() {
        let form = (
            <form>
                <input
                    className={classes.Input}
                    type="text"
                    name="name"
                    placeholder="Your Name Here"
                />
                <input
                    className={classes.Input}
                    type="email"
                    name="email"
                    placeholder="Your email Here"
                />
                <input
                    className={classes.Input}
                    type="text"
                    name="street"
                    placeholder="Your street Here"
                />
                <input
                    className={classes.Input}
                    type="text"
                    name="postalCode"
                    placeholder="Your PostalCode Here"
                />
                <Button btnType="Success" clicked={this.orderHandler}>
                    ORDER
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
