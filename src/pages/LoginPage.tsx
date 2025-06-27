import { LoginForm } from "../components/organisms/LoginForm";
import { AuthTemplate } from "../components/templates/AuthTemplate";

export const LoginPage = () => {
  return (
    <AuthTemplate title="Bem-vindo de volta!">
      <LoginForm />
    </AuthTemplate>
  );
};
