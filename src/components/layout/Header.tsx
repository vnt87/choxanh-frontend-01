import { Moon, Sun, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateListingDialog } from "@/components/CreateListingDialog";
import { AuthDialog } from "@/components/auth/AuthDialog";
import logo from "@/assets/logo-gmk.svg";
import { useTheme } from '@/contexts/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="mb-8 flex items-center justify-between">
      <Link to="/">
        <img src={logo} alt="Green Market Logo" className="h-12 w-auto" />
      </Link>
      
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search listings..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="h-10 w-10 hover:text-white"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
        <CreateListingDialog>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            Start selling
          </Button>
        </CreateListingDialog>
        <AuthDialog />
      </div>
    </header>
  );
}
