"use client";

import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useState } from "react";
import { LoadingButton } from "../ui/button";
import { InputPassword } from "../ui/input-password";
import { useAppDispatch } from "@/lib/store/hooks";
import { setEmail, setName } from "@/lib/store/features/user/user-slice";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { signUp } from "@/lib/api/auth/auth";

const SignupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});
const SignupForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    setLoading(true);
    try {
      const res = await signUp(data);
      if (!res.ok) {
        const json = await res.json();
        return toast({
          title: "Something went wrong",
          description: json.error,
          variant: "destructive",
        });
      }
      const json = await res.json();
      console.log("json:", json);
      dispatch(setEmail(json.email));
      dispatch(setName(json.name));
      router.push("/dashboard");
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <Input disabled={loading} placeholder="Full name" {...field} />
            );
          }}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <Input disabled={loading} placeholder="Your email" {...field} />
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <InputPassword
                disabled={loading}
                placeholder="Password"
                {...field}
              />
            );
          }}
        />
        <LoadingButton className="w-full" loading={loading} type="submit">
          Sign up
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignupForm;
