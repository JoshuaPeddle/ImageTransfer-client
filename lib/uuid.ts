function _generateUUID(): string {
  const buf = new Uint8Array(16);
  crypto.getRandomValues(buf);
  buf[6] = (buf[6] & 0x0f) | 0x40; // set version to 0100 (UUID version 4)
  buf[8] = (buf[8] & 0x3f) | 0x80; // set variant to 10 (RFC4122 variant)
  return Array.from(buf).map((b, i) => {
    const s = b.toString(16).padStart(2, '0');
    return (i === 4 || i === 6 || i === 8 || i === 10) ? '-' + s : s;
  }).join('');
}

export async function generateUUID(): Promise<string> {
  if (!crypto.randomUUID) {
    let uuid = _generateUUID();
    return uuid;
  }
  let uuid = crypto.randomUUID();
  return uuid;
};
