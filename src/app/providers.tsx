"use client";

import { NextUIProvider } from "@nextui-org/react";
import AppNavBar from "../app/components/Navbar";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AppNavBar />
      {children}
    </NextUIProvider>
  );
}
