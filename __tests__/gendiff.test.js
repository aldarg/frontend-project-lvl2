import { readFileSync } from 'fs';
import gendiff from '../src';

const path = '__tests__/__fixtures__/';

test('gendiff-json', () => {
  const result = readFileSync(`${path}result.from_json.txt`, 'utf8');
  expect(gendiff(`${path}json/before.json`, `${path}json/after.json`)).toBe(result);
});

test('gendiff-yaml', () => {
  const result = readFileSync(`${path}result.from_yml.txt`, 'utf8');
  expect(gendiff(`${path}yml/before.yml`, `${path}yml/after.yml`)).toBe(result);
});

test('gendiff-json-plain', () => {
  const result = readFileSync(`${path}result.from_json.to_plain.txt`, 'utf8');
  expect(gendiff(`${path}json/before.json`, `${path}json/after.json`, 'plain')).toBe(result);
});

test('gendiff-json-json', () => {
  const result = readFileSync(`${path}result.from_json.to_json.txt`, 'utf8');
  expect(gendiff(`${path}json/before.json`, `${path}json/after.json`, 'json')).toBe(result);
});
