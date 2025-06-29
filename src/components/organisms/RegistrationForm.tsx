import { Button, Stack, Text, Box } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "../molecules/TextField";
import { registerUser } from "../../api/userService";
import { registerSchema } from "../../schemas/userSchema";
import { toaster } from "../ui/toaster";

export const RegistrationForm = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        const { confirmPassword, ...submissionData } = values;

        try {
          await registerUser(submissionData);

          toaster.create({
            title: "Conta criada com sucesso!",
            description: "Você já pode fazer o login.",
            type: "success",
            duration: 5000,
            closable: true,
          });

          navigate("/login");
        } catch (error: any) {
          if (error.response?.data?.message?.includes("already exists")) {
            setFieldError("email", "Este endereço de e-mail já está em uso.");
          } else {
            setFieldError(
              "name",
              "Não foi possível criar a conta. Tente novamente."
            );
            console.error("Registration failed:", error);
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Stack as={Form} gap="6">
          <TextField
            name="name"
            label="Nome completo"
            placeholder="Seu nome aqui"
            required
          />
          <TextField
            name="email"
            label="Endereço de e-mail"
            type="email"
            placeholder="email@exemplo.com"
            required
          />
          <TextField
            name="password"
            label="Senha"
            type="password"
            placeholder="Pelo menos 6 caracteres"
            required
          />
          <TextField
            name="confirmPassword"
            label="Confirme sua senha"
            type="password"
            required
          />
          <Button
            type="submit"
            colorScheme="teal"
            loading={isSubmitting}
            loadingText="Criando conta..."
            size="lg"
            fontSize="md"
          >
            Criar minha conta
          </Button>
          <Box textAlign="center">
            <Text>
              Já tem uma conta?{" "}
              <Link color="teal" to={"/login"}>
                Faça o login
              </Link>
            </Text>
          </Box>
        </Stack>
      )}
    </Formik>
  );
};
