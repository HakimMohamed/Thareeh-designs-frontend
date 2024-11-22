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
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Cart } from "./icons/Icons.jsx";
import { PrinterLogo } from "./PrinterLogo.jsx";
import { SearchIcon } from "./SearchIcon.jsx";
import {
  IconCreditCard,
  IconHearts,
  IconHomeLink,
  IconLifebuoy,
  IconLogout,
  IconPackage,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { IFormattedCart } from "../interfaces/cart.interface.jsx";

export default function App() {
  const pathname = usePathname();

  const isActivePathStartsWith = (path: string) => {
    return pathname.startsWith(path);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { title: "home", path: "/" },
    { title: "Categories", path: "/categories" },
    { title: "Deals", path: "/deals" },
    { title: "Test2", path: "/test2" },
  ];
  const [cart, setCart] = useState<IFormattedCart>({
    _id: "",
    _user: "",
    items: [],
    price: 0,
    originalPrice: 0,
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cart`
        );
        setCart(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, []);
  return (
    <Navbar
      isBordered
      onMenuOpenChange={setIsMenuOpen}
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
      className="sticky top-0 z-50 bg-white shadow"
      maxWidth="xl"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link href="/">
          <Button
            className="bg-transparent rounded transition-colors"
            size="lg"
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
        </Link>
      </NavbarContent>
      <Input
        classNames={{
          base: "max-w-[500px] h-10 sm:flex",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Search..."
        size="sm"
        startContent={
          <SearchIcon size={18} width={undefined} height={undefined} />
        }
        type="search"
      />
      <NavbarContent as="div" className="items-center" justify="end">
        <Popover placement="bottom-end" backdrop="transparent">
          <PopoverTrigger>
            <Button className="relative bg-transparent">
              <Badge
                color="primary"
                content={cart.items.length}
                className="absolute w-1 h-1 top-0.5 right-0.5"
              >
                <Cart size={24} />
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="w-64">
              <h4 className="text-lg font-semibold">Shopping Cart</h4>
              <p className="text-sm text-gray-500">
                You have {cart.items.length} items in your cart.
              </p>
              <div className="mt-2 flex justify-between space-x-2">
                <Button color="primary" size="sm">
                  View Cart
                </Button>
                <Button color="secondary" size="sm">
                  Checkout
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {/* User Avatar and Dropdown */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="JH"
              style={{
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                flexShrink: 0,
              }}
            />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">zoey@example.com</p>
              <p className="font-semibold">010-1234-5678</p>
            </DropdownItem>
            <DropdownItem key="my-orders">
              <div className="flex items-center gap-2">
                <IconPackage size={24} stroke={1} />
                <p>My Orders</p>
              </div>
            </DropdownItem>
            <DropdownItem key="addresses">
              <div className="flex items-center gap-2">
                <IconHomeLink size={24} stroke={1} />
                <p>Addresses</p>
              </div>
            </DropdownItem>
            <DropdownItem key="support">
              <div className="flex items-center gap-2">
                <IconLifebuoy size={24} stroke={1} />
                <p>Support</p>
              </div>
            </DropdownItem>
            <DropdownItem key="favorites">
              <div className="flex items-center gap-2">
                <IconHearts size={24} stroke={1} />
                <p>Favorites</p>
              </div>
            </DropdownItem>
            <DropdownItem key="payments">
              <div className="flex items-center gap-2">
                <IconCreditCard size={24} stroke={1} />
                <p>Payments</p>
              </div>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              <div className="flex items-center gap-2">
                <IconLogout size={24} stroke={1} />
                <p>Log Out</p>
              </div>
            </DropdownItem>
          </DropdownMenu>
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
