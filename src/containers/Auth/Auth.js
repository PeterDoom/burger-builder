import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index"
import {connect} from "react-redux"

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Mail address",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLenght: 6,
                },
                valid: false,
                touched: false,
            },
        }, 
    };

    checkValidity(value, rules) {
        let isValid = false;

        if (!rules) {
            return true;
        }
    
        if (rules.minLenght){
            isValid = value.length >= rules.minLenght && isValid
        }

        if (rules.isEmail) {
            //eslint-disable-next-line
            const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.required) {
            isValid = value.trim() !== "";
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        const form = formElementsArray.map((formElement) => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) =>
                    this.inputChangedHandler(event, formElement.id)
                }
            />
        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                    <Button btnType="DANGER">Sign In</Button>
                </form>
            </div>
        );
    }
}

const mapDispathToProps = dispatch =>{
    return {
        onAuth: (email, password) => dispatch(actions.auth(email,password))
    };
};

export default connect(null, mapDispathToProps)(Auth);
