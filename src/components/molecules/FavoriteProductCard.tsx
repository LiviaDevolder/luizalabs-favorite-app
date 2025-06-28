import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  AspectRatio,
} from '@chakra-ui/react';
import type { Product } from '../../types';
import { FaTrash } from 'react-icons/fa';
import { useColorModeValue } from '../ui/color-mode';

interface FavoriteProductCardProps {
  product: Product;
  onRemove: (productId: string) => void;
}

export const FavoriteProductCard = ({ product, onRemove }: FavoriteProductCardProps) => {
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
    >
      <AspectRatio ratio={1} w="100%">
        <Image src={product.image} alt={product.title} objectFit="contain" p={4} />
      </AspectRatio>
      <VStack p={4} align="stretch" gap={3}>
        <Text fontWeight="medium" lineClamp={2} title={product.title}>
          {product.title}
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="teal.500">
          R$ {product.price.toFixed(2)}
        </Text>
        <Button
          colorScheme="red"
          variant="outline"
          size="sm"
          onClick={() => onRemove(product.id)}
        >
          <FaTrash /> Remover
        </Button>
      </VStack>
    </Box>
  );
};