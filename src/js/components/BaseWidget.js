class BaseWidget {  // ma być samodzielna więc będzie korzystaćtylko z metod w niej zawartych
  constructor(wrapperElement, initialValue){
    const thisWidget = this;
    
    thisWidget.dom = {};
    thisWidget.dom.wrapper = wrapperElement;

    thisWidget.correctValue = initialValue; // zmieniamy na value żeby odpalił się poprawnie setter set value
  }

  get value() {   // getter sprawdza jaka jest wartość, metoda wykonywana przy każdej próbie odczytania wartości właściwości value
    const thisWidget = this;

    return thisWidget.correctValue;
  }

  set value(value) { // setter wpisuje nową wartość, metoda wykonywana przy każdej próbie ustawienia nowej wartości właściwości value

    const thisWidget = this;

    const newValue = thisWidget.parseValue(value); // parseValue jest metodą thisWidget


    /* TODO: Add validation */  // != różni się
    if (newValue != thisWidget.correctValue && thisWidget.isValid(newValue)) {
      thisWidget.correctValue = newValue;
    }
    thisWidget.renderValue();
    thisWidget.announce();
  }

  setValue(value) {   // zawsze ważniejsze jest klasa pochodna - to stamtąd jest uruchamiana metoda jeśli są takie same nazwy, jeśli chcemy ją zatrzymaćwpisujemy pustą metodę
    const thisWidget = this;

    thisWidget.value = value; // zadziała setter jeśli wartość jest poprawna, takie zabezpieczenie
  }

  parseValue(value) { // skasujemy parseValue w klasie AmountWidget bo tu jest identyczna

    return parseInt(value);
  }


  isValid(value) {    // isValid zostaje w obu klasach bo się różnią

    return !isNaN(value);  // jeśli value jest tekstem to isNaN jest prawdziwa
  }

  renderValue() { // bieżąca wartość widgetu będzie wyświetlona na stronie
    const thisWidget = this;

    thisWidget.dom.wrapper.innerHTML = thisWidget.value; // zmieniamy na wrapper bo nie wiadomo czy będzie input czy nie
  }

  announce() {    // przenosimy z AmountWidget bo nie ma specyficznych informacji dla widgetu ilości, jest uniwersalna
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true
    });
    thisWidget.dom.wrapper.dispatchEvent(event);
  }
}

export default BaseWidget;