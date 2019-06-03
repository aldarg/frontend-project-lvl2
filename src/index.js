import _ from 'lodash';
import getConfig from './parsers';

export default (firstConfigFilePath, secondConfigFilePath) => {
  const firstConfig = getConfig(firstConfigFilePath);
  const secondConfig = getConfig(secondConfigFilePath);

  const getDiffString = (key) => {
    const hasFirstConfig = _.has(firstConfig, key);
    const hasSecondConfig = _.has(secondConfig, key);

    if (hasFirstConfig && !hasSecondConfig) {
      return `  - ${key}: ${firstConfig[key]}`;
    }

    if (!hasFirstConfig && hasSecondConfig) {
      return `  + ${key}: ${secondConfig[key]}`;
    }

    if (secondConfig[key] !== firstConfig[key]) {
      const diffPlus = `  + ${key}: ${secondConfig[key]}`;
      const diffMinus = `  - ${key}: ${firstConfig[key]}`;

      return `${diffPlus}\n${diffMinus}`;
    }

    return `    ${key}: ${firstConfig[key]}`;
  };

  const mergedConfig = { ...firstConfig, ...secondConfig };

  const differences = Object.entries(mergedConfig).map(entry => getDiffString(entry[0]));
  differences.unshift('{');
  differences.push('}');

  return differences.join('\n');
};
