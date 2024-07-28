"use client";

import LoginForm from "@/components/forms/login-form";
import SignupForm from "@/components/forms/signup-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useState } from "react";

const Landing = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardTitle>Welcome to Workflo!</CardTitle>
      </CardHeader>
      <CardContent>
        {showLogin ? (
          <div>
            <LoginForm />
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm">Don&apos;t have an account?</p>
              <Button
                className="px-0"
                variant={"link"}
                onClick={() => {
                  setShowLogin((prev) => !prev);
                }}
              >
                Create a new account
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <SignupForm />
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm">Already have an account?</p>
              <Button
                className="px-0"
                variant={"link"}
                onClick={() => {
                  setShowLogin((prev) => !prev);
                }}
              >
                Log in
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Landing;
