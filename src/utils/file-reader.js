import { extname } from 'path';
import { readFileSync } from 'fs';

export default (filePath) => {
  const fileExtension = extname(filePath).replace('.', '');
  const fileContent = readFileSync(filePath, 'utf-8');

  return { type: fileExtension, data: fileContent };
};
