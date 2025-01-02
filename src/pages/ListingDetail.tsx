import { useParams, Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Sample data (should be fetched from API in production)
const sampleComments = [
  { id: 1, user: "John Doe", text: "Great product! Used it many times.", date: "2024-01-15" },
  { id: 2, user: "Alice Smith", text: "Excellent quality coffee.", date: "2024-01-14" },
];

const similarProducts = [
  { id: 1, name: "Arabica Coffee Pack", price: "140k", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e" },
  { id: 2, name: "Coffee Starter Kit", price: "200k", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { id: 3, name: "Robusta Special", price: "160k", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd" },
];

export default function ListingDetail() {
  const { id } = useParams();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const isLoggedIn = true; // Replace with actual auth logic

  return (
    <div className="min-h-screen bg-background p-4 transition-colors duration-200 flex flex-col">
      <div className="mx-auto max-w-7xl flex-grow">
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            </li>
            <li className="text-muted-foreground">&gt;</li>
            <li className="text-foreground font-medium">Vietnamese Coffee Pack</li>
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
            <p className="text-muted-foreground">
              Premium Vietnamese coffee beans, freshly roasted and ground.
            </p>
            <div className="flex space-x-4">
              <Button className="flex-1 bg-[#1E7B3E] hover:bg-[#1E7B3E]/90">
                Contact Seller
              </Button>
              <Button className="flex-1" variant="outline">
                Chat via Skype
              </Button>
              <Button className="flex-1" variant="outline">
                Chat via Facebook
              </Button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Comments</h2>
            {isLoggedIn && (
              <Button 
                onClick={() => setShowCommentForm(!showCommentForm)}
                variant="outline"
              >
                Add Comment
              </Button>
            )}
          </div>

          {showCommentForm && (
            <div className="mb-6">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
                className="mb-4"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCommentForm(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-[#1E7B3E] hover:bg-[#1E7B3E]/90"
                  onClick={() => {
                    // Handle comment submission
                    setShowCommentForm(false);
                    setNewComment("");
                  }}
                >
                  Post Comment
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {sampleComments.map((comment) => (
              <div key={comment.id} className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{comment.user}</h3>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {comment.date}
                  </span>
                </div>
                <p className="mt-2">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="mt-4 font-semibold">{product.name}</h3>
                <p className="text-[#1E7B3E] font-semibold">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
