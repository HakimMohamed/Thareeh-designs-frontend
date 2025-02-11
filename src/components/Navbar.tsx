"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Input,
  Popover,
  PopoverTrigger,
  Badge,
  PopoverContent,
  NavbarMenu,
  NavbarMenuItem,
  Modal,
  useDisclosure,
  ModalContent,
  ModalBody,
  ModalFooter,
  Card,
} from "@nextui-org/react";
import { Cart } from "./icons/Icons";
import { PrinterLogo } from "./PrinterLogo";
import {
  IconHomeLink,
  IconLifebuoy,
  IconLogout,
  IconPackage,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useCartStore from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import { useAuthModal } from "@/stores/auth-modal";
// import { useAuthModal } from "@/stores/auth-modal";
import SearchIcon from "@mui/icons-material/Search";
import CartModal from "./CartModal";
import { ItemService } from "@/services/items";
import { Item } from "@/interfaces/Item.interface";
import ItemsSearchResults from "./ItemsSearch";

export default function App() {
  const pathname = usePathname();
  const { user, logout, fetchUser } = useAuthStore();
  const { setSignInIsOpen } = useAuthModal.getState();
  const router = useRouter();
  const isActivePathStartsWith = (path: string) => {
    return pathname.startsWith(path);
  };

  const menuItems = [
    { title: "home", path: "/" },
    { title: "Categories", path: "/categories" },
    { title: "Deals", path: "/deals" },
    { title: "Test2", path: "/test2" },
  ];

  const { fetchCart, cart, isLoading } = useCartStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const [isOpen, setIsOpen] = useState(false);
  const {
    onClose: onSearchModalClose,
    isOpen: isSearchModalOpen,
    onOpenChange,
  } = useDisclosure();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleSearchChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      const query = e.target.value;
      setSearchQuery(query);

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const newTimeout = setTimeout(async () => {
        try {
          const result = await ItemService.getItemsSearchResults(query);

          setSearchResults(result);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }, 500);

      setDebounceTimeout(newTimeout);
    },
    [debounceTimeout]
  );

  return (
    <Navbar
      isBordered
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
        menu: [
          "z-30",
          "px-6",
          "pt-2",
          "fixed",
          "flex",
          "max-w-full",
          "top-[var(--navbar-height)]",
          "inset-x-0",
          "bottom-0",
          "w-screen",
          "flex-col",
          "gap-2",
          "overflow-y-auto",
          "bg-white",
        ],
      }}
      className="sticky bg-white shadow mb-4"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent justify="start">
        <Button
          className="bg-transparent rounded transition-colors"
          size="lg"
          onPress={() => router.push("/")}
        >
          <NavbarBrand>
            <div className="flex items-center">
              <PrinterLogo />
              <p className="hidden sm:block font-bold text-inherit">
                Thareeh Designs
              </p>
            </div>
          </NavbarBrand>
        </Button>
      </NavbarContent>
      <div className="relative hidden sm:flex md:flex justify-center">
        <div className="w-full sm:w-[200px] md:w-[300px]">
          <Input
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const queryParams = new URLSearchParams(
                  window.location.href.split("?")[1]
                );
                queryParams.set("text", searchQuery);
                router.push(`/?${queryParams.toString()}`);
                onSearchModalClose();
              }
            }}
            classNames={{
              base: "h-10 w-full",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="sm"
            startContent={<SearchIcon />}
            type="search"
          />
        </div>
        {searchQuery && searchResults && searchResults.length > 0 && (
          <Card className="absolute top-full mt-2 w-full sm:w-[500px] z-10">
            <ul className="space-y-4">
              <ItemsSearchResults
                searchResults={searchResults}
                setSearchQuery={setSearchQuery}
                onSearchModalClose={onSearchModalClose}
              />
            </ul>
          </Card>
        )}
      </div>

      <Button
        startContent={<SearchIcon />}
        size="sm"
        variant="light"
        className="hover:opacity-100 sm:hidden"
        onPress={() => onOpenChange()}
      />

      <Modal
        isOpen={isSearchModalOpen}
        onClose={onSearchModalClose}
        placement="top"
      >
        <ModalContent>
          <ModalBody>
            <Input
              label="Search"
              className="mt-4"
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search"
            />
            <div className="mt-4">
              {searchResults.length > 0 ? (
                <ul className="space-y-4">
                  <ItemsSearchResults
                    searchResults={searchResults}
                    setSearchQuery={setSearchQuery}
                    onSearchModalClose={onSearchModalClose}
                  />
                </ul>
              ) : (
                <p>Start Searching</p>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onPress={() => {
                const queryParams = new URLSearchParams(
                  window.location.href.split("?")[1]
                );
                queryParams.set("text", searchQuery);
                router.push(`/?${queryParams.toString()}`);
                onSearchModalClose();
              }}
            >
              View
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <NavbarContent as="div" className="items-center" justify="end">
        <Popover
          placement="bottom-end"
          backdrop="transparent"
          offset={20}
          showArrow
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
        >
          <PopoverTrigger>
            <Button className="relative bg-transparent">
              <Badge
                content={cart?.items?.length || 0}
                shape="circle"
                color="primary"
                size="md"
              >
                <Cart size={28} />
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <CartModal cart={cart} setPopOverIsOpen={setIsOpen} />
          </PopoverContent>
        </Popover>
        {/* User Avatar and Dropdown */}
        <Dropdown placement="bottom-end">
          {user ? (
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                disabled={isLoading}
                name={user ? user.email.split("@")[0].toUpperCase() : "JH"}
                style={{
                  borderRadius: "50%",
                  width: "35px",
                  height: "35px",
                  flexShrink: 0,
                }}
              />
            </DropdownTrigger>
          ) : (
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              disabled={isLoading}
              onClick={() => {
                if (!user) {
                  setSignInIsOpen(true);
                }
              }}
              name={"JH"}
              style={{
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                flexShrink: 0,
              }}
            />
          )}

          {user && (
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-7 gap-2">
                <p className="font-semibold">{user?.email || ""}</p>
              </DropdownItem>
              <DropdownItem
                key="my-orders"
                onPress={() => router.push("/orders")}
              >
                <div className="flex items-center gap-2">
                  <IconPackage size={24} stroke={1} />
                  <p>My Orders</p>
                </div>
              </DropdownItem>
              <DropdownItem
                key="addresses"
                onPress={() => router.push("/addresses")}
              >
                <div className="flex items-center gap-2">
                  <IconHomeLink size={24} stroke={1} />
                  <p>Addresses</p>
                </div>
              </DropdownItem>
              <DropdownItem
                key="support"
                onPress={() => router.push("/support")}
              >
                <div className="flex items-center gap-2">
                  <IconLifebuoy size={24} stroke={1} />
                  <p>Support</p>
                </div>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={logout}>
                <div className="flex items-center gap-2">
                  <IconLogout size={24} stroke={1} />
                  <p>Log Out</p>
                </div>
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link href={item.path}>
              <Button
                className={`bg-transparent ${
                  isActivePathStartsWith(item.path) ? "text-blue-500" : ""
                }`}
              >
                {item.title}
              </Button>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
