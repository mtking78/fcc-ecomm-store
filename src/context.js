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
    cart: [],
    // only true for testing
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
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
      // console.log(this.state)
      this.addTotals();
      }
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true }
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false }
    });
  };

  increment = (id) => {
    console.log("increment method");
  }

  decrement = (id) => {
    console.log("decrement method");
  }

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    // Filter the cart by not returning matching id item.
    tempCart = tempCart.filter(item => item.id !== id);

    // Get the index of the product in the array
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];

    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      };
    }, () => {
      this.addTotals();
    });
  }

  clearCart = () => {
    this.setState(() => {
      return { cart: [] };
    }, () => {
      // Will reset the array of products and their values.
      this.setProducts();
      // Will rest the totals back to the initial zeroes.
      this.addTotals();
    });
  }

  addTotals = () => {
    let subTotal = 0;

    this.state.cart.map(item => (subTotal += item.total));

    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));

    const total = (subTotal + tax);

    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  }

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };