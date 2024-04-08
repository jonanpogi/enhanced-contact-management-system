// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bufferToBase64 = (buffer: any) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

export default bufferToBase64;
