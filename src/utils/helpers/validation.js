import { useState, useEffect } from 'react';
import { isNumeric, isEmptyObject, isValidNric, isValidEmail } from './index';

const validateValue = (type, value) => {
  let result = true;
  switch (type) {
    case 'string':
      result = !!value; //convert into bool
      break;
    case 'number':
      result = isNumeric(value);
      break;
    case 'email':
      result = isValidEmail(value);
      break;
    case 'object':
      result = !isEmptyObject(value);
      break;
    case 'nric':
      result = isValidNric(value || '');
      break;
    case 'numberOfArray':
      /**
       * value sample: "123,1345,1345"
       */
      const vals = (value || '').split(',');
      result = vals.every((val) => isNumeric(val));
      break;
    default:
      result = false;
      break;
  }
  return result;
};

const operatorMap = { AND: 'every', OR: 'some' };
/**
 *
 * @export
 * @param {*} [values={}] an object of all values that need to be validated
 * @param {*} [list=[]] validation pending list, all must pass the validation
 * @param {*} [validateMap={}] map for validation, must contain type
 * @returns true if all values are valid
 */
export function useValidate(values = {}, list = [], validateMap = {}) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validation = list.every((item) => {
      let result = true,
        operator = validateMap[item]?.operator || '',
        conditions = validateMap[item]?.conditions || '';
      if (operator && Array.isArray(conditions)) {
        //when multiple condtions and operator
        if (operator === 'AND' || operator === 'OR') {
          result = conditions[operatorMap[operator]]((it) => {
            const vals = it.valueKeys
              ? it.valueKeys.map((v) => values[v])
              : values[item];
            return validateValue(it.type, vals);
          });
        }
      } else {
        const valueKeys = validateMap[item]?.valueKeys,
          vals = valueKeys ? valueKeys.map((v) => values[v]) : values[item];
        result = validateValue(validateMap[item].type, vals);
      }
      return result;
    });
    setIsValid(validation);
  }, [values, list, validateMap]);

  return isValid;
}

export function usePartialValidate(values = {}, validateMap = {}) {
  /*store validate list that need to be checked  */
  const [validationList, setValidationList] = useState([]);
  /* store validation result */
  const [validation, setValidation] = useState({});

  const onValidate = () => {
    let result = {};
    validationList.forEach((item) => {
      const validationItem = validateMap[item];
      let isValid = true,
        operator = validateMap[item]?.operator || '',
        conditions = validateMap[item]?.conditions || '',
        message = '';
      if (operator && Array.isArray(conditions)) {
        if (operator === 'AND' || operator === 'OR') {
          isValid = conditions[operatorMap[operator]]((it) => {
            const vals = it.valueKeys
              ? it.valueKeys.map((v) => values[v])
              : values[item];
            const valid = validateValue(it.type, vals);
            message = !valid ? it.message : '';
            return valid;
          });
        }
      } else {
        const valueKeys = validateMap[item]?.valueKeys,
          vals = valueKeys ? valueKeys.map((v) => values[v]) : values[item];
        isValid = validateValue(validateMap[item].type, vals);
        message = !isValid ? validationItem.message : '';
      }
      result[item] = { isInValid: !isValid, message };
    });
    setValidation(result);
  };

  return { validation, setValidationList, onValidate };
}
