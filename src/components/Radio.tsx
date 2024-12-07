import { useRadio, VisuallyHidden, RadioProps, cn } from "@nextui-org/react";

interface CustomRadioProps extends RadioProps {
  image: React.ReactNode; // Image must always be a React component
}
export const CustomRadio = ({
  image,
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
        "flex-1 cursor-pointer border-2 border-default rounded-lg gap-2 p-2", // Adjust styling for mobile
        "data-[selected=true]:border-primary"
      )}
    >
      {/* Ensure the image scales properly */}
      {image}

      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

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
