import AuthLayout from "@/components/auth-layout";
import AuthForm from "./auth-form";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Log in to your account"
      description="Enter your email and password below to log in"
    >
      <AuthForm />
    </AuthLayout>
  );
}
