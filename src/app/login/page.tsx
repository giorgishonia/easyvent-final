"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/components/auth-provider";
import { FcGoogle } from "react-icons/fc";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const eventCategories = [
  { id: "music", label: "Music" },
  { id: "sports", label: "Sports" },
  { id: "technology", label: "Technology" },
  { id: "art", label: "Art" },
  { id: "food", label: "Food" },
];

export default function Login() {
  const { user, signIn } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isNewUser, setIsNewUser] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkIfNewUser();
    }
  }, [user]);

  const checkIfNewUser = async () => {
    if (!user) return;

    const db = getFirestore();
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      setIsNewUser(true);
    } else {
      router.push("/");
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    const db = getFirestore();
    try {
      await setDoc(doc(db, "users", user.uid), {
        nickname,
        interests: selectedCategories,
        email: user.email,
        createdAt: new Date(),
      });
      toast({
        title: "Welcome!",
        description: "Your profile has been created successfully.",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isNewUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md">
          <form onSubmit={handleOnboarding}>
            <CardHeader>
              <CardTitle>Welcome to EASYVENT!</CardTitle>
              <CardDescription>
                Please complete your profile to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  placeholder="Enter your nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Interested Event Categories</Label>
                <div className="grid grid-cols-2 gap-2">
                  {eventCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => {
                          setSelectedCategories(
                            checked
                              ? [...selectedCategories, category.id]
                              : selectedCategories.filter(
                                  (id) => id !== category.id
                                )
                          );
                        }}
                      />
                      <Label htmlFor={category.id}>{category.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Profile..." : "Complete Profile"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to EASYVENT</CardTitle>
          <CardDescription>
            Sign in to start managing your events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center"
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            {isLoading ? "Signing In..." : "Sign In with Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
