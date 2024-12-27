"use client";
import { IAddress } from "@/interfaces/address.interface";
import { AddressService } from "@/services/address";

import {
  Button,
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Spacer,
} from "@nextui-org/react";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

const AddressesPage = () => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true); // Set loading to true before the fetch
      try {
        const result = await AddressService.getAddresses();
        setAddresses(result);
        setError(null);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setError("Failed to load addresses. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchAddresses();
  }, [refreshCounter]);

  const handleDelete = async () => {
    if (addressToDelete) {
      try {
        await AddressService.removeAddress(addressToDelete);
        setRefreshCounter((prev) => prev + 1);
        setAddressToDelete(null); // Reset the delete state
      } catch (error) {
        console.error("Error deleting address:", error);
        setError("Failed to delete the address. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-screen-xl">
      {addresses && (
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Addresses</h1>
          <Button className="flex items-center gap-2">
            <IconPlus className="w-4 h-4" />
            Add New Address
          </Button>
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-gray-600 text-center">
            <p className="font-semibold text-xl">
              You haven&apos;t added any addresses yet!
            </p>
            <Spacer y={0.5} />
            <p className="text-gray-500">
              Add an address to start receiving orders to your preferred
              location.
            </p>
          </div>
          <Button
            className="mt-4 flex items-center gap-2"
            onPress={() => console.log("Redirecting to Add Address Page")}
          >
            <IconPlus className="w-4 h-4" />
            Add New Address
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {addresses.map((address) => (
            <Card key={address._id} className="bg-white">
              <CardBody>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {address.region}
                    </h3>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      size="sm"
                      className="flex items-center gap-2"
                      onPress={() => console.log(address._id)}
                    >
                      <IconPencil className="w-4 h-4" />
                      Edit
                    </Button>
                    <Popover
                      onOpenChange={(open: boolean) => {
                        if (open) setAddressToDelete(address._id!);
                      }}
                    >
                      <PopoverTrigger key={address._id}>
                        <Button
                          size="sm"
                          className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          <IconTrash className="w-4 h-4" />
                          Delete
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="p-4 space-y-4">
                          <p className="text-gray-700">
                            Are you sure you want to delete this address?
                          </p>
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              className="text-gray-500"
                              onPress={() => setAddressToDelete(null)} // Reset onPress as well
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onPress={handleDelete} // Deletion onPress
                            >
                              Confirm
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-gray-600">
                  <p>{`${address.name.first} ${address.name.last}`}</p>
                  <p>{address.city}</p>
                  {address.postalCode && <p>{address.postalCode}</p>}
                  <p>{`${address.city}, ${address.country}`}</p>
                  <p>{address.phone}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressesPage;
