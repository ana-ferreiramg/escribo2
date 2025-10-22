"use client";

import Image from "next/image";

export default function Signup() {
  return (
    <div id="root">
      <div className="min-h-screen w-full">
        <div className="grid min-h-screen grid-cols-12 place-items-center p-6">
          <div className="col-span-full flex w-full max-w-[348px] flex-col items-center lg:col-span-12">
            <Image src="/bird_logo.png" alt="logo" width={70} height={70} />
            <h1 className="my-6 font-display text-2xl font-semibold tracking-tighter">Dashboard</h1>

          </div>
        </div>
      </div>
    </div >
  );
}
