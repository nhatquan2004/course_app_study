'use server';

import { loginUser } from "@/services/userService";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';


export async function login(formData: FormData) {
   const username = formData.get('username');
   const password = formData.get('password');
   const response = await loginUser({ username, password });

   console.log(response);
   if (response && response.status === 200) {
      const data = response.data;
      const store = await cookies();

      store.set({
         name: 'loginToken',
         value: data.token,
         httpOnly: true,
         secure: true,
         maxAge: 30 * 60,
         path: '/'
      });

      store.set({
         name: 'role',
         value: data.role,
         httpOnly: true,
         secure: true,
         maxAge: 30 * 60,
         path: '/'
      });

      redirect('/');
   }
}

export async function logout() {
   const store = await cookies();

   store.set({
      name: 'loginToken',
      value: '',
      expires: new Date(0),
      httpOnly: true,
      path: '/',
   });

   store.set({
      name: 'role',
      value: '',
      expires: new Date(0),
      httpOnly: true,
      path: '/',
   });

   redirect('/auth/login');
}
