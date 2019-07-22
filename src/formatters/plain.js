import _ from 'lodash';

const getLines = (node, keyPrefix = '') => {
  const {
    type,
    key,
    children,
    data,
  } = node;

  if (type === 'group') {
    return children.map(childNode => getLines(childNode, `${keyPrefix}${key}.`));
  }

  if (type === 'unchanged') {
    return `Property '${keyPrefix}${key}' was unchanged`;
  }

  if (type === 'added') {
    const value = (typeof data[0] === 'object') ? '[complex object]' : data[0];

    return `Property '${keyPrefix}${key}' was added with value: ${value}`;
  }

  if (type === 'deleted') {
    return `Property '${keyPrefix}${key}' was removed`;
  }

  const valueBefore = (typeof data[0] === 'object') ? '[complex object]' : data[0];
  const valueAfter = (typeof data[1] === 'object') ? '[complex object]' : data[1];

  return `Property '${keyPrefix}${key}' was updated. From ${valueBefore} to ${valueAfter}`;
};

export default (ast) => {
  const differences = ast.map(node => getLines(node));
  return _.flattenDeep(differences).join('\n');
};
