import { MainLayout } from "../components/templates/MainLayout";
import { ProductGrid } from "../components/organisms/ProductGrid";
import { Box, Heading } from "@chakra-ui/react";

export const HomePage = () => {
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
