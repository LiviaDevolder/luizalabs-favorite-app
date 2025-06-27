import apiClient from "./apiClient";
import type { User } from "../types";
import type { RegisterData } from "../schemas";

export const registerUser = async (userData: RegisterData): Promise<User> => {
  const response = await apiClient.post<User>("/users", userData);
  return response.data;
};
