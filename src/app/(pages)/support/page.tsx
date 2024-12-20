"use client";

import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";

interface TicketDetails {
  subject: string;
  description: string;
}

export default function TicketPage() {
  const [ticketDetails, setTicketDetails] = useState<TicketDetails>({
    subject: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTitleChange = (value: string) => {
    setTicketDetails((prev) => ({
      ...prev,
      subject: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setTicketDetails((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleSubmit = async () => {
    if (!ticketDetails.subject || !ticketDetails.description) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/api/tickets", ticketDetails);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketDetails({ subject: "", description: "" });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsSubmitting(false);
      setErrorMessage("Failed to submit ticket. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card shadow="sm" className="p-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h2 className="text-2xl font-bold">Submit Support Ticket</h2>
              <p className="text-small text-default-500 mb-2 mt-2">
                Describe the issue you&apos;re experiencing
              </p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <div className="grid gap-4">
                <Input
                  label="Ticket subject"
                  placeholder="Enter ticket subject"
                  value={ticketDetails.subject}
                  onValueChange={handleTitleChange}
                  variant="bordered"
                  errorMessage={
                    errorMessage && !ticketDetails.subject
                      ? "Subject is required"
                      : ""
                  }
                />

                <Textarea
                  label="Description"
                  placeholder="Provide detailed description of your issue"
                  value={ticketDetails.description}
                  onValueChange={handleDescriptionChange}
                  variant="bordered"
                  minRows={4}
                  errorMessage={
                    errorMessage && !ticketDetails.description
                      ? "Description is required"
                      : ""
                  }
                />
              </div>
            </CardBody>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="bordered" color="default">
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isSubmitting}
                isDisabled={
                  isSubmitting ||
                  ticketDetails.description === "" ||
                  ticketDetails.subject === ""
                }
              >
                Submit Ticket
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>

      <Modal isOpen={isSubmitted} onOpenChange={setIsSubmitted} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Ticket Submitted Successfully
              </ModalHeader>
              <ModalBody>
                <p>
                  Your support ticket has been created. Our team will review it
                  shortly and reply directly to your email.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
