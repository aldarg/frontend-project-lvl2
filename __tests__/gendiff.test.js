import { readFileSync } from 'fs';
import gendiff from '../src';

test('gendiff relative path', () => {
  const result = readFileSync('./__tests__/__fixtures__/result.txt', 'utf8');
  expect(gendiff('before.json', 'after.json', 'test3')).toBe(result);
});

test('gendiff absolute path', () => {
  const result = readFileSync('./__tests__/__fixtures__/result.txt', 'utf8');
  expect(gendiff('/home/alex/projects/gendiff/before.json', '/home/alex/projects/gendiff/after.json', 'test3')).toBe(result);
});
