import { NextUIProvider } from "@nextui-org/react";
import AppNavBar from "../components/Navbar";
import AdvertisingCard from "../components/AdvertisingCard";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AdvertisingCard />
      <AppNavBar />
      <SignUp />
      <SignIn />
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-full mb-8">
        <div className="flex flex-col items-center w-full  mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </NextUIProvider>
  );
}
