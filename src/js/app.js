import {settings, select} from "./settings";
import Product from "./components/Product.js";
import Cart from "./components/Cart.js";
import AmountWidget from "./components/AmountWidget.js";
import CartProduct from "./CartProduct.js";


  const app = {
    initData: function(){
      const thisApp = this;

      *thisApp.data = {};
      const url = settings.db.url + '/' + settings.db.products;

      fetch(url)
        .then(function(rawResponse){
          return rawResponse.json();
        })
        .then(function(parsedResponse){
          console.log('presedResponse', parsedResponse);

          // save parsedResponse as thisApp.data.products
          thisApp.data.products = parsedResponse;
          //execute initMenu method
          thisApp.initMenu();
        });
      console.log('thisApp.data', JSON.stringify(thisApp.data));*/
      thisApp.data = dataSource;
    },

    initMenu: function(){
      const thisApp = this;

      //console.log('thisApp.data:', thisApp.data);

      for(let productData in thisApp.data.products){
        new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
      }

    },

    init: function(){
      const thisApp = this;
      //console.log('*** App starting ***');
      //console.log('thisApp:', thisApp);
      //console.log('classNames:', classNames);
      //console.log('settings:', settings);
      //console.log('templates:', templates);

      thisApp.data = {};
      thisApp.initMenu();
      thisApp.initCart();
    },
    
    initCart: function(){
      const thisApp = this;

      const cartElem = document.querySelector(select.containerOf.cart);
      thisApp.cart = new Cart(cartElem);

      thisApp.productList = document.querySelector(select.containerOf.menu)

      thisApp.productList.addEventListener("add-to-cart", function(event){
      
      app.cart.add(event.detail.product)prepareCartProduct());

    }  
  });

  app.init();
}