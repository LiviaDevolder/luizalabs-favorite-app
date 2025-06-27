import type { Product } from "./productType";

export interface FavoriteList {
  id: string;
  title: string;
  description: string | null;
  userId: string;
}

export interface FavoriteListItem {
  id: string;
  productId: string;
  favoriteListId: string;
  createdAt: string;
}

export interface EnrichedFavoriteList {
  id: string;
  title: string;
  description: string | null;
  items: Product[];
}