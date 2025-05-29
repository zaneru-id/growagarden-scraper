function parseRSCPayload(data) {
  const lines = data.split('\n');
  const result = {};

  for (const line of lines) {
    if (!line.trim()) continue;

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex);
    const value = line.substring(colonIndex + 1).trim();

    try {
      result[key] = JSON.parse(value);
    } catch {
      result[key] = value;
    }
  }

  const raw = result['2'];
  if (Array.isArray(raw) && raw[3]?.stockDataSSR) {
    return raw[3].stockDataSSR;
  }

  return result;
}

module.exports = { parseRSCPayload };
