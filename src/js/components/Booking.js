import { select, templates, settings, classNames } from '../settings.js';
import AmountWidget from './AmountWidget.js';
/*import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js'; */
import { utils } from '../utils.js';

class Booking {
  constructor(element) {
    const thisBooking = this;

    thisBooking.selectedTable;
    thisBooking.render(element);
    thisBooking.initWidgets();