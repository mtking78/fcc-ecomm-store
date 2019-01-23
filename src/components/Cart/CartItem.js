import React from 'react';

export default function CartItem({ item, value }) {

  const { id, title, img, price, total, count } = item;
  const { increment, decrement, removeItem } = value;
  return (
    <div className="row my-2 text-capitalize text-center">

      {/* Image Column */}
      <div className="col-10 mx-auto col-lg-2">
        <img
          className="img-fluid"
          alt="product"
          src={ img }
          style={{ width: '5rem', height: '5rem' }}
        />
      </div>

      {/* Product Name Column */}
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product: </span>
        { title }
      </div>

      {/* Price Column */}
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price: $</span>
        { price }
      </div>

      {/* Count and -/+ Column */}
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
        <div className="d-flex justify-content-center">
        </div>
        {/* Decrement by 1 */}
        <span
          className="btn btn-black mx-1"
          onClick={() => {
            decrement(id);
          }}
        >-</span>
        {/* Quantity (Count) */}
        <span className="btn btn-black mx-1">{ count }</span>
        {/* Increment by 1 */}
        <span
          className="btn btn-black mx-1"
          onClick={() => {
            increment(id);
          }}
        >+</span>
      </div>
      {/* Remove Item Icon Column */}
      <div className="col-10 mx-auto col-lg-2">
        <div
          className="cart-icon"
          onClick={() => {
            removeItem(id);
          }}
        >
          <i className="fas fa-trash" />
        </div>
      </div>
      {/* Total Column */}
      <div className="col-10 mx-auto col-lg-2">
        <strong>total: ${ total }</strong>
      </div>

    </div>
  )
}
