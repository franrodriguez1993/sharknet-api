import { hash, compare } from "bcryptjs";

//Encriptar:
const encrypt = async (pass: string) => {
  const hashPass = await hash(pass, 8);
  return hashPass;
};

//comparar:

const verified = async (pass: string, hashPash: string) => {
  const isCorrect = await compare(pass, hashPash);
  return isCorrect;
};

export { encrypt, verified };
