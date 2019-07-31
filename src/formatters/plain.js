import _ from 'lodash';

const getLines = (node, keyPrefix = '') => {
  const {
    type,
    key,
    children,
    data,
  } = node;

  const pathedKey = `${keyPrefix}${key}`;

  if (type === 'group') {
    return children.map(childNode => getLines(childNode, `${pathedKey}.`));
  }

  if (type === 'unchanged') {
    return `Property '${pathedKey}' was unchanged`;
  }

  if (type === 'added') {
    const value = (typeof data[0] === 'object') ? '[complex object]' : data[0];

    return `Property '${pathedKey}' was added with value: ${value}`;
  }

  if (type === 'deleted') {
    return `Property '${pathedKey}' was removed`;
  }

  const valueBefore = (typeof data[0] === 'object') ? '[complex object]' : data[0];
  const valueAfter = (typeof data[1] === 'object') ? '[complex object]' : data[1];

  return `Property '${pathedKey}' was updated. From ${valueBefore} to ${valueAfter}`;
};

export default (ast) => {
  const differences = ast.map(node => getLines(node));
  return _.flattenDeep(differences).join('\n');
};
