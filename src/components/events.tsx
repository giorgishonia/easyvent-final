import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Events() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Events</h2>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Here you'll find a list of upcoming events and be able to manage
            them.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
