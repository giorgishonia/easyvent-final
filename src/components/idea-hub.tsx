import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function IdeaHub() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Idea Hub</h2>
      <Card>
        <CardHeader>
          <CardTitle>Share Your Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This is where you can share and discuss ideas for future events.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
