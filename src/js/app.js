import { settings, select, classNames } from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';
import Home from './components/Home.js';

export const app = {

  initPages: function () {  // uruchamia się podczas odświeżania strony
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;  // znalezienie kontenera wszystkich podstron - .children obsluguje wszystkie podstrony w thissApp pages znajdą się wszystkie dzieci kontenera stron

    thisApp.navLinks = document.querySelectorAll(select.nav.links);  // znalezienie wszystkich linków do podstron

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id; // jeśli hash podstrony nie pasuje do żadnej z nich załaduj pierwszą

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break; // pozostałe strony nie zostaną sprawdzone
      }
    }
    thisApp.activatePage(pageMatchingHash); // wydobywamy pierwszą z podstron razem z jej id (thisApp.pages[0].id)

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {  // po kliknięciu odpala się funkcja a atrybutem event
        const clickedElement = this;
        event.preventDefault();

        /* get page id from href attribute */

        const id = clickedElement.getAttribute('href').replace('#', '');  // replace pierwszy argument co zmieniamy, drugi na co zmieniamy // zapisujemy atrybut href klikniętego elementu

        /* run thisApp.activatePage with that id */

        thisApp.activatePage(id);

        /* change URL hash */ // hash w adresie strony

        window.location.hash = '#/' + id;  // przesunięcie strony jest treakcja na tę właściwość, nie kliknięcie - sam / po hash-u wyłącza to działanie domyślne
      });
    }

  },

  activatePage: function (pageId) {
    const thisApp = this;

    /* add class "active" to the matching pages, remove from non-matching */
    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);  // toggle nadaje klasęjako pierwszy argument tj. (classNames.pages.active) jeżeli jej nie było, w przeciwnym wypadku odbiera ją
    } // pętla idzie po wszystkich stronach z kontenera thisApp.pages     // drugi warunek po przecinku kontroluje czy dana klasa będzie nadana lub nie

    /* add class "active" to the matching links, remove from non-matching */

    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId // czy href jest równy # pageId podany w metodzie activatePage
      );  // toggle nadaje klasęjako pierwszy argument tj. (classNames.pages.active) jeżeli jej nie było, w przeciwnym wypadku odbiera ją
    } // pętla idzie po wszystkich stronach z kontenera thisApp.pages     // drugi warunek po przecinku kontroluje czy dana klasa będzie nadana lub nie

  },

  initMenu: function () {

    const thisApp = this;

    console.log('thisApp.data: ', thisApp.data);

    for (let productData in thisApp.data.products) {
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initHome: function () {
    const thisApp = this;

    const homeSection = document.querySelector(select.containerOf.home);
    thisApp.home = new Home(homeSection);
  },

  initBooking: function () {
    const thisApp = this;

    const bookingElement = document.querySelector(select.containerOf.booking);

    thisApp.booking = new Booking(bookingElement);

  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.products;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);

        /* save parsedRersponse as thisApp.data.products */
        thisApp.data.products = parsedResponse;
        /* execute initMenu method */
        thisApp.initMenu();

      });
    console.log('thisApp.data', JSON.stringify(thisApp.data));

  },

  init: function () {

    const thisApp = this;
    thisApp.initHome();
    thisApp.initPages();
    thisApp.initData();
    thisApp.initBooking();
  },

  initCart: function () {
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function (event) {
      app.cart.add(event.detail.product);
    });
  },

};

app.init();
app.initCart();