"use client";

import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showMessage(`Erro: ${error.message}`);
      return;
    }

    showMessage("Login realizado com sucesso!");
    router.push("/dashboard");
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div id="root">
      <div className="min-h-screen w-full">
        <div className="grid min-h-screen grid-cols-12 place-items-center p-6">
          <div className="col-span-full flex w-full max-w-[348px] flex-col items-center lg:col-span-12">
            <Image src="/bird_logo.png" alt="logo" width={70} height={70} />
            <h1 className="my-6 font-display text-2xl font-semibold tracking-tighter">Faça login</h1>
            <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-lg border border-navy-black-700 bg-input px-3 py-2.5 text-sm caret-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium">Senha</label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-lg border border-navy-black-700 bg-input px-3 py-2.5 text-sm caret-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full font-medium bg-primary text-primary-foreground px-4 py-[7px] mt-2 text-base min-h-10 hover:bg-brand-seagull-500"
              >
                Entrar
              </button>
              {message && (
                <div className="mt-4 w-full max-w-md bg-green-100 text-green-800 rounded-lg p-4 text-center">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
