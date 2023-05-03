module.exports = (date) => {
  const newDate = new Date(date);

  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};
