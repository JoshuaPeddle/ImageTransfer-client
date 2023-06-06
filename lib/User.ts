import prisma from '../lib/prisma';
// Simplified User type
export interface User {
    name: string | null;
    email: string | null;
    num_tokens: number;
}

export async function doesUserExist(email: string): Promise<boolean> {
  console.log('doesUserExist', email);
  const userRec = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  return userRec !== null;
}

export async function createUser(email: string, name: string): Promise<User> {
  const userRec = await prisma.user.create({
    data: {
      email: email,
      name: name,
    }
  });
  const user: User = {
    name: userRec.name,
    email: userRec.email,
    num_tokens: userRec.num_tokens
  };
  return user;
}

export async function getUser(email: string): Promise<User | null> {
  const userRec = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  if (userRec === null) {
    return null;
  }
  const user: User = {
    name: userRec.name,
    email: userRec.email,
    num_tokens: userRec.num_tokens
  };
  return user;
}