import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { user, login, logout } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(formData.username, formData.password);
    if (success) {
      setIsOpen(false);
      setFormData({ username: "", password: "" });
    } else {
      setError("Invalid credentials");
    }
  };

  const handleMicrosoftLogin = async () => {
    // Mock login with seller role for development
    await login("demo_user", "demo_pass", { role: 'seller' });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {user ? null : (
          <Button variant="outline" className="hover:text-white">
            Login
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleLogin} className="grid gap-4 py-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Enter your username"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" className="w-full bg-[#1E7B3E] hover:bg-[#1E7B3E]/90 hover:text-white">
            Login
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full hover:text-white"
            onClick={handleMicrosoftLogin}
          >
            Sign in with Microsoft
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
