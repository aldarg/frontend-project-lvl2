import { extname } from 'path';
import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import { decode } from 'ini';

const parser = {
  yml: safeLoad,
  json: JSON.parse,
  ini: decode,
};

export default (filePath) => {
  const fileExtension = extname(filePath).replace('.', '');
  const content = readFileSync(filePath, 'utf-8');

  return parser[fileExtension](content);
};
