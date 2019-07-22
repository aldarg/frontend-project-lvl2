import renderPlain from './formatters/plain';
import renderCommon from './formatters/common';

const formatter = {
  plain: renderPlain,
  common: renderCommon,
};

const render = (ast, format) => formatter[format](ast);

export default render;
