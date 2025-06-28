import { MainLayout } from "../templates/MainLayout";
import { ProductGrid } from "../organisms/ProductGrid";
import { Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useFavoritesStore } from "../../stores/favoritesStore";

export const HomePage = () => {
  const { fetchFavoriteList, clearError } = useFavoritesStore();

  useEffect(() => {
    fetchFavoriteList();
    return () => {
      clearError();
    };
  }, [fetchFavoriteList, clearError]);

  return (
    <MainLayout>
      <Box>
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Catálogo de Produtos
        </Heading>
        <ProductGrid />
      </Box>
    </MainLayout>
  );
};
