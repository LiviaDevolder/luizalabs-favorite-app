"use client";

import { useState } from "react";
import {
  Combobox,
  HStack,
  Portal,
  Spinner,
  Text,
  VStack,
  Image,
  useListCollection,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useAsync } from "react-use";

import type { Product } from "../../types";
import { FiSearch } from "react-icons/fi";
import { toaster } from "../ui/toaster";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { searchProductsByName } from "../../api/favoriteListService";

export const ProductSearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const { addProduct } = useFavoritesStore();
  const { collection, set: setItems } = useListCollection<Product>({
    initialItems: [],
    itemToValue: (item) => item.id.toString(),
    itemToString: (item) => item.title,
    limit: 5,
  });

  const handleSelectProduct = async (productId: string) => {
    const selectedProduct = collection.items.find((p) => p.id === productId);

    if (!selectedProduct) {
      console.error(
        "Produto selecionado não encontrado na lista de resultados."
      );
      return;
    }

    try {
      await addProduct(selectedProduct);
      toaster.create({
        title: "Produto favoritado!",
        description: "Você pode conferir sua lista de favoritos.",
        type: "success",
        duration: 3000,
        closable: true,
      });
    } catch (error) {
      toaster.create({
        title: "Falha ao favoritar produto",
        description: "Tente novamente mais tarde",
        type: "error",
        duration: 5000,
        closable: true,
      });
    }

    setInputValue("");
    setItems([]);
  };
  const state = useAsync(async () => {
    if (inputValue.trim().length < 3) {
      setItems([]);
      return;
    }

    const products = await searchProductsByName(inputValue);
    setItems(products);
  }, [inputValue, setItems]);

  return (
    <Combobox.Root
      w={"100%"}
      collection={collection}
      onInputValueChange={(e) => setInputValue(e.inputValue)}
      onSelect={(details) => handleSelectProduct(details.itemValue)}
      positioning={{ sameWidth: true }}
      openOnChange={(e) => e.inputValue.length > 2}
      selectionBehavior={"clear"}
      inputValue={inputValue}
    >
      <Combobox.Control>
        <InputGroup
          endElement={
            state.loading ? (
              <Spinner color="primary" size="sm" />
            ) : (
              <FiSearch style={{ color: "#0086E1" }} />
            )
          }
        >
          <Combobox.Input as={Input} placeholder="Busca no Magalu" />
        </InputGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            {state.loading ? (
              <HStack p="3" justify="center">
                <Spinner size="xs" />
                <Text fontSize="sm">Buscando...</Text>
              </HStack>
            ) : state.error ? (
              <Text p="3" color="red.500" fontSize="sm">
                Erro ao buscar produtos.
              </Text>
            ) : inputValue.length >= 3 && collection.items.length === 0 ? (
              <Text p="3" fontSize="sm" color="gray.500">
                Nenhum produto encontrado para &ldquo;{inputValue}&rdquo;.
              </Text>
            ) : (
              collection.items?.map((product) => (
                <Combobox.Item
                  item={product}
                  py={2}
                  px={3}
                  _hover={{ bg: "gray.100" }}
                  _selected={{ bg: "blue.100" }}
                  key={product.id}
                >
                  <HStack>
                    <Image
                      src={product.image}
                      alt={product.title}
                      boxSize="40px"
                      objectFit="cover"
                      rounded="sm"
                    />
                    <VStack align="start" gap={0} flex={1} overflow="hidden">
                      <Text
                        fontWeight="medium"
                        fontSize="sm"
                        lineClamp={1}
                        title={product.title}
                      >
                        {product.title}
                      </Text>
                      <Text fontSize="sm" color="primary">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(product.price)}
                      </Text>
                    </VStack>
                  </HStack>
                </Combobox.Item>
              ))
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
};
