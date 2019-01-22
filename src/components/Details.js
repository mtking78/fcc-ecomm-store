import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import { detailProduct } from '../data';

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const {id, company, img, info, price, title, inCart} = value.detailProduct;
          return (
            <div className="container py-5">
              {/* Ttitle */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{ title }</h1>
                </div>
              </div>
              {/* Product Info */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={ img } className="img-fluid" alt="product" />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>model: { title }</h2>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    made by: <span className="text-uppercase">{ company }</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      price: <span>$</span>{ price }
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info about the product:
                  </p>
                  <p className="text-muted lead">
                    { info }
                  </p>
                  {/* Buttons */}
                  <Link to="/">
                    <ButtonContainer>
                      back to products
                    </ButtonContainer>
                  </Link>
                  {/* Show, disable button based on inCart state. */}
                  <ButtonContainer
                    // next property, 'cart' is used to style with props in Button.js
                    cart
                    disabled={ inCart ? true : false }
                    onClick={() => {
                      value.addToCart(id);
                    }}
                  >
                    {inCart ? "inCart" : "add to Cart"}
                  </ButtonContainer>
                </div>
              </div>
            </div>
          )
        }}
      </ProductConsumer>
    )
  }
}
