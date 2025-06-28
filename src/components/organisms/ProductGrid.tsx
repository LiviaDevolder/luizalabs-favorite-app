import { useState, useEffect } from "react";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import { getProducts } from "../../api/productService";
import type { Product } from "../..//types";
import { ProductCard, ProductCardSkeleton } from "../molecules/ProductCard";
import { toaster } from "../ui/toaster";

export const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(
          "Não foi possível carregar os produtos. Tente novamente mais tarde."
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFavorite = (productId: string | number) => {
    console.log(`Produto ${productId} favoritado!`);
    toaster.create({
      title: "Produto favoritado!",
      description: "Você pode vê-lo na sua lista de favoritos.",
      type: "success",
      duration: 3000,
      closable: true,
    });
  };

  if (error) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6} p={4}>
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        : products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onFavorite={handleFavorite}
              isFavorited={false}
            />
          ))}
    </SimpleGrid>
  );
};
