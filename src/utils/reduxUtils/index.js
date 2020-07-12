export const SUCCESS = 'SECCESS';
export const REQUEST = 'REQUEST';
export const FAILURE = 'FAILURE';

export const createAction = (type, payload = {}) => ({
  type,
  ...payload
});

export const createReducer = (initialState = {}, handlers) => {
  return function reducer(state = initialState, action) {
    return handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state;
  };
};

export const createRequestType = (base) => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
};
