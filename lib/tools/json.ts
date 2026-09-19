export function formatJSON(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, 2);
}

export function minifyJSON(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}

export function validateJSON(input: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: (e as Error).message };
  }
}

export function generateTypeScriptTypes(input: string): string {
  try {
    const data = JSON.parse(input);
    const sample = Array.isArray(data) ? data[0] : data;
    if (sample === null || typeof sample !== 'object') {
      return '// Provide a JSON object or array to generate types\n';
    }
    let out = '// Auto-generated TypeScript types\n\ninterface DataItem {\n';
    for (const [key, value] of Object.entries(sample as Record<string, unknown>)) {
      let type = 'unknown';
      if (typeof value === 'string') type = 'string';
      else if (typeof value === 'number') type = 'number';
      else if (typeof value === 'boolean') type = 'boolean';
      else if (value === null) type = 'null';
      else if (Array.isArray(value)) type = 'unknown[]';
      else if (typeof value === 'object') type = 'Record<string, unknown>';
      out += '  ' + key + ': ' + type + ';\n';
    }
    out += '}\n\nexport type Data = DataItem[];\n';
    return out;
  } catch (e) {
    return '// Invalid JSON: ' + (e as Error).message + '\n';
  }
}
