// 两个依赖都同时提供 CJS 与 ESM 产物，命名导入在 Next/webpack 和 node ESM 下都能工作。
// 原先的 `.default ?? ns` 兜底会让 webpack 打 "does not contain a default export" 警告。
import { load as yamlLoad, dump as yamlDump } from 'js-yaml';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

// YAML / XML 与 JSON 互转（纯前端）

export function yamlToJson(yamlText: string): string {
  const obj = yamlLoad(yamlText);
  return JSON.stringify(obj, null, 2);
}

export function jsonToYaml(jsonText: string): string {
  const obj = JSON.parse(jsonText);
  return yamlDump(obj, { noRefs: true });
}

export function xmlToJson(xmlText: string): string {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
  return JSON.stringify(parser.parse(xmlText), null, 2);
}

export function jsonToXml(jsonText: string): string {
  const obj = JSON.parse(jsonText);
  const builder = new XMLBuilder({ ignoreAttributes: false, attributeNamePrefix: '@_' });
  return builder.build(obj) ?? '';
}
