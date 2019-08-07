import _ from 'lodash';

const stringify = (tab, sign, key, value) => {
  if (typeof value !== 'object') {
    return `${tab}${sign} ${key}: ${value}`;
  }

  const head = `${tab}${sign} ${key}: {`;
  const tail = `  ${tab}}`;

  const entries = Object.entries(value);
  const body = entries.reduce((acc, [entryKey, entryValue]) => {
    acc.push(`      ${tab}${entryKey}: ${entryValue}`);

    return acc;
  }, []);

  return _.concat(head, body, tail);
};

const getLine = {
  group: (tab, key, node, func, depth) => [`  ${tab}${key}: {`, func(node.children, depth + 1), `  ${tab}}`],
  unchanged: (tab, key, node) => `  ${tab}${key}: ${node.value}`,
  added: (tab, key, node) => stringify(tab, '+', key, node.value),
  deleted: (tab, key, node) => stringify(tab, '-', key, node.value),
  changed: (tab, key, node) => [stringify(tab, '-', key, node.valueBefore), stringify(tab, '+', key, node.valueAfter)],
};

const getLines = (ast, depth = 0) => {
  const lines = ast.reduce((acc, node) => {
    const {
      type,
      key,
    } = node;

    const tab = ' '.repeat(depth * 4 + 2);
    acc.push(getLine[type](tab, key, node, getLines, depth));

    return acc;
  }, []);

  const result = (depth === 0) ? _.concat('{', lines, '}') : lines;

  return result;
};

export default ast => _.flattenDeep(getLines(ast)).join('\n');
