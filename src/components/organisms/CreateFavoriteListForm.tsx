import { Button, Stack, Box, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { TextField } from "../molecules/TextField";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { favoriteListSchema } from "../../schemas/favoriteListSchema";
import { toaster } from "../ui/toaster";

export const CreateFavoriteListForm = () => {
  const createList = useFavoritesStore((state) => state.createList);

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Crie sua Lista de Favoritos
      </Heading>
      <Text color={"gray.500"} mb={6}>
        Você ainda não tem uma lista. Dê um nome a ela para começar a adicionar
        produtos!
      </Text>

      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={favoriteListSchema}
        onSubmit={async (
          values,
          { setSubmitting, setFieldError, resetForm }
        ) => {
          try {
            await createList(values);
            toaster.create({
              title: "Lista criada com sucesso!",
              type: "success",
              duration: 3000,
              closable: true,
            });
            resetForm();
          } catch (error) {
            setFieldError(
              "title",
              "Não foi possível criar a lista. Tente novamente."
            );
            toaster.create({
              title: "Erro ao criar a lista.",
              description: "Ocorreu um problema no servidor.",
              type: "error",
              duration: 5000,
              closable: true,
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Box as={Form} maxW="md" mx="auto">
            <Stack gap="6">
              <TextField
                name="title"
                label="Título da Lista"
                placeholder="Ex: Presentes de Natal"
                required={true}
              />
              <TextField
                name="description"
                label="Descrição (Opcional)"
                placeholder="Produtos que quero comprar em breve"
              />
              <Button
                type="submit"
                colorScheme="teal"
                loading={isSubmitting}
                loadingText="Criando..."
              >
                Criar Lista
              </Button>
            </Stack>
          </Box>
        )}
      </Formik>
    </Box>
  );
};
