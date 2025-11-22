/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { login, getUserType } from "@/lib/apiUtils";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      toast.success("Login successful!", {
        description: `Welcome back, ${username}!`,
      });

      const userType = getUserType();
      if (userType === "admin") {
        router.push("/admin");
      } else if (userType === "merchant") {
        router.push("/merchant");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login failed", {
        description: error.message || "Invalid username or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Dark */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 flex-col justify-between p-12">
        <div>
          <h1 className="text-4xl font-bold text-blue-600">DuDu</h1>
        </div>

        <div className="text-gray-400 text-sm">DuDU Software</div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Login to Panel</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your credentials to access downtown
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="text"
                  placeholder="Enter your email..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center text-xs text-gray-500 mt-6">
              By clicking login, you agree to our Terms of Service and Privacy
              Policy
            </div>
          </form>
        </div>
      </div>

      {/* Mobile - Show brand at top */}
      <div className="lg:hidden absolute top-8 left-8">
        <h1 className="text-4xl font-bold text-blue-600">DuDu</h1>
      </div>
    </div>
  );
}
