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
    this.discount = discount;
  }

  setDiscount (discountState) {
    this.discount = discountState;
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
  constructor(money) {
    this.product = [];
    this.money = money;

  }

  addToBasket (amount) {
    this.quantity += amount;
  }

  removeFromBasket (amount) {
    this.quantity -= amount;
  }

  buyBasket () {

  }

}

window.onload = () => {
  addEvents();
}

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
    prodQuantity.id = name + "-quantity"

    const prodDiscount = document.createElement("td");
    prodRow.appendChild(prodDiscount);
    prodDiscount.innerHTML = discount;
    prodDiscount.id = name + "-discount";

    const prodButton = document.createElement("td");
    prodRow.appendChild(prodButton);
    prodButton.id = name + "-button";
    const prodBuyButton = document.createElement("button");
    prodButton.appendChild(prodBuyButton);
    prodBuyButton.id = name + "-buy-button";
    prodBuyButton.innerHTML = "Buy " + name;
    prodBuyButton.value = name;
    prodBuyButton.addEventListener("click", () => buyProductShop(prodBuyButton.value));

    //creates the Productobject
    const product = new Product(name,price,quantity,discount);
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
  const quantityText = document.querySelector("#product-quantity-text");
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

//called Event that if name is changed in Shop-Interface will create new Item or change name of existing one
const writeProductArrayName = (productName) => {
  const selector = document.querySelector("#shop-select-interface");
  const shopInterfaceName = document.querySelector("#product-name-text");
  const shopInterfacePrice = document.querySelector("#product-price-text");
  const shopInterfaceQuantity = document.querySelector("#product-quantity-text");
  const shopInterfaceDiscount = document.querySelector("#product-discount-checkbox");
  if (selector.value === "empty") {
    if (shopInterfaceName.value && shopInterfacePrice.value && shopInterfaceQuantity.value){
      addProduct(shopInterfaceName.value, shopInterfacePrice.value, shopInterfaceQuantity.value, shopInterfaceDiscount.checked);
      console.log(selector.length)
      selector.selectedIndex = selector.length-1;
    }
  } else {
    //find and change all html table
    const prodNameHead = document.querySelector("#" + selector.value + "-name");
    prodNameHead.innerHTML = productName;
    prodNameHead.id = productName + "-name";
    const prodPriceHead = document.querySelector("#" + selector.value + "-price");
    prodPriceHead.id = productName + "-price";
    const prodQuantityHead = document.querySelector("#" + selector.value + "-quantity");
    prodQuantityHead.id = productName + "-quantity";
    const prodDiscountHead = document.querySelector("#" + selector.value + "-discount");
    prodDiscountHead.id = productName + "-discount";
    //find and change the array entry
    ProductsInShop[selector.selectedIndex-1].name = productName;
    //find and change the selector entry
    selector[selector.selectedIndex].id = productName + "-option"
    selector[selector.selectedIndex].innerHTML = productName;
  }
}

//called Event that if price is changed in Shop-Interface will create new Item or change price of existing one
const writeProductArrayPrice = (productPrice) => {
  const selector = document.querySelector("#shop-select-interface");
  const shopInterfaceName = document.querySelector("#product-name-text");
  const shopInterfacePrice = document.querySelector("#product-price-text");
  const shopInterfaceQuantity = document.querySelector("#product-quantity-text");
  const shopInterfaceDiscount = document.querySelector("#product-discount-checkbox");
  if (selector.value === "empty") {
    if (shopInterfaceName.value && shopInterfacePrice.value && shopInterfaceQuantity.value){
      addProduct(shopInterfaceName.value, shopInterfacePrice.value, shopInterfaceQuantity.value, shopInterfaceDiscount.checked);
      selector.selectedIndex = selector.length-1;
    }
  } else {
    const prodPriceHead = document.querySelector("#" + selector.value + "-price");
    prodPriceHead.innerHTML = productPrice;
    ProductsInShop[selector.selectedIndex-1].price = productPrice;
  }
}

