import _ from 'lodash';

const renderAst = (node, path = '') => {
  const {
    type,
    key,
    children,
    data,
  } = node;

  const newPath = `${path}${key}`;

  if (type === 'group') {
    return children.map(childNode => renderAst(childNode, `${newPath}.`));
  }

  const jsonNode = {
    node: newPath,
    status: type,
    oldValue: '',
    newValue: '',
  };

  if (type === 'added') {
    [jsonNode.newValue] = data;
  }

  if (type === 'changed') {
    [jsonNode.oldValue, jsonNode.newValue] = data;
  }
  return jsonNode;
};

export default (ast) => {
  const result = ast.map(node => renderAst(node));

  return JSON.stringify(_.flattenDeep(result));
};
