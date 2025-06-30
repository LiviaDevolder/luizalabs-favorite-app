import { LoginForm } from "../organisms/LoginForm";
import { AuthTemplate } from "../templates/AuthTemplate";

export const LoginPage = () => {
  return (
    <AuthTemplate title="Já sou cliente">
      <LoginForm />
    </AuthTemplate>
  );
};
