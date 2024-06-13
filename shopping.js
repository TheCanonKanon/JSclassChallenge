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
  constructor(name, price, quantity, discount) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.discount = false;
  }

  setDiscount (DiscountState) {
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

window.onload = () => {
  addEvents();
}

let basket = new Basket();

/*------------------------------------------------------*/
/*Product Table and Function to add new Products*/
/*------------------------------------------------------*/

//Array holding all Products added to the Shop
let ProductsInShop = [];

//Add Products to the Shop in a table
const addProduct = (name,price,quantity,discount) => {
  
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

    const prodDiscount = document.createElement("td");
    prodRow.appendChild(prodDiscount);
    prodDiscount.innerHTML = discount;
    prodDiscount.id = name + "-discount"

    //creates the Productobject
    const product = new Product(name,price,quantity);
    ProductsInShop.push(product);

    //append Productname to Selector in Productinterface
    addedProductSelectorUpdate(name);
  }
}

/*------------------------------------------------------*/
/*Interface to add new Products or modify existing ones*/
/*------------------------------------------------------*/

//Update new Product to Selector
const addedProductSelectorUpdate = (name) => {
  const shoppinginterface = document.querySelector("#shop-select-interface");
  const newOption = document.createElement("option");
  shoppinginterface.appendChild(newOption);
  newOption.innerHTML = name;
  newOption.id = name + "-option";
}

//Update modification to Selector
const modifiedProductSelectorUpdate = (oldName, newName) => {
  const selectOption = document.querySelector("#" + oldName + "-option");
  selectOption.innerHTML = newName;
  selectOption.id = newName + "-option";
}

//Updates the Text Fields to Selector Option
const updateTextFieldsShopInterface = () => {
  const selector = document.querySelector("#shop-select-interface");
  const nameText = document.querySelector("#product-name-text");
  const priceText = document.querySelector("#product-price-text");
  const quantityText = document.querySelector("#product-quantitiy-text");
  const discountCheckbox = document.querySelector("#product-discount-checkbox");
  for (let x of ProductsInShop) {
    if (selector.value === "empty"){
      nameText.value = "";
      priceText.value = "";
      quantityText.value = "";
      discountCheckbox.value = "";
      break;   
    } else if (x.name === selector.value){
      nameText.value = x.name;
      priceText.value = x.price;
      quantityText.value = x.quantity;
      discountCheckbox.value = x.discount;
      break;
    }
  }
}

const addEvents = () => {
  const selectorChange = document.querySelector("#shop-select-interface");
  selectorChange.addEventListener("change", () => updateTextFieldsShopInterface());
  /*const shopInterfaceNameChange = document.querySelector("#product-name-text")
  shopInterfaceNameChange.addEventListener("change", () => )*/
}

//Test Products
addProduct("apple",5.99,4,false);
addProduct("birne",30,1,true);
console.log(ProductsInShop);