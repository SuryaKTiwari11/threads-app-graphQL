import UserService from "../../services/user.js";
import type {
  CreateUserPayload,
  UserTokenPayload,
} from "../../services/user.js";

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
    try {
      const payload: CreateUserPayload = {
        firstName,
        lastName,
        email,
        password,
        ...(profileImageURL && { profileImageURL }),
      };

      const userId = await UserService.createUser(payload);
      return userId;
    } catch (error: any) {
      throw new Error(error.message || "Failed to create user");
    }
  },

  loginUser: async (
    _: any,
    { email, password }: { email: string; password: string }
  ) => {
    try {
      const payload: UserTokenPayload = {
        email,
        password,
      };

      const token = await UserService.getUserToken(payload);
      return token;
    } catch (error: any) {
      throw new Error(error.message || "Failed to login");
    }
  },
};
