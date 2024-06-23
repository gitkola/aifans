import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ErrorPage() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 10000);
  }, [router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">404 Error</h1>
      <p className="text-lg">Page not found</p>
    </div>
  );
}