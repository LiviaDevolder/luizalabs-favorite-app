import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  removeProduct: (productId: string) => Promise<void>;
  isProductInFavorites: (productId: string) => boolean;
  clearError: () => void;
}

const MAX_FAVORITES = 10;

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
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
          set({ error: "Crie uma lista antes de adicionar produtos." });
          return;
        }

        if (list.items.length >= MAX_FAVORITES) {
          set({
            error: `A lista não pode ter mais de ${MAX_FAVORITES} produtos.`,
          });
          return;
        }

        if (get().isProductInFavorites(product.id)) {
          set({ error: "Este produto já está na sua lista." });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          await favoritesService.addProductToFavoriteList(product.id);

          set((state) => ({
            list: state.list
              ? { ...state.list, items: [...state.list.items, product] }
              : null,
            isLoading: false,
          }));
        } catch (err) {
          const errorMessage = "Falha ao adicionar o produto.";
          console.error(errorMessage, err);
          set({ error: errorMessage, isLoading: false });
          throw err;
        }
      },

      removeProduct: async (productId) => {
        if (!get().list) return;

        set({ isLoading: true, error: null });

        try {
          await favoritesService.removeProductFromFavoriteList(productId);
          set((state) => ({
            list: state.list
              ? {
                  ...state.list,
                  items: state.list.items.filter((p) => p.id !== productId),
                }
              : null,
            isLoading: false,
          }));
        } catch (err) {
          const errorMessage = "Falha ao remover o produto.";
          console.error(errorMessage, err);
          set({ error: errorMessage, isLoading: false });
          throw err;
        }
      },

      isProductInFavorites: (productId) => {
        const { list } = get();
        return list?.items.some((p) => p.id === productId) ?? false;
      },
    }),
    {
      name: "favorites-storage",
      partialize: (state) => ({ list: state.list }),
    }
  )
);
