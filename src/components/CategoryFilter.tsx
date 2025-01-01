import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const categories = [
  "All",
  "Electronics",
  "Furniture",
  "Books",
  "Office Supplies",
  "Other",
] as const;

export type Category = (typeof categories)[number];

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full",
            selectedCategory === category &&
              "bg-marketplace-600 text-white hover:bg-marketplace-700"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}