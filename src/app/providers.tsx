"use client";

import { NextUIProvider } from "@nextui-org/react";
import AppNavBar from "../app/components/Navbar";
import Filters from "./components/Filters";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <div className="flex flex-col min-h-screen w-full">
        <div className="w-full mb-4">
          <AppNavBar />
        </div>

        <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full mb-4">
            <Filters />
          </div>
          {children}
        </div>
      </div>
    </NextUIProvider>
  );
}
