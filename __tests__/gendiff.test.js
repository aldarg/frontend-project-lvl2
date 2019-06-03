import { readFileSync } from 'fs';
import gendiff from '../src';

const path = '__tests__/__fixtures__/';

test('gendiff-json', () => {
  const result = readFileSync(`${path}result.txt`, 'utf8');
  expect(gendiff(`${path}json/before.json`, `${path}json/after.json`, 'test3')).toBe(result);
});

test('gendiff-yaml', () => {
  const result = readFileSync(`${path}result.txt`, 'utf8');
  expect(gendiff(`${path}yml/before.yml`, `${path}yml/after.yml`, 'test3')).toBe(result);
});

test('gendiff-ini', () => {
  const result = readFileSync(`${path}result.txt`, 'utf8');
  expect(gendiff(`${path}ini/before.ini`, `${path}ini/after.ini`, 'test3')).toBe(result);
});
