import apiClient from "./apiClient";
import type {
  FavoriteList,
  EnrichedFavoriteList,
  FavoriteListItem,
} from "@/types";

export const createFavoriteList = async (data: {
  title: string;
  description?: string;
}): Promise<FavoriteList> => {
  const response = await apiClient.post<FavoriteList>("/favorite-list", data);
  return response.data;
};

export const getFavoriteList = async (): Promise<EnrichedFavoriteList> => {
  const response = await apiClient.get<EnrichedFavoriteList>("/favorite-list");
  return response.data;
};

export const updateFavoriteList = async (data: {
  title?: string;
  description?: string;
}): Promise<FavoriteList> => {
  const response = await apiClient.patch<FavoriteList>("/favorite-list", data);
  return response.data;
};

export const deleteFavoriteList = async (): Promise<void> => {
  await apiClient.delete("/favorite-list");
};

export const addProductToFavoriteList = async (
  productId: string | number
): Promise<FavoriteListItem> => {
  const response = await apiClient.post<FavoriteListItem>(
    "/favorite-list/products",
    { productId: String(productId) }
  );
  return response.data;
};

export const removeProductFromFavoriteList = async (
  productId: string | number
): Promise<void> => {
  await apiClient.delete(`/favorite-list/products/${productId}`);
};
