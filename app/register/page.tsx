import { RegisterForm } from "@/components/Register";

export default function RegisterPage() {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black/95 flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm py-16">
        <RegisterForm />
      </div>
    </div>
  );
}
