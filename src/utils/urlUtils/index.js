import { URL_PATH, URL_KEY, SYSTEM_PATH_PREFIX } from '@/utils/constants';
import { isProduction } from '@/utils/helpers';
import Fetch from '../fetch';

export const getIPaddress = (serverItem, developeMode) => {
  let ipAddress;
  const location = window.location.protocol;
  const type = serverItem.Type;
  if (developeMode) {
    ipAddress = serverItem.Address;
  } else {
    let protocol =
      type === 'api' ? location : location === 'http:' ? 'ws:' : 'wss:';
    ipAddress = `${protocol}//${window.location.host}${SYSTEM_PATH_PREFIX}${serverItem.Address}`;
  }
  return ipAddress;
};

export const convertUrlList = (json) => {
  let result = {};
  for (let key in json) {
    if (!json.hasOwnProperty(key)) return;

    let serverItem = json[key];
    let path = serverItem.Path;
    let ipAddress = getIPaddress(serverItem, !isProduction());

    path = path.startsWith('/') ? path.substring(1, path.length) : path;
    path = path.endsWith('/') ? path.substring(0, path.length - 1) : path;
    let template = `${ipAddress}/${path}`;

    for (let subKey in serverItem.URL) {
      if (!serverItem.URL.hasOwnProperty(subKey)) return;

      let url = serverItem.URL[subKey];
      url = url.startsWith('/') ? url.substring(1, url.length) : url;
      result[subKey] = url ? template + '/' + url : template;
    }
  }

  return result;
};

const getUrl = async (urlProvider = convertUrlList) => {
  let data = sessionStorage.getItem(URL_KEY);
  if (data) {
    return Promise.resolve(JSON.parse(data));
  }

  let urls = await Fetch.get(URL_PATH);
  let newUrls = urlProvider(urls);
  sessionStorage.setItem(URL_KEY, JSON.stringify(newUrls));
  return Promise.resolve(newUrls);
};

export default getUrl;
