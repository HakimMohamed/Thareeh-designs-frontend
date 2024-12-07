import { useRadio, VisuallyHidden, RadioProps, cn } from "@nextui-org/react";
import { Image } from "@nextui-org/react"; // Import the Next UI Image component

interface CustomRadioProps extends RadioProps {
  imageSrc?: string; // Prop to pass image URL
}

export const CustomRadio = ({
  imageSrc,
  children,
  description,
  ...props
}: CustomRadioProps) => {
  const {
    Component,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse",
        "flex-1 cursor-pointer border-2 border-default rounded-lg gap-2 p-2", // Reduced padding and gap
        "data-[selected=true]:border-primary"
      )}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="radio-icon"
          width={32} // Adjust the width as needed
          height={32} // Adjust the height as needed
          className="mr-2" // Optional, adds margin to the right
        />
      )}
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      {/* Display Image if imageSrc is provided */}

      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};
