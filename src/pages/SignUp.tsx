import SignUpCom from "@/components/Auth/SignUp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FCFFDA]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Enter your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpCom />
        </CardContent>
      </Card>
    </div>
  );
}
