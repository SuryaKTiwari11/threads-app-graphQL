import UserService from "../../services/user.js";

export const queries = {
  ping: () => "pong",

  say: (_: any, { name }: { name?: string }) =>
    `Hey ${name || "Guest"}, how are you dude`,

  getUserById: async (_: any, { id }: { id: string }) => {
    try {
      const user = await UserService.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  verifyToken: async (_: any, { token }: { token: string }) => {
    try {
      const decoded = UserService.decodeToken(token) as any;
      const user = await UserService.getUserById(decoded.id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  },

  getCurrentLoggedInUser: async (_: any, __: any, context: any) => {
    try {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return context.user;
    } catch (error: any) {
      throw new Error(error.message || "Failed to get current user");
    }
  },
};
