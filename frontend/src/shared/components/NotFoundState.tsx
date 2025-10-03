"use client";

interface NotFoundStateProps {
  title?: string;
  message?: string;
}

export default function NotFoundState({
  title = "Not Found",
  message = "The requested resource was not found or a server error occurred.",
}: NotFoundStateProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto p-8 text-center mt-10 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-red-600">{title}</h1>
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}
