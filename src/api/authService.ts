import apiClient from "./apiClient";
import type { AuthResponse } from "../types";
import type { LoginCredentials } from "../schemas";

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/login",
    credentials
  );

  return response.data;
};
