// import countries from 'static/assets/mocks/countries.json';

export const isProduction = () =>
  process.env.NODE_ENV === 'production' &&
  process.env.GATSBY_STAGING_ENV !== 'true';

export const isServer = () =>
  typeof window === 'undefined' || typeof document === 'undefined';

export const isDevelop = () =>
  typeof window !== 'undefined' && !isProduction() && !isServer();

// export const getCountryCode = () => {
//   return countries.map((item) => {
//     const text = item.dial_code + '(' + item.name + ')';
//     const value = item.dial_code;
//     return { text, value };
//   });
// };

export const isNumeric = (input) => {
  return input && !isNaN(input);
};

export const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

/**
 * check whether api responce is successful
 *
 * @param {*} data only suitable for below responce format
 * {
 * "status": {
 *   "error": "",
 *   "code": "000000",
 *   "message": "success"
 * },
 * "data": ""
 * }
 * @returns true
 */
export const responceCheck = (data) => {
  if (data?.status?.code === '000000') {
    return true;
  } else {
    throw new Error(data?.status?.message || data?.message || data);
  }
};

export const isEmptyObject = (obj) => {
  for (let key in obj) {
    return !key;
  }
  return true;
};

//get selected item index by its value
export const getSelectedIndex = (list, value) => {
  if (value) {
    const index = list.findIndex((item) => item.value === value);
    return index > -1 ? index : undefined;
  }
  return undefined;
};

export const OnDownLoadCSV = (data, filename) => {
  const file = new Blob([data], { type: 'text/csv' });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Other browsers
    const a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  }
};

export function isValidPassword(password /* :string */) /* :boolean */ {
  let exp = /^.{8,14}$/;
  return exp.test(password);
}

export const debounce = (fn, delay) => {
  let timer;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timer);

    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

export const longDateFormat = (inputDate) => {
  return new Date(inputDate).getTime();
};

/**
 * Returns true if the email entered is valid
 *
 */
export function isValidEmail(email /* :string */) /* :boolean */ {
  let exp = new RegExp(
    [
      '^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(\\".+"))@',
      '(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$'
    ].join(''),
    'i'
  );
  return exp.test(email);
}

/**
 * Returns true for valid Singapore mobile and land line numbers
 *
 */
export function isValidMobileLandNumber(phone /* :string */) /* :boolean */ {
  let exp = /^[689][0-9]{7}$/;
  return exp.test(phone);
}

/**
 * Returns true for valid Singapore mobile numbers
 *
 */
export function isValidMobileNumber(phone /* :string */) /* :boolean */ {
  let exp = /^[89][0-9]{7}$/;
  return exp.test(phone);
}

/**
 * Returns true for string is alpha with white spaces
 *
 */
export function isValidAlphaWithSpace(str /* :string */) /* :boolean */ {
  return /^[a-zA-Z\s]+$/.test(str);
}

/**
 * Returns true if string is a valid NRIC
 *
 */
export function isValidNric(str /* :string */) /* :boolean */ {
  if (str.length !== 9) {
    return false;
  }

  str = str.toUpperCase();

  var icArray = [];

  for (var i = 0; i < 9; i++) {
    icArray[i] = str.charAt(i);
  }

  icArray[1] = parseInt(icArray[1], 10) * 2;
  icArray[2] = parseInt(icArray[2], 10) * 7;
  icArray[3] = parseInt(icArray[3], 10) * 6;
  icArray[4] = parseInt(icArray[4], 10) * 5;
  icArray[5] = parseInt(icArray[5], 10) * 4;
  icArray[6] = parseInt(icArray[6], 10) * 3;
  icArray[7] = parseInt(icArray[7], 10) * 2;

  var weight = 0;
  for (i = 1; i < 8; i++) {
    weight += parseInt(icArray[i], 10);
  }

  var offset = icArray[0] === 'T' || icArray[0] === 'G' ? 4 : 0;
  var temp = (offset + weight) % 11;

  var st = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
  var fg = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];

  var theAlpha;

  if (icArray[0] === 'S' || icArray[0] === 'T') {
    theAlpha = st[temp];
  } else if (icArray[0] === 'F' || icArray[0] === 'G') {
    theAlpha = fg[temp];
  }

  return icArray[8] === theAlpha;
}
