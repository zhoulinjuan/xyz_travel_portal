import 'whatwg-fetch';

const IsJsonString = function (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const fetchApi = function (url, option) {
  return fetch(url, option)
    .then((res) => res.text())
    .then((text) => {
      let res = IsJsonString(text) ? JSON.parse(text) : text;
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const getCustomHeader = function (userId) {
  let result = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    user_token: userId
  };

  Object.keys(result).forEach(
    (key) => result[key] === undefined && delete result[key]
  );
  return result;
};

const option = {
  mode: 'cors',
  cache: 'default'
};

/**
 * Call server API/JSON based on HTTP GET
 * @example
 * import Fetch from 'core/v2/fetch';
 * Fetch.get('http://api/user/profile').then(user=>console.log(user)).catch(err=>throw err);
 *
 * @param {string} url
 * @returns Promise
 */
function get(url, fileHeader, header) {
  let op = Object.assign(
    {},
    option,
    {
      method: 'GET',
      headers: getCustomHeader(header)
    },
    fileHeader
  );
  return fetchApi(url, op);
}

/**
 * Call server API based on HTTP POST
 * @example
 * import Fetch from './fetch';
 * Fetch.post('http://api/user/login', {user:'hello', password:'pass'})
 *      .then(status=>console.log(user)).catch(err=>throw err);
 *
 * @param {string} url
 * @param {object} pd
 * @returns Promise
 */
function post(url, pd, hd = {}) {
  let op = Object.assign({}, option, {
    method: 'POST',
    body: typeof pd === 'string' ? pd : JSON.stringify(pd),
    headers: getCustomHeader(hd)
  });

  return fetchApi(url, op);
}

/**
 * Call server API based on HTTP POST
 * @example
 * import Fetch from './fetch';
 * Fetch.post('http://api/user/login', {user:'hello', password:'pass'})
 *      .then(status=>console.log(user)).catch(err=>throw err);
 *
 * @param {string} url
 * @param {object} pd
 * @returns Promise
 */
function postPlainBody(url, pd, hd = {}) {
  let op = Object.assign({}, option, {
    method: 'POST',
    body: pd,
    headers: getCustomHeader(hd)
  });

  return fetchApi(url, op);
}

/**
 * Call server API based on HTTP PUB
 * @example
 * import Fetch from './fetch';
 * Fetch.put('http://api/user/changePassword', {
 *     newPassword:'hello',
 *     olbPassword:'pass',
 *     confirmPassword:'pass'
 * }).then(status=>console.log(user)).catch(err=>throw err);
 *
 * @param {string} url
 * @param {object} pd
 * @returns Promise
 */
function put(url, pd = {}) {
  let op = Object.assign({}, option, {
    method: 'PUT',
    body: JSON.stringify(pd),
    headers: getCustomHeader()
  });

  return fetchApi(url, op);
}

/**
 * Call server API based on HTTP DELETE
 * @example
 * import Fetch from './fetch';
 * Fetch.del('http://api/user/remove/userid').then(status=>console.log(status)).catch(err=>throw err);
 *
 * @param {string} url
 * @returns Promise
 */
function del(url, pd = {}) {
  let op = Object.assign({}, option, {
    method: 'DELETE',
    body: JSON.stringify(pd),
    headers: getCustomHeader()
  });

  return fetchApi(url, op);
}

export default {
  get,
  post,
  postPlainBody,
  put,
  del
};
