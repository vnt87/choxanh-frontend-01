import { Footer } from "@/components/layout/Footer";
import { CharityProgress } from "@/components/CharityProgress";

export default function Donations() {
  return (
    <div className="min-h-screen bg-background p-4 transition-colors duration-200 flex flex-col">
      <div className="mx-auto max-w-7xl flex-grow">
        <CharityProgress />
        
        <h1 className="text-2xl font-bold mb-6">Support Our Causes</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder for charity cards */}
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-2">Education Fund</h2>
            <p className="text-muted-foreground mb-4">Supporting students in need with educational resources and scholarships.</p>
            <div className="h-2 bg-muted mb-2 rounded-full">
              <div className="h-full w-[45%] bg-primary rounded-full"></div>
            </div>
            <div className="flex justify-between text-sm">
              <span>45% funded</span>
              <span>Goal: 50M VND</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}