import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function ListingDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background p-4 transition-colors duration-200 flex flex-col">
      <div className="mx-auto max-w-7xl flex-grow">
        <Header />
        
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-gray-700">Home</Link>
            </li>
            <li>&gt;</li>
            <li>
              <span className="text-gray-900">Vietnamese Coffee Pack</span>
            </li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          <img
            src="https://images.unsplash.com/photo-1459755486867-b55449bb39ff"
            alt="Product"
            className="rounded-lg object-cover aspect-square w-full"
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Vietnamese Coffee Pack</h1>
              <p className="text-2xl font-semibold text-[#1E7B3E] mt-2">150k</p>
            </div>
            <p className="text-gray-600">
              Premium Vietnamese coffee beans, freshly roasted and ground.
            </p>
            <Button className="w-full bg-[#1E7B3E] hover:bg-[#1E7B3E]/90">
              Contact Seller
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}