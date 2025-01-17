import { useState, useEffect } from "react";
import { CreateListingDialog } from "@/components/CreateListingDialog";
import { CategoryFilter, Category } from "@/components/CategoryFilter";
import { ListingCard, type Listing } from "@/components/ListingCard";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { UserCircle2, Moon, Sun, Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo-gmk.svg";
import { Progress } from "@/components/ui/progress";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { RegisterDialog } from "@/components/auth/RegisterDialog";
import { Footer } from "@/components/layout/Footer";
import { CharityProgress } from "@/components/CharityProgress";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [listings, setListings] = useState<Listing[]>([
    {
      id: "1",
      title: "Vietnamese Coffee Pack",
      description: "Premium Vietnamese coffee beans, freshly roasted and ground.",
      price: 150,
      category: "Food",
      image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff",
      createdAt: new Date("2024-02-15"),
    },
    {
      id: "2",
      title: "Handcrafted Tea Set",
      description: "Traditional ceramic tea set with four cups and a teapot.",
      price: 280,
      category: "Other",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
      createdAt: new Date("2024-02-16"),
    },
    {
      id: "3",
      title: "Bamboo Desk Set",
      description: "Eco-friendly desk organizer set made from sustainable bamboo.",
      price: 180,
      category: "Office Supplies",
      image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e",
      createdAt: new Date("2024-02-17"),
    },
    {
      id: "4",
      title: "Organic Tea Collection",
      description: "Selection of premium organic teas from Vietnamese highlands.",
      price: 220,
      category: "Food",
      image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
      createdAt: new Date("2024-02-18"),
    },
    {
      id: "5",
      title: "Traditional Ao Dai",
      description: "Handcrafted Vietnamese traditional dress with modern design elements.",
      price: 450,
      category: "Clothing",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",
      createdAt: new Date("2024-02-19"),
    },
    {
      id: "6",
      title: "Lacquer Art Box",
      description: "Hand-painted lacquer jewelry box with mother of pearl inlay.",
      price: 320,
      category: "Art",
      image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea",
      createdAt: new Date("2024-02-20"),
    },
    {
      id: "7",
      title: "Vietnamese Cookbook",
      description: "Collection of authentic Vietnamese recipes with step-by-step guides.",
      price: 125,
      category: "Books",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      createdAt: new Date("2024-02-21"),
    },
    {
      id: "8",
      title: "Hand-Painted Silk Painting",
      description: "Beautiful traditional Vietnamese silk painting featuring lotus flowers and birds.",
      price: 275,
      category: "Art",
      image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458",
      createdAt: new Date("2024-02-22"),
    },
  ]);
  const { toast } = useToast();

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
    <div className="min-h-screen bg-background p-4 transition-colors duration-200 flex flex-col">
      <div className="mx-auto max-w-7xl flex-grow w-full">
        <CharityProgress />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="mt-8 w-full">
          {filteredListings.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-gray-600 dark:text-gray-400">
                No listings found. Be the first to create one!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;