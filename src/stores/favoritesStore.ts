import { create } from "zustand";
import * as favoritesService from "../api/favoriteListService";
import type { EnrichedFavoriteList, Product } from "../types";

interface FavoritesState {
  list: EnrichedFavoriteList | null;
  isLoading: boolean;
  error: string | null;
  fetchFavoriteList: () => Promise<void>;
  createList: (data: { title: string; description?: string }) => Promise<void>;
  updateListInfo: (data: {
    title?: string;
    description?: string;
  }) => Promise<void>;
  deleteList: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  removeProduct: (productId: string | number) => Promise<void>;
  isProductInFavorites: (productId: string | number) => boolean;
  clearError: () => void;
}

const MAX_FAVORITES = 10;

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  list: null,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchFavoriteList: async () => {
    set({ isLoading: true, error: null });
    try {
      const list = await favoritesService.getFavoriteList();
      set({ list, isLoading: false });
    } catch (err) {
      set({ list: null, isLoading: false });
    }
  },

  createList: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await favoritesService.createFavoriteList(data);
      await get().fetchFavoriteList();
    } catch (err) {
      const errorMessage = "Falha ao criar a lista de favoritos.";
      console.error(errorMessage, err);
      set({ error: errorMessage, isLoading: false });
    }
  },

  updateListInfo: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedList = await favoritesService.updateFavoriteList(data);
      set((state) => ({
        list: state.list ? { ...state.list, ...updatedList } : null,
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = "Falha ao atualizar a lista de favoritos.";
      console.error(errorMessage, err);
      set({ error: errorMessage, isLoading: false });
    }
  },

  deleteList: async () => {
    set({ isLoading: true, error: null });
    try {
      await favoritesService.deleteFavoriteList();
      set({ list: null, isLoading: false });
    } catch (err) {
      const errorMessage = "Falha ao deletar a lista de favoritos.";
      console.error(errorMessage, err);
      set({ error: errorMessage, isLoading: false });
    }
  },

  addProduct: async (product) => {
    const { list } = get();
    if (!list) {
      const errorMessage =
        "Você precisa criar uma lista antes de adicionar produtos.";
      set({ error: errorMessage });
      return;
    }

    if (list.items.length >= MAX_FAVORITES) {
      const errorMessage = `A lista de favoritos não pode ter mais de ${MAX_FAVORITES} produtos.`;
      set({ error: errorMessage });
      return;
    }

    const oldList = list;
    set({
      list: { ...oldList, items: [...oldList.items, product] },
      error: null,
    });

    try {
      await favoritesService.addProductToFavoriteList(product.id);
    } catch (err) {
      const errorMessage =
        "Falha ao adicionar o produto. Desfazendo a alteração.";
      console.error(errorMessage, err);
      set({ list: oldList, error: errorMessage });
    }
  },

  removeProduct: async (productId) => {
    const { list } = get();
    if (!list) return;

    const oldList = list;
    const newListItems = oldList.items.filter((p) => p.id !== productId);

    set({ list: { ...oldList, items: newListItems } });

    try {
      await favoritesService.removeProductFromFavoriteList(productId);
    } catch (err) {
      const errorMessage =
        "Falha ao remover o produto. Desfazendo a alteração.";
      console.error(errorMessage, err);
      set({ list: oldList, error: errorMessage });
    }
  },

  isProductInFavorites: (productId) => {
    const { list } = get();
    return list?.items.some((p) => p.id === productId) ?? false;
  },
}));