//called Event that if quantity is changed in Shop-Interface will create new Item or change quantity of existing one
const writeProductArrayQuantity = (productQuantity) => {
  const selector = document.querySelector("#shop-select-interface");
  const shopInterfaceName = document.querySelector("#product-name-text");
  const shopInterfacePrice = document.querySelector("#product-price-text");
  const shopInterfaceQuantity = document.querySelector("#product-quantity-text");
  const shopInterfaceDiscount = document.querySelector("#product-discount-checkbox");
  if (selector.value === "empty") {
    if (shopInterfaceName.value && shopInterfacePrice.value && shopInterfaceQuantity.value){
      addProduct(shopInterfaceName.value, shopInterfacePrice.value, shopInterfaceQuantity.value, shopInterfaceDiscount.checked);
      selector.selectedIndex = selector.length-1;
    }
  } else {
    const prodQuantityHead = document.querySelector("#" + selector.value + "-quantity");
    prodQuantityHead.innerHTML = productQuantity;
    ProductsInShop[selector.selectedIndex-1].quantity = productQuantity;
  }
}

//called Event that if price is changed in Shop-Interface will create new Item or change name of existing one
const writeProductArrayDiscount = (productDiscount) => {
  const selector = document.querySelector("#shop-select-interface");
  const shopInterfaceName = document.querySelector("#product-name-text");
  const shopInterfacePrice = document.querySelector("#product-price-text");
  const shopInterfaceQuantity = document.querySelector("#product-quantity-text");
  const shopInterfaceDiscount = document.querySelector("#product-discount-checkbox");
  if (selector.value === "empty") {
    if (shopInterfaceName.value && shopInterfacePrice.value && shopInterfaceQuantity.value){
      addProduct(shopInterfaceName.value, shopInterfacePrice.value, shopInterfaceQuantity.value, shopInterfaceDiscount.checked);
      selector.selectedIndex = selector.length-1;
    }
  } else {
    const prodDiscountHead = document.querySelector("#" + selector.value + "-discount");
    prodDiscountHead.innerHTML = productDiscount;
    ProductsInShop[selector.selectedIndex-1].discount = productDiscount;
  }
}

//Deletes the Selected Product
const deleteProductArray = () => {
  const selector = document.querySelector("#shop-select-interface");
  if (selector.value === "empty") {
    console.log("Select Product to delete");
  } else {
    //Delete Array
    ProductsInShop.splice(selector.selectedIndex-1,1);
    console.log(ProductsInShop)
    //Delete TableEntry
    const prodNameHead = document.querySelector("#" + selector.value + "-name");
    prodNameHead.remove();
    const prodPriceHead = document.querySelector("#" + selector.value + "-price");
    prodPriceHead.remove();
    const prodQuantityHead = document.querySelector("#" + selector.value + "-quantity");
    prodQuantityHead.remove();
    const prodDiscountHead = document.querySelector("#" + selector.value + "-discount");
    prodDiscountHead.remove();
    //Delete Selector Option
    const selectorOption = document.querySelector("#" + selector.value +"-option")
    selectorOption.remove();
  }
}

const addEvents = () => {
  const selectorChange = document.querySelector("#shop-select-interface");
  selectorChange.addEventListener("change", () => updateTextFieldsShopInterface());
  const shopInterfaceNameChange = document.querySelector("#product-name-text");
  shopInterfaceNameChange.addEventListener("change", () => writeProductArrayName(shopInterfaceNameChange.value));
  const shopInterfacePriceChange = document.querySelector("#product-price-text");
  shopInterfacePriceChange.addEventListener("change", () => writeProductArrayPrice(shopInterfacePriceChange.value));
  const shopInterfaceQuantityChange = document.querySelector("#product-quantity-text");
  shopInterfaceQuantityChange.addEventListener("change", () => writeProductArrayQuantity(shopInterfaceQuantityChange.value));
  const shopInterfaceDiscountChange = document.querySelector("#product-discount-checkbox");
  shopInterfaceDiscountChange.addEventListener("change", () => writeProductArrayDiscount(shopInterfaceDiscountChange.checked));
  const shopInterfaceDelete = document.querySelector("#product-delete-button");
  shopInterfaceDelete.addEventListener("click", () => deleteProductArray());
}

/*------------------------------------------------------*/
/*Function to add Products to Basket with Button Click*/
/*------------------------------------------------------*/

const buyProductShop = (productName) => {
  console.log(productName)

}

/*------------------------------------------------------*/
/*Basket Stuff*/
/*------------------------------------------------------*/

let basket = new Basket(100);


//Test Products
addProduct("apple",5.99,4,false);
addProduct("birne",30,1,true);
console.log(ProductsInShop);