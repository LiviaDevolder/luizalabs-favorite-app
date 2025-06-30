import { useEffect } from "react";
import { Box, Spinner, Center, Alert } from "@chakra-ui/react";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { MainLayout } from "../templates/MainLayout";
import { CreateFavoriteListForm } from "../organisms/CreateFavoriteListForm";
import { ExistingFavorites } from "../organisms/ExistingFavorites";

export const FavoritesPage = () => {
  const { list, isLoading, error, fetchFavoriteList, clearError } =
    useFavoritesStore();

  useEffect(() => {
    fetchFavoriteList();
    return () => {
      clearError();
    };
  }, [fetchFavoriteList, clearError]);

  const renderContent = () => {
    if (isLoading && !list) {
      return (
        <Center h="50vh">
          <Spinner size="xl" color="teal.500" />
        </Center>
      );
    }

    if (error) {
      return (
        <Center h="50vh">
          <Alert.Root
            status="error"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="md"
          >
            <Alert.Indicator boxSize="40px" mr={0} />
            <Alert.Title mt={4} mb={1} fontSize="lg">
              Ocorreu um erro
            </Alert.Title>
            <Alert.Description maxWidth="sm">{error}</Alert.Description>
          </Alert.Root>
        </Center>
      );
    }

    if (!list) {
      return <CreateFavoriteListForm />;
    }

    return <ExistingFavorites list={list} />;
  };

  return (
    <MainLayout>
      <Box
        bgColor={"white"}
        p={"24px 16px"}
        borderRadius={"8px"}
      >
        {renderContent()}
      </Box>
    </MainLayout>
  );
};
