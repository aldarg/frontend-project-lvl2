import _ from 'lodash';

const stringify = (tab, sign, key, value) => {
  if (typeof value === 'object') {
    const head = `${tab}${sign} ${key}: {`;
    const tail = `  ${tab}}`;

    const entries = Object.entries(value);
    const result = entries.reduce((acc, [entryKey, entryValue]) => {
      acc.push(`      ${tab}${entryKey}: ${entryValue}`);

      return acc;
    }, []);

    return _.concat(head, result, tail);
  }

  return `${tab}${sign} ${key}: ${value}`;
};

const getLines = (ast, depth = 0) => {
  const lines = ast.reduce((acc, node) => {
    const {
      type,
      key,
      children,
      data,
    } = node;

    const tab = ' '.repeat(depth * 4 + 2);

    if (type === 'group') {
      const newDepth = depth + 1;

      acc.push(`  ${tab}${key}: {`);
      acc.push(getLines(children, newDepth));
      acc.push(`  ${tab}}`);

      return acc;
    }

    if (type === 'unchanged') {
      acc.push(`  ${tab}${key}: ${data[0]}`);
      return acc;
    }

    if (type === 'added') {
      acc.push(stringify(tab, '+', key, data[0]));
      return acc;
    }

    if (type === 'deleted') {
      acc.push(stringify(tab, '-', key, data[0]));
      return acc;
    }

    acc.push(stringify(tab, '-', key, data[0]));
    acc.push(stringify(tab, '+', key, data[1]));
    return acc;
  }, []);

  const result = (depth === 0) ? _.concat('{', lines, '}') : lines;

  return result;
};

export default (ast) => {
  const differences = getLines(ast);

  return _.flattenDeep(differences).join('\n');
};
