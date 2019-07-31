import rendererPlain from './formatters/plain';
import rendererDefault from './formatters/default';
import rendererJson from './formatters/json';

const formatter = {
  plain: rendererPlain,
  default: rendererDefault,
  json: rendererJson,
};

const render = (ast, format) => formatter[format](ast);

export default render;
