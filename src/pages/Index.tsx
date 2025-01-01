import { useState, useEffect } from "react";
import { CreateListingDialog } from "@/components/CreateListingDialog";
import { CategoryFilter, Category } from "@/components/CategoryFilter";
import { ListingCard, type Listing } from "@/components/ListingCard";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { UserCircle2, Moon, Sun } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [listings, setListings] = useState<Listing[]>([
    {
      id: "1",
      title: "Homemade Chocolate Cake",
      description: "Delicious chocolate cake made with organic ingredients. Perfect for office celebrations!",
      price: 25,
      category: "Food",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      createdAt: new Date("2024-02-15"),
    },
    {
      id: "2",
      title: "Fresh Fruit Platter",
      description: "Seasonal fruits arranged beautifully. Great for team meetings!",
      price: 35,
      category: "Food",
      image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea",
      createdAt: new Date("2024-02-16"),
    },
    {
      id: "3",
      title: "Homemade Pasta Lunch",
      description: "Fresh pasta with homemade sauce. Available for lunch delivery to the office.",
      price: 15,
      category: "Food",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
      createdAt: new Date("2024-02-17"),
    },
  ]);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleCreateListing = (newListing: Omit<Listing, "id" | "createdAt">) => {
    const listing: Listing = {
      ...newListing,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
    };
    setListings((prev) => [listing, ...prev]);
    toast({
      title: "Listing created",
      description: "Your listing has been successfully created.",
    });
  };

  const filteredListings = listings.filter(
    (listing) => selectedCategory === "All" || listing.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-background p-4 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Green Market</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="h-10 w-10"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <CreateListingDialog onCreateListing={handleCreateListing}>
              <Button className="gap-2 bg-green-600 hover:bg-green-700">
                Start selling
              </Button>
            </CreateListingDialog>
            <Button variant="outline" className="gap-2">
              <UserCircle2 className="h-4 w-4" />
              Login / Register
            </Button>
          </div>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {filteredListings.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No listings found. Be the first to create one!
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;