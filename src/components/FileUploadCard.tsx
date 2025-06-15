
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, AlertCircle, CheckCircle2, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface FileUploadCardProps {
  onVideoSelected: (file: File, url: string) => void;
}

export const FileUploadCard = ({ onVideoSelected }: FileUploadCardProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const validateVideoFile = (file: File): { isValid: boolean; error?: string } => {
    // Check file size (500MB limit)
    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      return { 
        isValid: false, 
        error: `File too large. Maximum size is 500MB. Your file is ${Math.round(file.size / 1024 / 1024)}MB.` 
      };
    }

    // Check file type
    if (!file.type.startsWith('video/')) {
      return { 
        isValid: false, 
        error: 'Invalid file type. Please upload a video file.' 
      };
    }

    // Check for supported formats
    const supportedFormats = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'm4v', '3gp'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !supportedFormats.includes(fileExtension)) {
      return { 
        isValid: false, 
        error: `Unsupported format. Please use: ${supportedFormats.join(', ').toUpperCase()}` 
      };
    }

    return { isValid: true };
  };

  const processVideoFile = async (file: File) => {
    setIsProcessing(true);
    
    try {
      // Validate file
      const validation = validateVideoFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Create object URL
      const url = URL.createObjectURL(file);
      
      // Test video loading
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Video loading timeout. File may be corrupted.'));
        }, 10000);

        video.onloadedmetadata = () => {
          clearTimeout(timeout);
          if (video.duration > 0) {
            resolve(video);
          } else {
            reject(new Error('Invalid video file. Duration is zero.'));
          }
        };

        video.onerror = () => {
          clearTimeout(timeout);
          reject(new Error('Unable to load video. File may be corrupted or in an unsupported format.'));
        };

        video.src = url;
      });

      // Success
      onVideoSelected(file, url);
      
      toast({
        title: "🎉 Video uploaded successfully!",
        description: `${file.name} (${Math.round(file.size / 1024 / 1024)}MB) is ready for editing.`,
      });

    } catch (error) {
      console.error('Video processing error:', error);
      
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Unable to process video file.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      let errorMessage = "File rejected.";
      
      if (rejection.errors) {
        errorMessage = rejection.errors.map((e: any) => e.message).join(', ');
      }
      
      toast({
        title: "Invalid file",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      processVideoFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.m4v', '.3gp']
    },
    multiple: false,
    maxSize: 500 * 1024 * 1024,
    disabled: isProcessing
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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
            isProcessing ? 'opacity-50 cursor-not-allowed' :
            isDragActive || isDragOver
              ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/50 border-2 border-dashed'
              : 'bg-gray-800/30 border-2 border-dashed border-gray-600/50 hover:border-gray-500/50 hover:bg-gray-700/30'
          }`}
          role="button"
          aria-label="Upload video file"
          tabIndex={0}
        >
          <input {...getInputProps()} aria-label="Video file input" />
          
          <div className="text-center space-y-6">
            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              isProcessing ? 'bg-yellow-500/20 animate-pulse' :
              isDragActive || isDragOver 
                ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 scale-110' 
                : 'bg-gradient-to-br from-gray-700/50 to-gray-800/50'
            }`}>
              {isProcessing ? (
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
              ) : (
                <Upload className={`h-12 w-12 transition-colors duration-300 ${
                  isDragActive || isDragOver ? 'text-blue-400' : 'text-gray-300'
                }`} />
              )}
            </div>
            
            {isProcessing ? (
              <div className="space-y-2">
                <p className="text-yellow-400 font-bold text-xl">Processing video...</p>
                <p className="text-yellow-300 text-lg">Please wait while we validate your file</p>
              </div>
            ) : isDragActive ? (
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
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 text-lg font-semibold"
                  disabled={isProcessing}
                  type="button"
                >
                  <FileVideo className="h-5 w-5 mr-2" />
                  Choose File
                </Button>
              </div>
            )}
            
            <div className="text-sm text-gray-500 space-y-2 pt-4">
              <p className="font-medium flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-400" />
                Supports: MP4, AVI, MOV, MKV, WebM, M4V, 3GP
              </p>
              <p className="flex items-center justify-center">
                <AlertCircle className="h-4 w-4 mr-2 text-blue-400" />
                Max file size: 500MB
              </p>
              <p className="text-xs text-gray-600 mt-4">
                Your files are processed locally and never uploaded to our servers
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
