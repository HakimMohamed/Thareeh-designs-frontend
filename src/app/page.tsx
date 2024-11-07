import AdvertisingCard from "./components/AdvertisingCard";
import Filters from "./components/Filters";
import ProductGrid from "./components/ItemCard";

// Define the type for your item
interface Item {
  name: string;
  price: number;
  description: string;
  onSale: boolean;
  discount: number;
  imageUrl: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchItems = async (): Promise<Item[]> => {
  await delay(2000); // Simulate a 2 seconds delay
  return [
    {
      name: "Wireless Headphones",
      price: 99.99,
      description: "High-quality wireless headphones with noise cancellation",
      onSale: true,
      discount: 20,
      imageUrl:
        "https://ih1.redbubble.net/image.129595100.4852/sss,small,product,750x1000.u2.webp",
    },
    {
      name: "Bluetooth Speaker",
      price: 49.99,
      description: "Portable Bluetooth speaker with 12-hour battery life",
      onSale: false,
      discount: 0,
      imageUrl:
        "https://ih1.redbubble.net/image.129595100.4852/sss,small,product,750x1000.u2.webp",
    },
    {
      name: "Smartwatch",
      price: 199.99,
      description: "Feature-rich smartwatch with fitness tracking",
      onSale: true,
      discount: 30,
      imageUrl:
        "https://ih1.redbubble.net/image.129595100.4852/sss,small,product,750x1000.u2.webp",
    },
    {
      name: "Gaming Mouse",
      price: 59.99,
      description: "Ergonomic gaming mouse with customizable buttons",
      onSale: true,
      discount: 15,
      imageUrl:
        "https://ih1.redbubble.net/image.129595100.4852/sss,small,product,750x1000.u2.webp",
    },
    {
      name: "Mechanical Keyboard",
      price: 89.99,
      description: "RGB mechanical keyboard with programmable keys",
      onSale: false,
      discount: 0,
      imageUrl:
        "https://ih1.redbubble.net/image.129595100.4852/sss,small,product,750x1000.u2.webp",
    },
    {
      name: "4K Monitor",
      price: 299.99,
      description: "Ultra HD monitor with stunning visuals",
      onSale: true,
      discount: 50,
      imageUrl:
        "https://ih1.redbubble.net/image.129595100.4852/sss,small,product,750x1000.u2.webp",
    },
    {
      name: "Portable SSD",
      price: 129.99,
      description: "Fast and reliable portable SSD for on-the-go storage",
      onSale: false,
      discount: 0,
      imageUrl:
        "https://ih1.redbubble.net/image.129595100.4852/sss,small,product,750x1000.u2.webp",
    },
    {
      name: "Action Camera",
      price: 199.99,
      description: "Compact action camera with 4K recording",
      onSale: true,
      discount: 40,
      imageUrl:
        "https://ih1.redbubble.net/image.129595100.4852/sss,small,product,750x1000.u2.webp",
    },
    {
      name: "Wireless Charger",
      price: 29.99,
      description: "Convenient wireless charger for compatible devices",
      onSale: true,
      discount: 10,
      imageUrl:
        "https://ih1.redbubble.net/image.129595100.4852/sss,small,product,750x1000.u2.webp",
    },
    {
      name: "Smart Thermostat",
      price: 149.99,
      description: "Smart thermostat for efficient temperature control",
      onSale: false,
      discount: 0,
      imageUrl:
        "https://ih1.redbubble.net/image.129595100.4852/sss,small,product,750x1000.u2.webp",
    },
    {
      name: "Fitness Tracker",
      price: 79.99,
      description: "Water-resistant fitness tracker with heart rate monitor",
      onSale: true,
      discount: 20,
      imageUrl:
        "https://ih1.redbubble.net/image.129595100.4852/sss,small,product,750x1000.u2.webp",
    },
    {
      name: "Bluetooth Earbuds",
      price: 39.99,
      description: "Compact wireless earbuds with great sound quality",
      onSale: false,
      discount: 0,
      imageUrl:
        "https://ih1.redbubble.net/image.129595100.4852/sss,small,product,750x1000.u2.webp",
    },
    // Add more items as needed...
  ];
};

const HomePage = async () => {
  const items = await fetchItems();

  return (
    <div className="mb-8">
      {/* custom stickers section */}
      <div className="mb-8 w-full">
        <AdvertisingCard />
      </div>
      <div className="mb-8">
        <h3 className="text-4xl font-bold">Stickers For You</h3>
      </div>
      <div className="w-full mb-8">
        <Filters />
      </div>
      <ProductGrid products={items} />
    </div>
  );
};

export default HomePage;
