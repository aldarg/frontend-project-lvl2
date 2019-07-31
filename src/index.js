import parseConfig from './parsers';
import render from './renderers';

const makeDiffAst = (configBefore, configAfter) => {
  const mergedConfig = { ...configBefore, ...configAfter };

  const keys = Object.keys(mergedConfig);
  const ast = keys.map((key) => {
    const valueBefore = configBefore[key];
    const valueAfter = configAfter[key];

    if (typeof valueBefore === 'object' && typeof valueAfter === 'object') {
      return {
        type: 'group', key, children: makeDiffAst(valueBefore, valueAfter),
      };
    }

    if (valueBefore === valueAfter) {
      return {
        type: 'unchanged', key, data: [valueBefore],
      };
    }

    if (valueBefore === undefined) {
      return {
        type: 'added', key, data: [valueAfter],
      };
    }

    if (valueAfter === undefined) {
      return {
        type: 'deleted', key, data: [valueBefore],
      };
    }

    return {
      type: 'changed', key, data: [valueBefore, valueAfter],
    };
  });

  return ast;
};

export default (configBeforeFilePath, configAfterFilePath, format = 'default') => {
  const configBefore = parseConfig(configBeforeFilePath);
  const configAfter = parseConfig(configAfterFilePath);

  const ast = makeDiffAst(configBefore, configAfter);

  return render(ast, format);
};
