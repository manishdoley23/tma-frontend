import { baseUrl } from "..";
import { LoginDtop, SignUpDto } from "./dto";

export const signUp = async (data: SignUpDto) => {
  try {
    const res = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to sign up");
  }
};

export const login = async (data: LoginDtop) => {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to sign up");
  }
};
