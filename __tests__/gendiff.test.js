import { readFileSync } from 'fs';
import gendiff from '../src';

const path = '__tests__/__fixtures__/';

test('gendiff-json', () => {
  const result = readFileSync(`${path}result.txt`, 'utf8');
  expect(gendiff(`${path}before.json`, `${path}after.json`, 'test3')).toBe(result);
});

test('gendiff-yaml', () => {
  const result = readFileSync(`${path}result.txt`, 'utf8');
  expect(gendiff(`${path}before.yml`, `${path}/after.yml`, 'test3')).toBe(result);
});
