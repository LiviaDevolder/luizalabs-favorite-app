import {
  Image,
  Stack,
  Heading,
  Text,
  Button,
  CardBody,
  CardRoot,
  Box,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import type { Product } from "../../types";
import { useColorModeValue } from "../ui/color-mode";

interface ProductCardProps {
  product: Product;
  onFavorite: (productId: Product) => void;
  isFavorited: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onFavorite,
  isFavorited,
}) => {
  return (
    <CardRoot>
      <CardBody>
        <Image src={product.image} alt={product.title} borderRadius="lg" />
        <Stack mt="6" gap="3">
          <Heading size="md">{product.title}</Heading>
          <Text color="blue.600" fontSize="2xl">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </Text>
        </Stack>
      </CardBody>
      <Button
        variant="solid"
        colorScheme={isFavorited ? "red" : "blue"}
        onClick={() => onFavorite(product)}
      >
        {isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      </Button>
    </CardRoot>
  );
};

export const ProductCardSkeleton = () => {
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Box bg={bgColor} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Skeleton height="200px" />
      <Box p={4}>
        <SkeletonText mt="4" noOfLines={3} gap="4" />
        <Skeleton height="32px" mt="4" />
      </Box>
    </Box>
  );
};
