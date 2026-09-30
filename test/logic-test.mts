import { formatJSON, minifyJSON, validateJSON, generateTypeScriptTypes } from '../lib/tools/json.ts';
import { generatePassword, passwordStrength, crackTimeEstimate } from '../lib/tools/password.ts';
import { encodeBase64, decodeBase64 } from '../lib/tools/base64.ts';
import { hexToRgb, contrastRatio, complement } from '../lib/tools/color.ts';
import { csvToJson, jsonToCsv } from '../lib/tools/csv.ts';
import { md5, sha1, sha256 } from '../lib/tools/hash.ts';
import { unixToIso, dateToUnix, isLeapYear, daysBetween } from '../lib/tools/timestamp.ts';
import { encodeUrl, decodeUrl, parseQuery, buildQuery, normalizeUrl } from '../lib/tools/url.ts';
import { testRegex, findMatches, replaceWithPattern, explainFlags } from '../lib/tools/regex.ts';
import { parseCron, nextRuns, describeCron } from '../lib/tools/cron.ts';
import { qrToSvg } from '../lib/tools/qrcode.ts';
import { markdownToHtml } from '../lib/tools/markdown.ts';
import { convert, formatNumber } from '../lib/tools/units.ts';
import { dedupeLines, removeEmptyLines, normalizeSpaces, textStats } from '../lib/tools/texttools.ts';
import { yamlToJson, jsonToYaml, xmlToJson, jsonToXml } from '../lib/tools/convert.ts';
import { generateUuids, isUuidV4 } from '../lib/tools/uuid.ts';

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

// hash（RFC 标准向量）
check('md5 empty', md5('') === 'd41d8cd98f00b204e9800998ecf8427e');
check('md5 abc', md5('abc') === '900150983cd24fb0d6963f7d28e17f72');
check('md5 hello world', md5('hello world') === '5eb63bbbe01eeed093cb22bb8f5acdc3');
check('sha1 abc', sha1('abc') === 'a9993e364706816aba3e25717850c26c9cd0d89d');
check('sha256 empty', sha256('') === 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
check('sha256 abc', sha256('abc') === 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');

// timestamp
check('ts iso epoch', unixToIso(0) === '1970-01-01T00:00:00.000Z');
check('ts epoch 10 digits', unixToIso(1000000000) === '2001-09-09T01:46:40.000Z');
check('ts dateToUnix', dateToUnix('2020-01-01T00:00:00Z') === 1577836800);
check('ts leap 2000', isLeapYear(2000) === true && isLeapYear(2024) === true);
check('ts leap 1900', isLeapYear(1900) === false && isLeapYear(2023) === false);
check('ts days between', daysBetween(0, 172800) === 2);

// url
check('url encode', encodeUrl('a b&c') === 'a%20b%26c');
check('url decode', decodeUrl('a%20b') === 'a b');
check('url parseQuery', JSON.stringify(parseQuery('a=1&b=2')) === '{"a":"1","b":"2"}');
check('url parseQuery ? prefix + empty value', JSON.stringify(parseQuery('?x=y&z')) === '{"x":"y","z":""}');
check('url buildQuery', buildQuery({ a: '1', b: '2' }) === 'a=1&b=2');
check('url normalize', normalizeUrl('example.com') === 'https://example.com');

// regex
const rt = testRegex('\\d+', 'g', 'a123b45');
check('regex test match', rt.valid && rt.match && rt.matched === '123' && rt.index === 1);
check('regex find all', findMatches('\\d+', '', '1,22,333').length === 3);
check('regex replace', replaceWithPattern('\\s+', 'g', 'a   b  c', ' ') === 'a b c');
check('regex invalid', testRegex('[z-a]', '', '').valid === false);
check('regex flags explain', explainFlags('gi').length === 2);

// cron
const cp = parseCron('*/15 * * * *');
check('cron step valid', cp.valid && JSON.stringify(cp.expanded![0]) === '[0,15,30,45]');
check('cron range valid', parseCron('0 9 * * 1-5').valid && JSON.stringify(parseCron('0 9 * * 1-5').expanded![4]) === '[1,2,3,4,5]');
check('cron 4 fields invalid', parseCron('* * * *').valid === false);
check('cron garbage invalid', parseCron('a * * * *').valid === false);
check('cron describe all', describeCron('* * * * *'.split(' ')) === 'Every minute');
const nr = nextRuns('0 9 * * *', 2, new Date('2024-01-15T10:00:00'));
check('cron nextRuns length', nr.length === 2);
check('cron nextRuns time', nr[0] && nr[0].getDate() === 16 && nr[0].getHours() === 9);
check('cron nextRuns second day', nr[1] && nr[1].getDate() === 17);


// === 储备批次 2（纯前端 6 工具） ===

// qrcode
check('qr svg', qrToSvg('https://toolhive.com.cn').indexOf('<svg') !== -1 && qrToSvg('hello').indexOf('<svg') !== -1);

// markdown
const md1 = markdownToHtml('# T' + NL + NL + '**b** and *i* and `c`');
check('md heading', md1.indexOf('<h1>') !== -1);
check('md bold', md1.indexOf('<strong>b</strong>') !== -1);
check('md italic', md1.indexOf('<em>i</em>') !== -1);
check('md code', md1.indexOf('<code>c</code>') !== -1);

// units
check('units km->m', convert(1, 'km', 'm', 'length') === 1000);
check('units c->f', convert(100, 'C', 'F', 'temperature') === 212);
check('units c->k', Math.abs(convert(0, 'C', 'K', 'temperature') - 273.15) < 1e-6);
check('units gb->mb', convert(1, 'GB', 'MB', 'data') === 1024);
check('units h->s', convert(1, 'h', 's', 'time') === 3600);
check('units fmt', formatNumber(1 / 3) === '0.333333');

// texttools
check('txt dedupe', dedupeLines('a' + NL + 'a' + NL + 'b' + NL) === 'a' + NL + 'b');
check('txt empty', removeEmptyLines('a' + NL + NL + 'b') === 'a' + NL + 'b');
check('txt norm', normalizeSpaces('a    b' + NL + '  c') === 'a b' + NL + 'c');
const ts = textStats('hello world');
check('txt stats words', ts.words === 2 && ts.uniqueWords === 2 && ts.lines === 1);

// convert
check('cv y2j', yamlToJson('a: 1') === JSON.stringify({ a: 1 }, null, 2));
check('cv j2y', jsonToYaml('{"a":1}').indexOf('a: 1') !== -1);
check('cv x2j', xmlToJson('<r><i>1</i></r>').indexOf('"i": 1') !== -1);
check('cv j2x', jsonToXml('{"a":1}').indexOf('<a>1</a>') !== -1);

// uuid
const uids = generateUuids(3);
check('uuid count', uids.length === 3);
check('uuid v4', uids.every((u) => isUuidV4(u)));
check('uuid unique', new Set(uids).size === 3);


if (failed > 0) {
  console.log(failed + ' tests FAILED');
  process.exit(1);
}
console.log('ALL LOGIC TESTS PASSED');
