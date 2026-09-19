import { formatJSON, minifyJSON, validateJSON, generateTypeScriptTypes } from '../lib/tools/json.ts';
import { generatePassword, passwordStrength, crackTimeEstimate } from '../lib/tools/password.ts';
import { encodeBase64, decodeBase64 } from '../lib/tools/base64.ts';
import { hexToRgb, contrastRatio, complement } from '../lib/tools/color.ts';
import { csvToJson, jsonToCsv } from '../lib/tools/csv.ts';

const NL = String.fromCharCode(10);
let failed = 0;
function check(name: string, cond: boolean) {
  if (cond) { console.log('PASS ' + name); } else { failed++; console.log('FAIL ' + name); }
}

check('json format', formatJSON('{"a":1}') === '{' + NL + '  "a": 1' + NL + '}');
check('json minify', minifyJSON('{ "a" : 1 }') === '{"a":1}');
check('json valid', validateJSON('[1,2]').valid === true);
check('json invalid', validateJSON('{bad}').valid === false);
check('json types', generateTypeScriptTypes('[{"id":1,"name":"x"}]').indexOf('id: number;') !== -1);

const pw = generatePassword({ length: 16, uppercase: true, lowercase: true, numbers: true, symbols: true });
check('password length', pw.length === 16);
check('password strong', passwordStrength('Abcdef12!@#').score >= 4);
check('password weak', passwordStrength('aaa').score < 3);
check('crack time', typeof crackTimeEstimate('Ab1!') === 'string');

check('b64 encode', encodeBase64('hello') === 'aGVsbG8=');
check('b64 roundtrip', decodeBase64(encodeBase64('test 123')) === 'test 123');
check('b64 unicode roundtrip', decodeBase64(encodeBase64('café 你好')) === 'café 你好');

check('hex to rgb', hexToRgb('#FF0000')!.r === 255 && hexToRgb('#FF0000')!.g === 0);
check('hex short', hexToRgb('#f00')!.r === 255);
check('contrast white black', contrastRatio('#FFFFFF', '#000000') > 20);
check('contrast equal', contrastRatio('#777777', '#777777') === 1);
check('complement', complement('#FF0000') === '#00FFFF');

const rows = csvToJson('a,b' + NL + '1,x' + NL + '2,y') as unknown as Record<string, string>[];
check('csv rows', rows.length === 2 && rows[0].a === '1' && rows[1].b === 'y');
const quoted = csvToJson('a,"b"' + NL + '1,"x,y"') as unknown as Record<string, string>[];
check('csv quoted', quoted[0]['b'] === 'x,y');
check('json to csv', jsonToCsv('[{"a":1,"b":"x"}]').indexOf('a,b') === 0);
check('json to csv value', jsonToCsv('[{"a":"v"}]') === 'a' + NL + 'v');

if (failed > 0) {
  console.log(failed + ' tests FAILED');
  process.exit(1);
}
console.log('ALL LOGIC TESTS PASSED');
