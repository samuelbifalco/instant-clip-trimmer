
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface FileUploadCardProps {
  onVideoSelected: (file: File, url: string) => void;
}

export const FileUploadCard = ({ onVideoSelected }: FileUploadCardProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      onVideoSelected(file, url);
      toast({
        title: "🎉 Video uploaded successfully!",
        description: "Ready to trim your video with precision.",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file (MP4, AVI, MOV, MKV, WebM).",
        variant: "destructive",
      });
    }
  }, [onVideoSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.m4v', '.3gp']
    },
    multiple: false,
    maxSize: 500 * 1024 * 1024 // 500MB limit
  });

  return (
    <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50 backdrop-blur-sm overflow-hidden hover:border-gray-600/50 transition-all duration-300">
      <CardContent className="p-0">
        <div className="p-8 border-b border-gray-700/50">
          <h3 className="text-2xl font-bold flex items-center text-white mb-2">
            <Upload className="mr-4 h-8 w-8 text-blue-400" />
            Upload Video File
          </h3>
          <p className="text-gray-400 text-lg">Drag & drop or click to browse</p>
        </div>
        
        <div
          {...getRootProps()}
          className={`p-12 cursor-pointer transition-all duration-300 ${
            isDragActive || isDragOver
              ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/50 border-2 border-dashed'
              : 'bg-gray-800/30 border-2 border-dashed border-gray-600/50 hover:border-gray-500/50 hover:bg-gray-700/30'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-center space-y-6">
            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDragActive || isDragOver 
                ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 scale-110' 
                : 'bg-gradient-to-br from-gray-700/50 to-gray-800/50'
            }`}>
              <Upload className={`h-12 w-12 transition-colors duration-300 ${
                isDragActive || isDragOver ? 'text-blue-400' : 'text-gray-300'
              }`} />
            </div>
            
            {isDragActive ? (
              <div className="space-y-2">
                <p className="text-blue-400 font-bold text-xl">Drop your video here!</p>
                <p className="text-blue-300 text-lg">We'll process it instantly</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-white font-bold text-xl">
                  Drag & drop your video here
                </p>
                <p className="text-gray-400 text-lg mb-6">
                  or click to browse files
                </p>
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 text-lg font-semibold">
                  Choose File
                </Button>
              </div>
            )}
            
            <div className="text-sm text-gray-500 space-y-2 pt-4">
              <p className="font-medium">Supports: MP4, AVI, MOV, MKV, WebM, M4V, 3GP</p>
              <p>Max file size: 500MB</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
