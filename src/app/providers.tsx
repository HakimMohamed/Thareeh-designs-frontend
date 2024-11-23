import { NextUIProvider } from "@nextui-org/react";
import AppNavBar from "../components/Navbar";
import AdvertisingCard from "../components/AdvertisingCard";
import SignUp from "../components/SignUp";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AdvertisingCard />
      <div className="mb-4">
        <AppNavBar />
      </div>
      <SignUp />
      <div className="w-full">
        <div className="flex flex-col items-center w-full  mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </NextUIProvider>
  );
}
