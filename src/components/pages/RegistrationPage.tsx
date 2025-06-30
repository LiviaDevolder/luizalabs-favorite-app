import { AuthTemplate } from "../templates/AuthTemplate";
import { RegistrationForm } from "../organisms/RegistrationForm";

export const RegistrationPage = () => {
  return (
    <AuthTemplate title="Quero criar uma conta">
      <RegistrationForm />
    </AuthTemplate>
  );
};
