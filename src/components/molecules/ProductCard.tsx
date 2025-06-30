import {
  Image,
  Stack,
  Text,
  Button,
  CardBody,
  CardRoot,
  Box,
  Skeleton,
  SkeletonText,
  RatingGroup,
  Flex,
} from "@chakra-ui/react";
import type { Product } from "../../types";
import { useColorModeValue } from "../ui/color-mode";
import { roundToNearestHalf } from "../../util/roundToNearestHalf";

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
        <Image
          maxW={"290px"}
          maxH={"210px"}
          w={"100%"}
          h={"100%"}
          objectFit={"contain"}
          src={product.image}
          alt={product.title}
          borderRadius="lg"
        />
        <Stack mt="6" gap="1">
          <Text
            fontSize="sm"
            lineHeight={"1.25"}
            fontWeight={"400"}
            textOverflow={"ellipsis"}
            lineClamp={"3"}
          >
            {product.title}
          </Text>

          {product.rating ? (
            <Flex gap={1} alignItems={"center"}>
              <RatingGroup.Root
                allowHalf
                readOnly
                count={5}
                defaultValue={roundToNearestHalf(product.rating.rate)}
                size={"xs"}
                colorPalette={"yellow"}
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
              <Text color={"gray.500"} fontSize={"sm"}>
                {product.rating.rate} ({product.rating.count})
              </Text>
            </Flex>
          ) : null}

          <Text color="gray.700" fontSize="2xl" fontWeight={"700"}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </Text>
        </Stack>
      </CardBody>
      <Button
        variant="solid"
        bgColor={isFavorited ? "red" : "primary"}
        onClick={() => onFavorite(product)}
        textTransform={"uppercase"}
        fontWeight={"700"}
      >
        {isFavorited ? "Remover" : "Adicionar"}
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
