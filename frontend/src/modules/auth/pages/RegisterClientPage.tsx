'use client';

import { useState } from "react";
import { registerUser } from "@/services/userService";

export default function RegisterClientPage() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp");
      return;
    }

    const response = await registerUser({
      fullName: form.fullName,
      username: form.username,
      email: form.email,
      password: form.password,
    });

    if (response.ok) {
      setMessage("Đăng ký tài khoản thành công");
      setForm({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setMessage("Đăng ký tài khoản thất bại");
    }
  }

  const inputClassName =
    "w-full rounded-2xl border border-cyan-400/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20";

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,#0ea5e9_0%,#020617_35%,#020617_100%)] px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-cyan-400/20 bg-white/10 shadow-[0_0_60px_rgba(14,165,233,0.25)] backdrop-blur-xl md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Course App
            </p>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Tạo tài khoản mới
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
              Đăng ký tài khoản để bắt đầu học các khóa học và khám phá những
              kiến thức mới cùng Course App.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="m-4 rounded-[28px] border border-white/10 bg-slate-950/70 p-7 shadow-2xl md:m-6 md:p-9"
          >
            <div className="mb-6">
              <p className="text-sm font-medium text-cyan-300">Chào mừng bạn</p>
              <h2 className="mt-2 text-2xl font-bold">Đăng ký tài khoản</h2>
              <p className="mt-2 text-sm text-slate-400">
                Nhập đầy đủ thông tin để tạo tài khoản.
              </p>
            </div>

            <div className="space-y-4">
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Họ và tên"
                className={inputClassName}
                required
              />

              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Tên đăng nhập"
                className={inputClassName}
                required
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={inputClassName}
                required
              />

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mật khẩu"
                className={inputClassName}
                required
              />

              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu"
                className={inputClassName}
                required
              />

              {message && (
                <p className="text-center text-sm text-cyan-200">{message}</p>
              )}

              <button
                type="submit"
                className="mt-2 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-6 py-4 font-bold text-white shadow-[0_0_30px_rgba(14,165,233,0.45)] transition hover:scale-[1.02] hover:from-blue-500 hover:to-cyan-300 active:scale-[0.98]"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
