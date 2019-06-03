import { readFileSync } from 'fs';
import gendiff from '../src';

test('gendiff', () => {
  const result = readFileSync('./__tests__/__fixtures__/result.txt', 'utf8');
  expect(gendiff('before.json', 'after.json', 'test3')).toBe(result);
});
