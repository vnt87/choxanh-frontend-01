import { useState } from "react";
import { CreateListingDialog } from "@/components/CreateListingDialog";
import { CategoryFilter, Category } from "@/components/CategoryFilter";
import { ListingCard, type Listing } from "@/components/ListingCard";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [listings, setListings] = useState<Listing[]>([]);
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Company Marketplace
          </h1>
          <CreateListingDialog onCreateListing={handleCreateListing} />
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {filteredListings.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
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