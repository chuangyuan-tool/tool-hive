// 双环境兼容（Next/webpack 走 CJS interop；node strip-types 走 ESM-CJS 命名空间）
import * as yamlNs from 'js-yaml';
import * as fxpNs from 'fast-xml-parser';

const yaml: any = (yamlNs as any).default ?? yamlNs;
const fxpAny = fxpNs as any;
const XMLParser: any = fxpAny.XMLParser ?? fxpAny.default?.XMLParser;
const XMLBuilder: any = fxpAny.XMLBuilder ?? fxpAny.default?.XMLBuilder;

// YAML / XML 与 JSON 互转（纯前端）

export function yamlToJson(yamlText: string): string {
  const obj = yaml.load(yamlText);
  return JSON.stringify(obj, null, 2);
}

export function jsonToYaml(jsonText: string): string {
  const obj = JSON.parse(jsonText);
  return yaml.dump(obj, { noRefs: true });
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
