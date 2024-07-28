"use client";

import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useState } from "react";
import { LoadingButton } from "../ui/button";
import { InputPassword } from "../ui/input-password";
import { login } from "@/lib/api/auth/auth";
import { toast } from "../ui/use-toast";
import { useAppDispatch } from "@/lib/store/hooks";
import { setEmail, setName } from "@/lib/store/features/user/user-slice";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    try {
      const res = await login(data);
      console.log("res", res);
      if (!res.ok) {
        console.log("error", res.statusText);
        return toast({
          title: "Something went wrong",
          description: "Failed to login",
          variant: "destructive",
        });
      }
      const json = await res.json();
      console.log("json", json);
      dispatch(setName(json.user.name));
      dispatch(setEmail(json.user.email));
      toast({
        title: "Success",
        description: "Logged in",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Something went wrong",
        description: "Failed to login",
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
          Login
        </LoadingButton>
      </form>
    </Form>
  );
};

export default LoginForm;
