import { Moon, Sun, Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateListingDialog } from "@/components/CreateListingDialog";
import { AuthDialog } from "@/components/auth/AuthDialog";
import logo from "@/assets/logo-gmk.svg";
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { user, logout } = useAuth();  // Add logout to destructuring

  return (
    <header className="mb-8 flex items-center justify-between">
      <Link to="/">
        <img src={logo} alt="Green Market Logo" className="h-12 w-auto" />
      </Link>
      
      <div className="flex items-center gap-8 flex-1 max-w-3xl mx-8">
        <nav className="flex gap-4">
          <Link
            to="/"
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              location.pathname === "/" 
                ? "bg-secondary text-secondary-foreground" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Shopping
          </Link>
          <Link
            to="/donations"
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              location.pathname === "/donations"
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Donations
          </Link>
        </nav>
        
        <div className="relative flex-1">
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
        {user ? (
          <>
            {(user.role === 'seller' || user.role === 'admin') && (
              <CreateListingDialog>
                <Button className="gap-2 bg-green-600 hover:bg-green-700">
                  Start selling
                </Button>
              </CreateListingDialog>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 hover:text-white">
                  <User className="h-4 w-4" />
                  {user.username}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild className="hover:text-white">
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()} className="hover:text-white">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <AuthDialog />
        )}
      </div>
    </header>
  );
}
