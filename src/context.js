import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();
// Provider 
// Consumer 

class ProductProvider extends Component {

  state = {
    // Line below will not work, because it is a reference to the data
    // products: storeProducts,
    products: [],
    detailProduct: detailProduct,
    cart: []
  }

  componentDidMount() {
    this.setProducts();
  }

  // Make a copy of the data to set the state.
  setProducts = () => {
    let tempProducts = [];
    // Loop through the storeProducts array and do something with each item...
    storeProducts.forEach(item => {
      // copy the values for each item
      const singleItem = {...item};
      // get the old values from the products and add the newly created singleItem
      tempProducts = [...tempProducts, singleItem];

      // Get new set of the products values rather than references to them.
      this.setState(() => {
        return { products: tempProducts }
      });
    })
  }

  getItem = (id) => {
    // Only if the item id matches, return item
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      // Get selected product rather than the one from data
      return { detailProduct: product }
    })
  };

  addToCart = (id) => {
    // Create a temporary products array
    let tempProducts = [...this.state.products];
    // Find the index of the product from all products in state
    const index = tempProducts.indexOf(this.getItem(id));
    // new variable is specific item from the temporary array
    const product = tempProducts[index];

    // change the values to reflect 1 product added to cart
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
      () => {
        // Change the products to tempProducts array, add the specific product to the cart
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
      console.log(this.state)
      }
    );
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };