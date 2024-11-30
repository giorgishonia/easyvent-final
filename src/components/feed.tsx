import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Feed() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Feed</h2>
      <Card>
        <CardHeader>
          <CardTitle>Latest Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Here you'll see the latest events and announcements.</p>
        </CardContent>
      </Card>
    </div>
  );
}
