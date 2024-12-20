/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Input,
  InputOtp,
  Form,
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
  const [otp, setOtp] = useState("");
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
      await verifyOtp({ email, otp }); // Call the verifyOtp method from the auth store
      setSignInIsOpen(false);
      window.location.reload();
    } catch (err: string | unknown) {
      console.log("err");
      setError(err || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false); // Stop loading
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
                      <Button
                        className="focus:outline-none"
                        onPress={togglePasswordVisibility}
                        aria-label="Toggle password visibility"
                      >
                        {isPasswordVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </Button>
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
                <Form
                  className="flex justify-content items-center"
                  validationBehavior="native"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleVerifyOtp();
                  }}
                >
                  <p className="text-center text-sm text-gray-600 mb-4">
                    Enter the OTP sent to your email
                  </p>
                  <InputOtp
                    isRequired
                    size="lg"
                    aria-label="OTP input field"
                    length={4}
                    name="otp"
                    placeholder="Enter code"
                    validationBehavior="native"
                    value={otp}
                    onValueChange={setOtp}
                    className="mb-4"
                  />
                  <Button
                    className="w-full bg-black text-white font-medium rounded-lg py-2"
                    onPress={handleVerifyOtp}
                    type="submit"
                    isDisabled={otp.length !== 4}
                    isLoading={loading}
                  >
                    Verify OTP
                  </Button>
                </Form>
              )}
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
