import { logout } from "./auth";

export const errorHandler = async (err) => {
  if (err.response) {
    if (err.response.status === 401 && err.response.data) {
      const { error } = err.response.data;
      if (error === "Invalid token") {
        await logout();
        return;
      }
    }
  }
  throw err;
};
