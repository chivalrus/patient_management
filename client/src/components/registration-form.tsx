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
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import type { Patient } from "./tally/patients/columns";
import {  useState } from "react";
import { toast } from "sonner";

const REGISTER_PATIENT = gql`
  mutation RegisterPatient($email: String!, $name: String!, $age: Int!) {
    registerPatient(email: $email, name: $name, age: $age) {
      name
    }
  }
`;

interface IRegisterPatient {
  registerPatient: Patient;
}

export const RegistrationForm = () => {
  const [newPatient, setNewPatient] = useState<Patient>({} as Patient);

  const [registerPatient, { data }] = useMutation<IRegisterPatient>(REGISTER_PATIENT);

  const handleRegisterPatient = async () => {
    try {
      await registerPatient({variables: {...newPatient}});
      toast.success(`Successfully registered ${data?.registerPatient?.name || ""}`);

      setNewPatient(() => ({} as Patient));
    } catch (err: unknown) {
      let errorMessage: string = "somthing went wrong";

      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage);
      
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register Patient Name</CardTitle>
        <CardDescription>Please provide information</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  setNewPatient((old) => {
                    return { ...old, email: e.target.value };
                  });
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="john"
                required
                onChange={(e) => {
                  setNewPatient((old) => {
                    return { ...old, name: e.target.value };
                  });
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Age</Label>
              <Input id="name" type="number" placeholder="age" required 
                onChange={(e) => {
                  setNewPatient((old) => {
                    return { ...old, age: parseInt(e.target.value) };
                  });
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleRegisterPatient}>
          Register
        </Button>
      </CardFooter>
    </Card>
  );
};
