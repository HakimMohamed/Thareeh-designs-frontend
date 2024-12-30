/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { IAddress } from "@/interfaces/address.interface";
import { AddressService } from "@/services/address";

import {
  Button,
  Card,
  CardBody,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Spacer,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
  Modal,
  useDisclosure,
  Form,
  RadioGroup,
  Autocomplete,
  AutocompleteItem,
  Radio,
} from "@nextui-org/react";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddressesPage = () => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<IAddress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchAddresses = async () => {
      if (refreshCounter === 0) setLoading(true);
      try {
        const result = await AddressService.getAddresses();
        setAddresses(result);
        setError(null);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setError("Failed to load addresses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [refreshCounter]);

  const handleDelete = async () => {
    if (addressToDelete) {
      toast.loading("Deleting address...");
      try {
        await AddressService.removeAddress(addressToDelete);
        setRefreshCounter((prev) => prev + 1);
        toast.dismiss();
        toast.success("Address deleted successfully!");
        setAddressToDelete(null);
      } catch (error) {
        console.error("Error deleting address:", error);
        toast.dismiss();
        toast.error("Failed to delete the address. Please try again.");
      }
    }
  };

  const handleEditClick = (address: IAddress) => {
    setEditingAddressId(address._id!);
    setEditForm({ ...address }); // Clone the address to edit form
  };

  const handleEditChange = (field: keyof IAddress | string, value: string) => {
    if (editForm) {
      if (field.includes(".")) {
        // Handle nested fields like 'name.first'
        const [parentField, childField] = field.split(".");
        setEditForm((prev) =>
          prev
            ? {
                ...prev,
                [parentField]: {
                  ...(prev[parentField as keyof IAddress] as object),
                  [childField]: value,
                },
              }
            : null
        );
      } else {
        // Handle top-level fields
        setEditForm((prev) => (prev ? { ...prev, [field]: value } : null));
      }
    }
  };

  const handleSave = async () => {
    if (editForm) {
      toast.loading("Saving address...");
      try {
        await AddressService.updateAddress(editForm);
        setRefreshCounter((prev) => prev + 1);
        setEditingAddressId(null);
        setEditForm(null);
        toast.dismiss();
        toast.success("Address saved successfully!");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response.status === 400) {
          toast.dismiss();
          toast.error(error.response.data.message);
        } else {
          console.error("Error saving address:", error);
          toast.dismiss();
          toast.error("Failed to save the address. Please try again.");
        }
      }
    }
  };

  useEffect(() => {
    const isFormChanged =
      JSON.stringify(editForm) !==
      JSON.stringify(addresses.find((a) => a._id === editingAddressId));

    setIsSaveDisabled(!isFormChanged);
  }, [addresses, editForm, editingAddressId]);

  const [formData, setFormData] = useState<IAddress>({
    // email: "",
    city: "",
    country: "",
    name: { first: "", last: "" },
    phone: "",
    postalCode: "",
    region: "",
    type: "home",
    details: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: any) => {
    const { name, type, value, checked } = event.target;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      // Handle checkboxes correctly
      set(updatedFormData, name, type === "checkbox" ? checked : value);
      return updatedFormData;
    });
  };

  const countries = [
    {
      label: "Egypt",
      key: "egypt",
    },
  ];

  return (
    <>
      <div className="w-full max-w-screen-xl">
        {addresses && (
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Addresses</h1>
            <Button className="flex items-center gap-2" onPress={onOpen}>
              <IconPlus className="w-4 h-4" />
              Add New Address
            </Button>
          </div>
        )}

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
                      {editingAddressId === address._id ? (
                        <>
                          <Button
                            size="sm"
                            className="flex items-center gap-2"
                            onPress={handleSave}
                            isDisabled={isSaveDisabled}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            className="flex items-center gap-2"
                            onPress={() => setEditingAddressId(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          className="flex items-center gap-2"
                          onPress={() => handleEditClick(address)}
                        >
                          <IconPencil className="w-4 h-4" />
                          Edit
                        </Button>
                      )}
                      <Popover
                        onOpenChange={(open) => {
                          if (open) setAddressToDelete(address._id!);
                        }}
                      >
                        <PopoverTrigger>
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
                                onPress={() => setAddressToDelete(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onPress={handleDelete}
                              >
                                Confirm
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-gray-600 max-w-[300px]">
                    {editingAddressId === address._id ? (
                      <>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            Province
                          </label>
                          <Input
                            value={editForm?.region || ""}
                            onChange={(e) =>
                              handleEditChange("region", e.target.value)
                            }
                            placeholder="Enter region"
                            className="text-lg font-semibold text-gray-900"
                          />
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            First Name
                          </label>
                          <Input
                            value={editForm?.name?.first || ""}
                            onChange={(e) =>
                              handleEditChange("name.first", e.target.value)
                            }
                            placeholder="Enter first name"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            Last Name
                          </label>
                          <Input
                            value={editForm?.name?.last || ""}
                            onChange={(e) =>
                              handleEditChange("name.last", e.target.value)
                            }
                            placeholder="Enter last name"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            City
                          </label>
                          <Input
                            value={editForm?.city || ""}
                            onChange={(e) =>
                              handleEditChange("city", e.target.value)
                            }
                            placeholder="Enter city"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            Postal Code
                          </label>
                          <Input
                            value={editForm?.postalCode || ""}
                            onChange={(e) =>
                              handleEditChange("postalCode", e.target.value)
                            }
                            placeholder="Enter postal code"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            Country
                          </label>
                          <Input
                            value={editForm?.country || ""}
                            onChange={(e) =>
                              handleEditChange("country", e.target.value)
                            }
                            placeholder="Enter country"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            Phone
                          </label>
                          <Input
                            value={editForm?.phone || ""}
                            onChange={(e) =>
                              handleEditChange("phone", e.target.value)
                            }
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            Details
                          </label>
                          <Input
                            value={editForm?.details || ""}
                            onChange={(e) =>
                              handleEditChange("details", e.target.value)
                            }
                            placeholder="Enter additional details"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <p>{`${address.name.first} ${address.name.last}`}</p>
                        <p>{address.city}</p>
                        {address.postalCode && <p>{address.postalCode}</p>}
                        <p>{`${address.city}, ${address.country}`}</p>
                        <p>{address.phone}</p>
                        {address.details && <p>{address.details}</p>}
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Form
                  validationBehavior="native"
                  className="grid grid-cols-1 gap-4"
                  onSubmit={async (event) => {
                    console.log(formData);
                    event.preventDefault();
                    try {
                      toast.loading("Submitting...");
                      await AddressService.addNewAddress(formData);
                      toast.dismiss();
                      toast.success("Address added successfully!");
                      setRefreshCounter((prev) => prev + 1);
                      onClose();
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } catch (err: any) {
                      toast.error("Something went wrong!");
                    }
                  }}
                >
                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      isRequired
                      name="name.first"
                      className="w-full"
                      label="First Name"
                      variant="bordered"
                      value={formData.name.first}
                      onChange={handleInputChange}
                    />
                    <Input
                      isRequired
                      name="name.last"
                      label="Last Name"
                      variant="bordered"
                      value={formData.name.last}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <Autocomplete
                      defaultItems={countries}
                      label="Country"
                      name="country"
                      autoComplete="country"
                      value={formData.country}
                      onInputChange={(key) => {
                        handleInputChange({
                          target: { name: "country", value: key },
                        });
                      }}
                      onSelectionChange={(key) =>
                        handleInputChange({
                          target: { name: "country", value: key },
                        })
                      }
                    >
                      {(item) => (
                        <AutocompleteItem key={item.key}>
                          {item.label}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>

                    <Input
                      isRequired
                      name="region"
                      label="Province"
                      variant="bordered"
                      value={formData.region}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      isRequired
                      name="city"
                      label="City"
                      variant="bordered"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="postalCode"
                      label="Postal Code"
                      variant="bordered"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      name="details"
                      label="Address Details"
                      placeholder="House number, street name, etc."
                      variant="bordered"
                      value={formData.details}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="phone"
                      label="Phone Number"
                      placeholder="123-456-7890"
                      variant="bordered"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mt-2">
                    <RadioGroup
                      color="primary"
                      label="Address type"
                      name="type"
                      orientation="horizontal"
                      value={formData.type}
                      onChange={handleInputChange}
                      classNames={{
                        wrapper: "gap-6",
                      }}
                    >
                      <Radio value="home">
                        Home
                        <div className="text-sm text-default-500">
                          All Day Delivery
                        </div>
                      </Radio>
                      <Radio value="office">
                        Office
                        <div className="text-sm text-default-500">
                          Delivery Between 9am to 6pm
                        </div>
                      </Radio>
                    </RadioGroup>
                  </div>

                  <button type="submit" className="hidden" id="form-submit" />
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    document.getElementById("form-submit")?.click();
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddressesPage;
