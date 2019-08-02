import { safeLoad } from 'js-yaml';
import { decode } from 'ini';

const parser = {
  yml: safeLoad,
  json: JSON.parse,
  ini: decode,
};

export default (data, format) => parser[format](data);
