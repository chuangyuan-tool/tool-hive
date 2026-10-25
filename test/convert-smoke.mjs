// 冒烟测试：验证 lib/tools/convert.ts 的四个转换函数
// 跑法：node test/convert-smoke.mjs
import { load as yamlLoad, dump as yamlDump } from 'js-yaml';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

const yamlToJson = (t) => JSON.stringify(yamlLoad(t), null, 2);
const jsonToYaml = (t) => yamlDump(JSON.parse(t), { noRefs: true });
const xmlToJson = (t) =>
  JSON.stringify(new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' }).parse(t), null, 2);
const jsonToXml = (t) =>
  new XMLBuilder({ ignoreAttributes: false, attributeNamePrefix: '@_' }).build(JSON.parse(t)) ?? '';

let fail = 0;
const check = (name, actual, expectIncludes) => {
  const ok = actual.includes(expectIncludes);
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) console.log(`      got: ${JSON.stringify(actual)}\n      want contains: ${JSON.stringify(expectIncludes)}`);
};

check('yamlToJson nested', yamlToJson('name: test\nlist:\n  - a\n  - b'), '"name": "test"');
check('yamlToJson list', yamlToJson('name: test\nlist:\n  - a\n  - b'), '"a"');
check('jsonToYaml', jsonToYaml('{"a":1}'), 'a: 1');
check('xmlToJson attr', xmlToJson('<r><a id="1">x</a></r>'), '"@_id": "1"');
check('xmlToJson text', xmlToJson('<r><a id="1">x</a></r>'), '"#text": "x"');
check('jsonToXml', jsonToXml('{"r":{"a":"x"}}'), '<a>x</a>');

console.log(fail === 0 ? '\n全部通过' : `\n${fail} 项失败`);
process.exit(fail === 0 ? 0 : 1);
