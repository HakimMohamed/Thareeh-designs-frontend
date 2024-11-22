"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { MailIcon, LockIcon } from "./icons/Icons";
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
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
              />
              <Input
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Remember me
                </Checkbox>
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  setIsOpen(false);
                  onClose();
                }}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  setIsOpen(false);
                  onClose();
                }}
              >
                Sign in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
// const { isOpen, setIsOpen } = useIsAuthenticated();
