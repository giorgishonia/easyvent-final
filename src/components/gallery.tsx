import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Gallery() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Gallery</h2>
      <Card>
        <CardHeader>
          <CardTitle>Event Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is where you'll find photos from past events.</p>
        </CardContent>
      </Card>
    </div>
  );
}
