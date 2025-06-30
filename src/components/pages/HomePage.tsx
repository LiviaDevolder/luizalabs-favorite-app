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
      <Box bgColor={"white"} p={"24px 16px"} borderRadius={"8px"}>
        <Heading as="h2" size="xl" mb={6}>
          Catálogo de Produtos
        </Heading>
        <ProductGrid />
      </Box>
    </MainLayout>
  );
};
