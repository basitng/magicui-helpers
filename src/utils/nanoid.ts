export const nanoid = (chars = 7) => {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const length = alphabet.length;

  for (let i = 0; i < chars; i++) {
    result += alphabet[Math.floor(Math.random() * length)];
  }

  return result;
};
