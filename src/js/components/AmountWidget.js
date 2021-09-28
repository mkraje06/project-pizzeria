import { select, settings } from '../settings.js';
import BaseWidget from './BaseWidget.js';


class AmountWidget extends BaseWidget {
  constructor(element) {
    super(element, settings.amountWidget.defaultValue);

    const thisWidget = this;

    thisWidget.getElements(element);
    
    thisWidget.initActions();

    //console.log('AmountWidget:', thisWidget);
    //console.log('constructor arguments:', element);
  }

  getElements(){
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
  }

  isValid(value){
    return !isNaN(value)
      && value >= settings.amountWidget.defaultMin 
      && value <= settings.amountWidget.defaultMax;
  }

  /*setValue(value){
    const thisWidget = this;

    const newValue = parseInt(value);

    //console.log(thisWidget.value, value, newValue, isNaN(newValue));
 
    if( thisWidget.value !== newValue && !isNaN(newValue) && value >= settings.amountWidget.defaultMin && value <= settings.amountWidget.defaultMax){
      thisWidget.value = newValue;
      thisWidget.dom.input.value = thisWidget.value;
      thisWidget.announce();
    } else {
      thisWidget.dom.input.value = thisWidget.value;
    }
  }*/

  renderValue(){
    const thisWidget = this;

    thisWidget.dom.input.value = thisWidget.value;
  }

  initActions(){
    const thisWidget = this;

    thisWidget.dom.input.addEventListener('change', function(){
      //thisWidget.setValue(thisWidget.dom.input.value);

      thisWidget.value=thisWidget.dom.input.value;
    });

    thisWidget.dom.linkDecrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
    });

    thisWidget.dom.linkIncrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value +1);
    });
  }

}

export default AmountWidget;