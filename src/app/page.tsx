import { ExampleUsage } from "@/components/ExampleUsage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navigation } from "@/components/Navigation";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ExampleUsage />
        </main>
      </div>
    </ProtectedRoute>
  );
}
