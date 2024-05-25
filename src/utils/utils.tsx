function dateToMUI(dateString: string) {
  if (dateString) {
    return dateString.split('.').reverse().join('-');
  };
};

function MUIToDate(MUIString: string) {
  if (MUIString) {
    return MUIString.split('-').reverse().join('.');
  }
}

export { dateToMUI, MUIToDate }
