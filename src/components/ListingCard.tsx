import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Category } from "./CategoryFilter";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  createdAt: Date;
}

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-48 w-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
          <span className="whitespace-nowrap font-medium text-marketplace-600">
            ${listing.price}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {listing.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <span className="text-xs text-gray-500">
          Posted {listing.createdAt.toLocaleDateString()}
        </span>
      </CardFooter>
    </Card>
  );
}