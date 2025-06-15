
import { HeroSection } from "@/components/HeroSection";
import { FileUploadCard } from "@/components/FileUploadCard";
import { UrlInputCard } from "@/components/UrlInputCard";
import { FeaturesSection } from "@/components/FeaturesSection";
import { StatisticsSection } from "@/components/StatisticsSection";

interface VideoUploadProps {
  onVideoSelected: (file: File, url: string) => void;
}

export const VideoUpload = ({ onVideoSelected }: VideoUploadProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <HeroSection />
      
      {/* Upload Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-20">
        <FileUploadCard onVideoSelected={onVideoSelected} />
        <UrlInputCard />
      </div>

      <FeaturesSection />
      <StatisticsSection />
    </div>
  );
};
