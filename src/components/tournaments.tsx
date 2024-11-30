import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Tournaments() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tournaments</h2>
      <Card>
        <CardHeader>
          <CardTitle>Active Tournaments</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Here you'll find information about ongoing and upcoming tournaments.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
