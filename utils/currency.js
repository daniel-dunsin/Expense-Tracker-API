/**
 * Helps to convert currencies, these are the rates at the time of the development of this project
 */

module.exports.convertCurrency = (from, to, amount) => {
  // NAIRA TO OTHER CURRENCIES
  if (from === 'NGN') {
    if (to === 'CAD') {
      return amount * 0.0029;
    } else if (to === 'EUR') {
      return amount * 0.002;
    } else if (to === 'USD') {
      return amount * 0.0022;
    }
  }

  //   USD TO OTHER CURRENCIES
  if (from === 'USD') {
    if (to === 'NGN') {
      return amount * 462.5;
    } else if (to === 'CAD') {
      return amount * 1.36;
    } else if (to === 'EUR') {
      return amount * 0.91;
    }
  }

  //   EUR TO OTHER CURRENCIES
  if (from === 'EUR') {
    if (to === 'USD') {
      return amount * 1.1;
    } else if (to === 'NGN') {
      return amount * 508.7;
    } else if (to === 'CAD') {
      return amount * 1.5;
    }
  }

  //   CAD TO OTHER CURRENCIES
  if (from === 'CAD') {
    if (to === 'EUR') {
      return amount * 0.67;
    } else if (to === 'NGN') {
      return amount * 339.5;
    } else if (to === 'USD') {
      return amount * 0.73;
    }
  }
};
