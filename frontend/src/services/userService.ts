import { API_BASE_URL } from "@/config/api";

import axios from "axios";

type RegisterPayload = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

type LoginPayload = {
  username: string;
  password: string;
};

const instance = axios.create();

export async function registerUser(userData: RegisterPayload) {
  const res = await instance.post(`${API_BASE_URL}/user/create`, userData);
  return res.data;
}

export async function loginUser(userData: any) {
  try {
    const res = await instance.post(`${API_BASE_URL}/auth/login`, userData);
    return res;
  } catch (err) {
    console.log(err);
  }
}
