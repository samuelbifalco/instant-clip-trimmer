
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
      
      <div className="mb-16 grid gap-8 lg:mb-20 lg:grid-cols-2">
        <FileUploadCard onVideoSelected={onVideoSelected} />
        <UrlInputCard />
      </div>

      <FeaturesSection />
      <StatisticsSection />
    </div>
  );
};
