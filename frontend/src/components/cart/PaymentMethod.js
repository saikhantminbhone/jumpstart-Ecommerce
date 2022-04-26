/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)


    const order = {
        orderItems: cartItems,
        shippingInfo,
        user
    }

    const [id, setId] = useState('');

    const paymentInfo = {
        id: id,
        status: "succeeded"
    }



    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
        order.paymentInfo = paymentInfo

    }


    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        dispatch(createOrder(order))

        history.push('/success')

    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <h4 className="mb-4">Total Price -$ {orderInfo.totalPrice} </h4>

                        <img className="img-fluid img-thumbnail mb-5"  src="images/payme.jpg" alt="Scan to pay me" />

                        <div className="form-group">
                            <label htmlFor="card_num_field">Transaction ID</label>
                            <input
                                type="text"
                                className="form-control"
                                value={id}
                                placeholder="Enter Transaction ID"
                                onChange={(e) => setId(e.target.value)}
                                
                                required
                                
                            />
                        </div>

                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Done
                        </button>


                       




                        
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment
