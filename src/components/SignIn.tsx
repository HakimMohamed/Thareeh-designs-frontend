/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Input,
} from "@nextui-org/react";
import {
  MailIcon,
  EyeSlashFilledIcon,
  EyeFilledIcon,
  GoogleIcon,
} from "./icons/Icons";
import { useAuthModal } from "../stores/auth-modal";
import { useAuthStore } from "@/stores/auth";
import { useState } from "react";

export default function SignIn() {
  const { setSignInIsOpen, signInIsOpen, setSignUpIsOpen } = useAuthModal();
  const { login, verifyOtp } = useAuthStore(); // Retain the auth store calls
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null | unknown>(null);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleSendOtp = async () => {
    setError(null); // Reset any existing errors
    setLoading(true); // Start loading
    try {
      // Call the login method from the auth store
      await login({ email, password });
      setStep("otp"); // Move to the OTP step
    } catch (err: any) {
      setError(err || "An unexpected error occurred"); // Handle and display error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleVerifyOtp = async () => {
    setError(null); // Reset any existing errors
    setLoading(true); // Start loading
    try {
      const enteredOtp = otp.join(""); // Combine OTP digits into a single string
      await verifyOtp({ email, otp: enteredOtp }); // Call the verifyOtp method from the auth store
      setSignInIsOpen(false);
      window.location.reload();
    } catch (err: string | unknown) {
      console.log("err");
      setError(err || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input if a digit is entered
      if (value !== "" && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").replace(/\D/g, ""); // Extract only digits
    if (pasteData.length === otp.length) {
      const newOtp = pasteData.split("").slice(0, otp.length);
      setOtp(newOtp);

      // Automatically move focus to the last field
      const lastInput = document.getElementById(`otp-${newOtp.length - 1}`);
      lastInput?.focus();
    }
  };

  return (
    <Modal
      isOpen={signInIsOpen}
      onOpenChange={(open) => {
        if (!open) {
          setSignInIsOpen(false);
        }
      }}
      placement="top-center"
    >
      <ModalContent>
        {() => (
          <div className="p-4 pt-10">
            <ModalBody>
              {step === "email" && (
                <>
                  <Input
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-gray-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Email"
                    placeholder="Enter your email"
                    variant="bordered"
                    className="mb-4"
                    autoComplete="email"
                    value={email}
                    onValueChange={setEmail}
                  />
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    variant="bordered"
                    className="mb-4"
                    value={password}
                    onValueChange={setPassword}
                    type={isPasswordVisible ? "text" : "password"}
                    endContent={
                      <button
                        className="focus:outline-none"
                        onClick={togglePasswordVisibility}
                        aria-label="Toggle password visibility"
                      >
                        {isPasswordVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                  <p className="text-center text-sm text-gray-600 mb-4">
                    Already have an account?{" "}
                    <span
                      className="text-blue-500 font-medium cursor-pointer hover:underline"
                      onClick={() => {
                        setSignInIsOpen(false);
                        setSignUpIsOpen(true);
                      }}
                    >
                      Sign up
                    </span>
                  </p>
                  <div className="flex items-center justify-center">
                    <Button
                      className="w-full bg-black text-white font-medium rounded-lg py-2"
                      onPress={handleSendOtp}
                      isLoading={loading}
                      isDisabled={!email || !password}
                    >
                      Sign in
                    </Button>
                  </div>
                  <div className="mb-4">
                    <Button
                      className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
                      color="primary"
                      variant="bordered"
                    >
                      {GoogleIcon({ className: "w-5 h-5" })} Sign in with Google
                    </Button>
                  </div>
                  <p className="text-red-600 mt-2">{(error as string) || ""}</p>
                </>
              )}

              {step === "otp" && (
                <>
                  <p className="text-center text-sm text-gray-600 mb-4">
                    Enter the OTP sent to your email
                  </p>
                  <div className="flex justify-center gap-2 mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:border-blue-500"
                      />
                    ))}
                  </div>

                  <Button
                    className="w-full bg-black text-white font-medium rounded-lg py-2"
                    onPress={handleVerifyOtp}
                    isDisabled={otp.some((digit) => digit === "")}
                    isLoading={loading}
                  >
                    Verify OTP
                  </Button>
                  <p className="text-red-600 mt-2">{(error as string) || ""}</p>
                </>
              )}
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
