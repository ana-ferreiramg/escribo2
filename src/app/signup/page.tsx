"use client";

import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      showMessage(`Erro: ${error.message}`);
    } else {
      const userId = data.user?.id;

      if (userId) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL}/registerUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
              "name": "Functions"
            },
            body: JSON.stringify({ user_id: userId, name, email }),
          }
        );

        const result = await res.json();

        if (!res.ok) {
          const errorMsg = result.error || "Erro desconhecido ao salvar usuário";
          showMessage(errorMsg);
          return;
        }
      }
      showMessage("Cadastro realizado com sucesso! Verifique seu email.");
    }
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
            <h1 className="my-6 font-display text-2xl font-semibold tracking-tighter">Crie sua conta</h1>
            <form onSubmit={handleRegister} className="flex w-full flex-col gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors duration-300">Nome</label>
                <input name="name" type="text" className="flex h-10 w-full rounded-lg border border-navy-black-700 bg-input px-3 py-2.5 text-sm caret-primary transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-sky-500" id="name" value={name} onChange={(e) => setName(e.target.value)}
                  required />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors duration-300">E-mail</label>
                <input name="email" type="email" className="flex h-10 w-full rounded-lg border border-navy-black-700 bg-input px-3 py-2.5 text-sm caret-primary transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-sky-500" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  required />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors duration-300">Senha</label>
                <input name="password" type="password" className="flex h-10 w-full rounded-lg border border-navy-black-700 bg-input px-3 py-2.5 text-sm caret-primary transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 pr-10 focus-visible:ring-sky-500" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>

              <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all focus-visible:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-transparent overflow-hidden relative bg-primary text-primary-foreground hover:bg-brand-seagull-500 active:bg-brand-seagull-500 px-4 py-[7px] text-base mt-2 min-h-10">
                <span className="inline-flex items-center justify-center gap-2">Cadastrar</span>
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
    </div >
  );
}
