import AuthForm from "@/components/forms/AuthForm";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            認証が必要です
          </h1>
          <p className="text-gray-600">続行するにはサインインしてください</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
