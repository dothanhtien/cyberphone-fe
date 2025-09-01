import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
import { FormEvent, useState } from "react";

export interface LoginFormData {
  identifier: string;
  password: string;
}

interface AdminLoginFormProps {
  loggingIn: boolean;
  isError: boolean;
  onSubmit: ({ identifier, password }: LoginFormData) => void;
}

export function AdminLoginForm({
  isError,
  loggingIn,
  onSubmit,
}: AdminLoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: "",
    password: "",
  });

  const handleInputChange = (
    field: "identifier" | "password",
    value: string
  ) => {
    const newFormData = {
      [field]: value,
    };
    setFormData((prevValue) => ({ ...prevValue, ...newFormData }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="identifier">Email or Phone</Label>
                  <Input
                    id="identifier"
                    placeholder="test@test.test or 0987654321"
                    required
                    onChange={(e) =>
                      handleInputChange("identifier", e.target.value)
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                </div>

                {isError && (
                  <div className="text-red-500">
                    Email/Phone or Password is invalid
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loggingIn}>
                  {loggingIn && <Loader2Icon className="animate-spin" />}
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
