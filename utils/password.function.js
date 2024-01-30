import bcrypt from "bcrypt";

export const generateHashPassword = async (plainPassword) => {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  return hashedPassword;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

  return isPasswordMatch;
};
