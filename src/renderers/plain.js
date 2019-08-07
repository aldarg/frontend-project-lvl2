import _ from 'lodash';

const stringify = value => ((typeof value === 'object') ? '[complex object]' : value);

const getLine = {
  group: (pathedKey, node, func) => node.children.map(childNode => func(childNode, `${pathedKey}.`)),
  unchanged: pathedKey => `Property '${pathedKey}' was unchanged`,
  added: (pathedKey, node) => `Property '${pathedKey}' was added with value: ${stringify(node.value)}`,
  deleted: pathedKey => `Property '${pathedKey}' was removed`,
  changed: (pathedKey, node) => `Property '${pathedKey}' was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`,
};

const getLines = (node, keyPrefix = '') => {
  const {
    type,
    key,
  } = node;

  return getLine[type](`${keyPrefix}${key}`, node, getLines);
};

export default (ast) => {
  const differences = ast.map(node => getLines(node));

  return _.flattenDeep(differences).join('\n');
};
