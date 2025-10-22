"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md p-4 flex justify-between items-center bg-background">
      <Image src="/bird_logo.png" alt="logo" width={45} height={45} />

      <nav className="hidden md:flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/about">Sobre</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </nav>

      <button
        className="bt-menu md:hidden inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all focus-visible:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-transparent overflow-hidden relative bg-primary text-primary-foreground hover:bg-brand-seagull-500 active:bg-brand-seagull-500 px-4 py-[7px] text-base mt-2 min-h-10 bg-background)]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {isOpen && (
        <div className="bg-background absolute top-16 right-4 border border-navy-black-700  rounded-md shadow-md w-40 flex flex-col p-4 gap-2 md:hidden">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>Sobre</Link>
          <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link href="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
        </div>
      )}
    </header>
  );
}
