import crypto from "crypto";
import { prismaClient } from "../../lib/db.js";

export const mutations = {
  createUser: async (
    _: any,
    {
      firstName,
      lastName,
      email,
      password,
      profileImageURL,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      profileImageURL?: string;
    }
  ) => {
    const salt = crypto.randomBytes(16).toString("hex");

    const userData: any = {
      email,
      firstName,
      lastName,
      password,
      salt,
    };

    if (profileImageURL) {
      userData.profileImageURL = profileImageURL;
    }

    await prismaClient.user.create({ data: userData });

    return true;
  },
};
