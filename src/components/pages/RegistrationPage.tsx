import { AuthTemplate } from '../templates/AuthTemplate';
import { RegistrationForm } from '../organisms/RegistrationForm';

export const RegistrationPage = () => {
  return (
    <AuthTemplate title="Crie sua conta gratuitamente">
      <RegistrationForm />
    </AuthTemplate>
  );
};
