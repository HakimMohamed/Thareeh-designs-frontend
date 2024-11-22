"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { MailIcon, LockIcon, GoogleIcon } from "./icons/Icons";
import { useIsAuthenticated } from "../stores/auth-model";

export default function App() {
  const { setIsOpen, isOpen } = useIsAuthenticated();

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
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-gray-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                className="mb-4"
              />
              <Input
                endContent={
                  <LockIcon className="text-2xl text-gray-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                className="mb-4"
              />
              <div className="flex justify-between items-center mb-3">
                <Checkbox
                  classNames={{
                    label: "text-sm text-gray-700",
                  }}
                >
                  Remember me
                </Checkbox>
                <Link
                  className="text-sm font-medium text-blue-500 hover:underline"
                  href="#"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  className="w-full bg-black text-white font-medium rounded-lg py-2"
                  onPress={() => {
                    setIsOpen(false);
                    onClose();
                  }}
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

              <p className="text-center text-sm text-gray-600 mb-4">
                Don&apos;t have an account?{" "}
                <span className="text-blue-500 font-medium cursor-pointer hover:underline">
                  Sign Up
                </span>
              </p>
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
