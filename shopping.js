// For this task we have 2 classes: Product and Basket.
// Add as many products as you want: each product should have a name, price and quantity.
// 1.   Display the available products in the html - include at least the name and the quantity.
// 2.   When the user clicks on one product, you should add the product to the basked (Hint: create a method in the
//      Basket class that pushes the product into the products array).
// 3.   When a user adds a product to the basket, the total quantity of this product should decrease (should this
//      be a method of the Basket or of the Product class?)
// 4.   Everytime a user adds something in its basket, show the content of the basket in the html and show the
//      decreased amount of the product.
// 5.   If a product goes to 0, show that is sold out and don't let anyone clicking on it.
// 6.   Show the total price of the basket (when a user adds something in the basket, the total should be updated).
// 7.   Apply some discount: if a user buys 4 products of the same kind, one is free.
// 8.   Add as many features as you want

class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.discount = 0;
  }

  setDiscount (discount) {
    this.discount = discount
  }

  addQuantity (amount) {
    this.quantity += amount;
  }

  removeQuantity (amount) {
    this.quantity -= amount;
  }

  setQuantity (amount) {
    this.quantity = amount;
  }

  setPrice (amount) {
    this.price = amount;
  }

}

class Basket {
  constructor() {
    this.products = [];
  }
}

//Array holding all Products added to the Shop
let ProductsInShop = [];

let basket = new Basket();


//Add Products to the Shop in a table
const addProduct = (name,price,quantity) => {
  
  //Stops the addProduct if the Product already exists
  breakProduct: {
    for (let x of ProductsInShop) {
      if (x.name === name) {
        console.log("Product exists already");
        break breakProduct;
      }
    }

    const table = document.querySelector("#ShoppingCenter");
    const prodRow = document.createElement("tr");
    table.appendChild(prodRow);

    // creating Name Price and Quantity Cells of the Product and giving them a unique ID
    const prodName = document.createElement("td");
    prodRow.appendChild(prodName);
    prodName.innerHTML = name;
    prodName.id = name + "-name"

    const prodPrice = document.createElement("td");
    prodRow.appendChild(prodPrice);
    prodPrice.innerHTML = price;
    prodPrice.id = name + "-price"

    const prodQuantity = document.createElement("td");
    prodRow.appendChild(prodQuantity);
    prodQuantity.innerHTML = quantity;
    prodQuantity.id = name + "-quanitity"

    //creates the Productobject
    const product = new Product(name,price,quantity);
    ProductsInShop.push(product);
  }
}

//Interface to add new Products or modify existing ones
const addedProductSelectorUpdate = () => {
  const shoppinginterface = document.querySelector("#shop-interface")
  const newOption = document.createElement("option");

}

//Test Products
addProduct("apple",5.99,4);
addProduct("birne",30,1);
console.log(ProductsInShop);