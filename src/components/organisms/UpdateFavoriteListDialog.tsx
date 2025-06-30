import { Button, Stack, Box, Dialog, Portal } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { TextField } from "../molecules/TextField";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { favoriteListSchema } from "../../schemas/favoriteListSchema";
import { toaster } from "../ui/toaster";
import { useState } from "react";

export const UpdateFavoriteListForm = () => {
  const { updateListInfo, list, isLoading } = useFavoritesStore();
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button loading={isLoading}>Editar Lista</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header fontWeight={"700"} fontSize={"xl"}>
              Edite sua Lista de Favoritos
            </Dialog.Header>

            <Dialog.Body>
              <Formik
                initialValues={{
                  title: list?.title ?? "",
                  description: list?.description ?? "",
                }}
                validationSchema={favoriteListSchema}
                onSubmit={async (
                  values,
                  { setSubmitting, setFieldError, resetForm }
                ) => {
                  try {
                    await updateListInfo(values);
                    toaster.create({
                      title: "Lista atualizada com sucesso!",
                      type: "success",
                      duration: 3000,
                      closable: true,
                    });
                    setOpen(false);
                    resetForm();
                  } catch (error) {
                    setFieldError(
                      "title",
                      "Não foi possível atualizar a lista. Tente novamente."
                    );
                    toaster.create({
                      title: "Erro ao atualizar a lista.",
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
                        bgColor="primary"
                        loading={isSubmitting}
                        loadingText="Atualizando..."
                      >
                        Atualizar Lista
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Formik>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
