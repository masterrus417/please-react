function dateToMUI(dateString) {
  if (dateString) {
    return dateString.split('.').reverse().join('-');
  };
};

export { dateToMUI }
