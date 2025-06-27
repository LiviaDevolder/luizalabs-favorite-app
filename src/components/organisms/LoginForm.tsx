import { Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "../molecules/TextField";
import { useAuthStore } from "../../stores/authStore";
import { login as loginService } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { User } from "../../types";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Formato de e-mail inválido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("A senha é obrigatória"),
});

export const LoginForm = () => {
  const { login: loginAction } = useAuthStore();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          const { access_token: accessToken } = await loginService(values);

          const decodedUser = jwtDecode<User>(accessToken);

          loginAction(accessToken, decodedUser);

          navigate("/favorites");
        } catch (error) {
          setFieldError("email", "Credenciais inválidas.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack gap="6">
            <TextField
              name="email"
              label="Endereço de e-mail"
              type="email"
              required={true}
            />
            <TextField
              name="password"
              label="Senha"
              type="password"
              required={true}
            />
            <Button type="submit" colorScheme="primary" loading={isSubmitting}>
              Entrar
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
