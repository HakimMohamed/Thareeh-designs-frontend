"use client";

import { NextUIProvider } from "@nextui-org/react";
import AppNavBar from "../app/components/Navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <div className="w-full mb-4">
        <AppNavBar />
      </div>
      <div className="w-full">
        <div className="flex flex-col items-center w-full  mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </NextUIProvider>
  );
}
