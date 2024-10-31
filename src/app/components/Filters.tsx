import { Select, SelectItem } from "@nextui-org/react";

interface Animal {
  key: string;
  label: string;
}

const animals: Animal[] = [
  { key: "dog", label: "Dog" },
  { key: "cat", label: "Cat" },
  { key: "bird", label: "Bird" },
];

export default function Filters() {
  return (
    <div className="mb-4 min-w-[200px] flex space-x-4 overflow-x-auto w-full">
      <Select label="Select an animal" className="max-w-xs flex-grow">
        {animals.map((animal) => (
          <SelectItem key={animal.key} value={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <Select label="Select an animal" className="max-w-xs flex-grow">
        {animals.map((animal) => (
          <SelectItem key={animal.key} value={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <Select label="Select an animal" className="max-w-xs flex-grow">
        {animals.map((animal) => (
          <SelectItem key={animal.key} value={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <Select label="Select an animal" className="max-w-xs flex-grow">
        {animals.map((animal) => (
          <SelectItem key={animal.key} value={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
