import { extname } from 'path';
import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';

const parser = {
  yml: safeLoad,
  json: JSON.parse,
};

export default (filePath) => {
  const fileExtension = extname(filePath).replace('.', '');
  const content = readFileSync(filePath, 'utf-8');

  return parser[fileExtension](content);
};
