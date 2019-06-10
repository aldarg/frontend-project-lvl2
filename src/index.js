import getConfig from './parsers';
import render from './renderers';

const parseConfigs = (configBefore, configAfter) => {
  const mergedConfig = { ...configBefore, ...configAfter };

  const keys = Object.keys(mergedConfig);
  const result = keys.map((key) => {
    const valueBefore = configBefore[key];
    const valueAfter = configAfter[key];

    if (typeof valueBefore === 'object' && typeof valueAfter === 'object') {
      return {
        type: 'group', key, children: parseConfigs(valueBefore, valueAfter),
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

  return result;
};

export default (firstConfigFilePath, secondConfigFilePath) => {
  const configBefore = getConfig(firstConfigFilePath);
  const configAfter = getConfig(secondConfigFilePath);

  const ast = parseConfigs(configBefore, configAfter);

  return render(ast);
};
