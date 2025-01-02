
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Username</Label>
            <div className="text-lg">{user.username}</div>
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <div className="text-lg capitalize">{user.role}</div>
          </div>
          {/* Add more profile fields as needed */}
        </CardContent>
      </Card>
    </div>
  );
}