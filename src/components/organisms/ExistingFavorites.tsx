import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Flex,
  Spacer,
  Alert,
} from "@chakra-ui/react";
import { useFavoritesStore } from "../../stores/favoritesStore";
import type { EnrichedFavoriteList, Product } from "../../types";
import { ProductCard, ProductCardSkeleton } from "../molecules/ProductCard";
import { toaster } from "../ui/toaster";
import { UpdateFavoriteListForm } from "./UpdateFavoriteListDialog";

interface ExistingFavoritesProps {
  list: EnrichedFavoriteList;
}

export const ExistingFavorites = ({ list }: ExistingFavoritesProps) => {
  const { removeProduct, deleteList, isLoading } = useFavoritesStore();

  const handleRemove = async (product: Product) => {
    await removeProduct(product.id);
    toaster.create({
      title: "Produto removido.",
      type: "info",
      duration: 2000,
      closable: true,
    });
  };

  const handleDeleteList = async () => {
    if (
      window.confirm(
        "Tem certeza que deseja apagar sua lista de favoritos? Esta ação não pode ser desfeita."
      )
    ) {
      await deleteList();
      toaster.create({
        title: "Lista de favoritos apagada.",
        type: "success",
        duration: 3000,
        closable: true,
      });
    }
  };

  return (
    <Box>
      <Flex
        alignItems="center"
        mb={6}
        direction={{ base: "column", md: "row" }}
      >
        <Box>
          <Heading as="h2" size="xl">
            {list.title}
          </Heading>
          {list.description && (
            <Text color="gray.500" mt={2}>
              {list.description}
            </Text>
          )}
        </Box>
        <Spacer />
        <Flex gap={"12px"} mt={{ base: 4, md: 0 }}>
          <UpdateFavoriteListForm />
          <Button
            color="red"
            variant="outline"
            onClick={handleDeleteList}
            loading={isLoading}
          >
            Apagar Lista
          </Button>
        </Flex>
      </Flex>

      {list.items.length === 0 ? (
        <Alert.Root status="info" borderRadius="md">
          <Alert.Indicator />
          <Alert.Title>
            Sua lista de favoritos está vazia. Adicione produtos do nosso
            catálogo!
          </Alert.Title>
        </Alert.Root>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
          {isLoading
            ? Array.from({ length: list.items.length }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : list.items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onFavorite={handleRemove}
                  isFavorited={true}
                />
              ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
