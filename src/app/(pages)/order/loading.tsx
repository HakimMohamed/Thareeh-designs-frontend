// app/order/loading.tsx
import { Loader2 } from "lucide-react"; // Assuming you are using this icon for loading

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );
};

export default Loading;
