import prisma from '../lib/prisma';
// Simplified User type
export interface User {
    name: string | null;
    email: string | null;
    num_tokens: number;
    uuid: string;
}

export async function doesUserExist(email: string): Promise<boolean> {
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
    num_tokens: userRec.num_tokens,
    uuid: userRec.id
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
    num_tokens: userRec.num_tokens,
    uuid: userRec.id

  };
  return user;
}

export async function chargeToken(uuid :string): Promise<number | null> {
  const user = await prisma.user.update({
    where: {
      id: uuid
    },
    data: {
      num_tokens: {
        increment: -1
      }
    }
  });
  return user.num_tokens;
}

