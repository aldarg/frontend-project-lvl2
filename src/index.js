import _ from 'lodash';
import readFile from './utils/file-reader';
import parseConfig from './parsers';
import render from './renderers';

const unionKeys = (obj1, obj2) => Object.keys({ ...obj1, ...obj2 });

const makeDiffAst = (configBefore, configAfter) => {
  const keys = unionKeys(configBefore, configAfter);

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

    if (!_.has(configBefore, key)) {
      return {
        type: 'added', key, data: [valueAfter],
      };
    }

    if (!_.has(configAfter, key)) {
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
  const configBefore = readFile(configBeforeFilePath);
  const configAfter = readFile(configAfterFilePath);

  const dataBefore = parseConfig(configBefore.data, configBefore.type);
  const dataAfter = parseConfig(configAfter.data, configAfter.type);

  const ast = makeDiffAst(dataBefore, dataAfter);

  return render(ast, format);
};
