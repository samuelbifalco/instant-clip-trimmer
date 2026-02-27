
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
  }, [onVideoSelected]);

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
    <Card className="overflow-hidden border border-white/10 bg-slate-800/50 backdrop-blur-sm transition-all hover:border-cyan-500/30">
      <CardContent className="p-0">
        <div className="border-b border-white/10 p-6 sm:p-8">
          <h3 className="mb-1 flex items-center gap-3 text-xl font-bold text-white sm:text-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20">
              <Upload className="h-5 w-5 text-cyan-400 sm:h-6 sm:w-6" />
            </span>
            Upload Video File
          </h3>
          <p className="text-slate-400">Drag & drop or click to browse</p>
        </div>
        <div
          {...getRootProps()}
          className={`cursor-pointer p-8 transition-all sm:p-12 ${
            isProcessing
              ? "cursor-not-allowed opacity-60"
              : isDragActive || isDragOver
                ? "border-2 border-dashed border-cyan-400/50 bg-cyan-500/10"
                : "border-2 border-dashed border-white/10 hover:border-cyan-500/30 hover:bg-white/5"
          }`}
          role="button"
          aria-label="Upload video file"
          tabIndex={0}
        >
          <input {...getInputProps()} aria-label="Video file input" />
          
          <div className="space-y-6 text-center">
            <div
              className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl transition-all sm:h-24 sm:w-24 ${
                isProcessing
                  ? "animate-pulse bg-amber-500/20"
                  : isDragActive || isDragOver
                    ? "scale-105 bg-cyan-500/20"
                    : "bg-white/5"
              }`}
            >
              {isProcessing ? (
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent sm:h-12 sm:w-12" />
              ) : (
                <Upload
                  className={`h-10 w-10 sm:h-12 sm:w-12 ${
                    isDragActive || isDragOver ? "text-cyan-400" : "text-slate-400"
                  }`}
                />
              )}
            </div>
            {isProcessing ? (
              <div className="space-y-1">
                <p className="font-semibold text-amber-400">Processing video…</p>
                <p className="text-sm text-slate-400">Validating your file</p>
              </div>
            ) : isDragActive ? (
              <div className="space-y-1">
                <p className="font-semibold text-cyan-400">Drop your video here</p>
                <p className="text-sm text-slate-400">We'll open it in the editor</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="font-semibold text-white">Drag & drop your video here</p>
                <p className="text-slate-400">or click to browse</p>
                <Button
                  size="lg"
                  type="button"
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-white hover:from-cyan-600 hover:to-blue-600"
                >
                  <FileVideo className="mr-2 h-5 w-5" />
                  Choose File
                </Button>
              </div>
            )}
            <div className="space-y-2 pt-4 text-sm text-slate-500">
              <p className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                MP4, AVI, MOV, MKV, WebM, M4V, 3GP
              </p>
              <p className="flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4 text-cyan-400" />
                Max 500MB · Processed locally only
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
