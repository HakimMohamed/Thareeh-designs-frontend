import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
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
} from "@nextui-org/react";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
  Cart,
} from "./icons/Icons.jsx";
import { PrinterLogo } from "./PrinterLogo.jsx";
import { SearchIcon } from "./SearchIcon.jsx";
import {
  IconCreditCard,
  IconHearts,
  IconHomeLink,
  IconLifebuoy,
  IconLogout,
  IconPackage,
  IconUserCircle,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function App() {
  const icons = {
    chevron: (
      <ChevronDown
        fill="currentColor"
        size={16}
        height={undefined}
        width={undefined}
      />
    ),
    scale: (
      <Scale
        className="text-warning"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    lock: (
      <Lock
        className="text-success"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    activity: (
      <Activity
        className="text-secondary"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    flash: (
      <Flash
        className="text-primary"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    server: (
      <Server
        className="text-success"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    user: (
      <TagUser
        className="text-danger"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    cart: (
      <Cart
        className="text-danger"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
  };
  const pathname = usePathname();

  const isActivePathStartsWith = (path: string) => {
    return pathname.startsWith(path);
  };
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
      }}
    >
      <NavbarContent justify="start" className="mr-8">
        <Link href="/">
          <Button
            className="bg-transparent py-2 px-4 rounded transition-colors"
            size="lg"
          >
            <NavbarBrand className="mr-4">
              <div className="flex items-center">
                <PrinterLogo />
                <p className="hidden sm:block font-bold text-inherit">
                  Thareeh Designs
                </p>
              </div>
            </NavbarBrand>
          </Button>
        </Link>
        <NavbarContent className="hidden sm:flex gap-9">
          <Dropdown>
            <NavbarItem isActive={isActivePathStartsWith("/collections")}>
              <DropdownTrigger>
                <Link href="/collections">
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    endContent={icons.chevron}
                    radius="sm"
                    variant="light"
                  >
                    Categories
                  </Button>
                </Link>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="autoscaling"
                description="ACME scales apps to meet user demand, automagically, based on load."
                startContent={icons.scale}
              >
                Autoscaling
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                startContent={icons.activity}
              >
                Usage Metrics
              </DropdownItem>
              <DropdownItem
                key="production_ready"
                description="ACME runs on ACME, join us and others serving requests at web scale."
                startContent={icons.flash}
              >
                Production Ready
              </DropdownItem>
              <DropdownItem
                key="99_uptime"
                description="Applications stay on the grid with high availability and high uptime guarantees."
                startContent={icons.server}
              >
                +99% Uptime
              </DropdownItem>
              <DropdownItem
                key="supreme_support"
                description="Overcome any challenge with a supporting team ready to respond."
                startContent={icons.user}
              >
                +Supreme Support
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem isActive={isActivePathStartsWith("/deals")}>
            <Link href="/deals">
              <Button className="bg-transparent">Deals</Button>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActivePathStartsWith("/test2")}>
            <Link href="/test2">
              <Button className="bg-transparent">test2</Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {/* Search Input */}
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
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

        {/* Cart Icon with Badge and Popover */}
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button className="relative bg-transparent">
              <Badge
                color="primary"
                content={3} // The number of items in the cart
                className="absolute w-1 h-1 top-0 right-0"
              >
                <Cart size={24} />
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4 w-64">
              <h4 className="text-lg font-semibold">Cart</h4>
              <p className="text-sm text-gray-500">
                You have 3 items in your cart.
              </p>
              {/* Cart items would go here */}
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
                width: "45px",
                height: "45px",
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
              <div className="flex justify-between items-center w-full gap-4">
                <div className="flex items-center gap-2">
                  {/* Imported Wallet icon */}
                  <IconPackage size={24} stroke={1} />
                  <p>My Orders</p>
                </div>
              </div>
            </DropdownItem>
            <DropdownItem key="addresses">
              <div className="flex justify-between items-center w-full gap-4">
                <div className="flex items-center gap-2">
                  {/* Imported Wallet icon */}
                  <IconHomeLink size={24} stroke={1} />
                  <p>Addresses</p>
                </div>
              </div>
            </DropdownItem>

            <DropdownItem key="favorites">
              <div className="flex justify-between items-center w-full gap-4">
                <div className="flex items-center gap-2">
                  <IconHearts size={24} stroke={1} />
                  <p>Favorites</p>
                </div>
              </div>
            </DropdownItem>

            <DropdownItem key="payment">
              <div className="flex justify-between items-center w-full gap-4">
                <div className="flex items-center gap-2">
                  <IconCreditCard size={24} stroke={1} />
                  <p>Payment</p>
                </div>
              </div>
            </DropdownItem>
            <DropdownItem key="account">
              <div className="flex justify-between items-center w-full gap-4">
                <div className="flex items-center gap-2">
                  <IconUserCircle size={24} stroke={1} />
                  <p>Account</p>
                </div>
              </div>
            </DropdownItem>
            <DropdownItem key="support">
              <div className="flex justify-between items-center w-full gap-4">
                <div className="flex items-center gap-2">
                  <IconLifebuoy size={24} stroke={1} />
                  <p>Support</p>
                </div>
              </div>
            </DropdownItem>

            <DropdownItem
              key="logout"
              className="text-red-600 hover:text-red-700"
            >
              <div className="flex justify-between items-center w-full gap-4">
                <div className="flex items-center gap-2">
                  <IconLogout size={24} stroke={1} />
                  <p>Logout</p>
                </div>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
