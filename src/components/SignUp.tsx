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
  GoogleIcon,
  EyeSlashFilledIcon,
  EyeFilledIcon,
} from "./icons/Icons";
import { useAuthModal } from "../stores/auth-modal";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth";

export default function SignUp() {
  const { setIsOpen, isOpen } = useAuthModal();
  console.log(isOpen);
  const { register, completeRegistration } = useAuthStore();
  const [step, setStep] = useState<"email" | "details">("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null | unknown>(null);

  const handleSendOtp = async () => {
    setError(null); // Reset any existing errors
    setLoading(true); // Start loading
    try {
      // Simulate an API call or replace this with your actual logic
      await register({ email });
      setStep("details"); // Move to the next step
    } catch (err: any) {
      setError(err || "An unexpected error occurred"); // Handle and display error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setLoading(true);
    try {
      await completeRegistration({ email, password, otp, firstName, lastName });
      setLoading(false);
      return true;
      // setStep("details");
    } catch (err: string | unknown) {
      setError(err);
      setLoading(false);
      return false;
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setIsOpen(false);
        }
      }}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
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
                  <div className="flex items-center justify-center">
                    <Button
                      className="w-full bg-black text-white font-medium rounded-lg py-2"
                      onPress={() => {
                        handleSendOtp();
                      }}
                      isLoading={loading}
                    >
                      Sign up
                    </Button>
                  </div>
                  <div className="mb-4">
                    <Button
                      className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
                      color="primary"
                      variant="bordered"
                    >
                      {GoogleIcon({ className: "w-5 h-5" })} Sign up with Google
                    </Button>
                  </div>

                  <p className="text-center text-sm text-gray-600 mb-4">
                    Already have an account?{" "}
                    <span className="text-blue-500 font-medium cursor-pointer hover:underline">
                      Sign in
                    </span>
                  </p>
                  <p className="text-red-600">{(error as string) || ""}</p>
                </>
              )}

              {step === "details" && (
                <>
                  <p className="text-center text-sm text-gray-600 mb-4">
                    Complete your profile
                  </p>
                  <Input
                    label="Email"
                    value={email}
                    variant="bordered"
                    isDisabled
                    type="email"
                    className="mb-4"
                  />
                  <Input
                    label="First Name"
                    placeholder="Enter your first name"
                    variant="bordered"
                    className="mb-4"
                    type="text"
                    value={firstName}
                    onValueChange={setFirstName}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Enter your last name"
                    variant="bordered"
                    className="mb-4"
                    type="text"
                    autoComplete="new-last-name"
                    value={lastName}
                    onValueChange={setLastName}
                  />
                  <Input
                    label="Password"
                    variant="bordered"
                    placeholder="Enter your password"
                    value={password}
                    defaultValue=""
                    autoComplete="new-password"
                    onValueChange={setPassword}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                  />

                  <p className="text-center text-sm text-gray-600 mb-4">
                    Enter the OTP sent to your email
                  </p>
                  <Input
                    autoFocus
                    label="OTP"
                    placeholder="Enter OTP"
                    variant="bordered"
                    className="mb-4"
                    value={otp}
                    onValueChange={setOtp}
                  />
                  <Button
                    className="w-full bg-black text-white font-medium rounded-lg py-2"
                    isDisabled={
                      !firstName ||
                      !lastName ||
                      !password ||
                      !otp ||
                      otp.length !== 4
                    }
                    isLoading={loading}
                    onPress={async () => {
                      const success = await handleVerifyOtp();
                      if (success) {
                        onClose();
                      }
                    }}
                  >
                    Submit
                  </Button>
                  <p className="text-red-600">{(error as string) || ""}</p>
                </>
              )}
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
