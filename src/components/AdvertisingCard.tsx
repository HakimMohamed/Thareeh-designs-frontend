import { BannerService } from "@/services/banner";

export default async function AdvertisingCard() {
  const bannerSettings = await BannerService.getBannerSettings();
  if (!bannerSettings) {
    return null;
  }

  const { text, color, textColor } = bannerSettings;

  return (
    <div
      className="p-4 h-[50px] flex items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <div
        className="text-lg md:text-xl font-bold text-center animate-pulse"
        style={{ color: textColor }}
      >
        {text}
      </div>
    </div>
  );
}
