// src/components/admin/ImageUpload.tsx
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string, publicId: string) => void;
  currentImage?: string;
  onImageRemoved?: () => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  currentImage,
  onImageRemoved,
  className = ""
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadImageToCloudinary(file);
      onImageUploaded(result.secure_url, result.public_id);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFileSelect(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    if (onImageRemoved) {
      onImageRemoved();
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {currentImage ? (
        <div className="relative">
          <img
            src={currentImage}
            alt="Product"
            className="w-full h-48 object-cover rounded-lg border border-border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${dragActive ? 'border-primary bg-primary/10' : 'border-border'}
            ${uploading ? 'opacity-50 pointer-events-none' : 'hover:border-primary/50'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            
            <div>
              <p className="text-lg font-medium">
                {uploading ? 'Uploading...' : 'Drop image here or click to upload'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
            
            {!uploading && (
              <Button type="button" variant="outline" size="sm" className="bg-white">
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            )}
          </div>
        </div>
      )}
      
      {uploading && (
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span className="text-sm text-muted-foreground">Uploading image...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;