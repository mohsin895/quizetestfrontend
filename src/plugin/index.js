// plugins/momentPlugin.js
import moment from 'moment';

export default {
  install(app) {
    app.config.globalProperties.$filters = {
      formatDate(value) {
        return value ? moment(String(value)).format("DD/MM/YYYY") : '';
      },
      formatDateWithDay(value) {
        return value ? moment(String(value)).format("ddd, MMMM Do YYYY") : '';
      },
      formatDateWithDayTime(value) {
        return value ? moment(String(value)).format("MMMM Do YYYY hh:mm A") : '';
      },
      formatDateWithDayMonth(value) {
        return value ? moment(String(value)).format("Do MMM YYYY ") : '';
      },
      formatDateTime(value) {
        return value ? moment(String(value)).format("DD/MM/YYYY hh:mm A") : '';
      },
      formatTime(value) {
        return value ? moment(String(value)).format("'hh:mm:ss A") : '';
      },
      formatYear(value) {
        return value ? moment(String(value)).format("YYYY") : '';
      },
      formatDay(value) {
        return value ? moment(String(value)).format("EEE") : '';
      },
      formatMonth(value) {
        return value ? moment(String(value)).format("MMMM") : '';
      },
      formatDateWithMonth(value) {
        return value ? moment(String(value)).format("Do MMM  ") : '';
      },
      formatDateWithYear(value) {
        return value ? moment(String(value)).format(" MMMM Do YYYY") : '';
      },
    };
  },
};
