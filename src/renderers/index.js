import rendererPlain from './plain';
import rendererVisual from './visual';
import rendererJson from './json';

const renderer = {
  plain: rendererPlain,
  default: rendererVisual,
  json: rendererJson,
};

export default (ast, format) => renderer[format](ast);
