import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from "./ContactData.module.css"

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street : '',
            postalCode: ''
        }
    }
    

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>
                    Enter your contact Data
                </h4>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder='Your Name Here' />
                    <input className={classes.Input} type='email' name='email' placeholder='Your email Here' />
                    <input className={classes.Input} type='text' name='street' placeholder='Your street Here' />
                    <input className={classes.Input} type='text' name='postalCode' placeholder='Your PostalCode Here' />
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }

}

export default ContactData