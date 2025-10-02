// src/lib/cloudinary.ts
const CLOUDINARY_CLOUD_NAME = "dxhjlkdx0";
const CLOUDINARY_UPLOAD_PRESET = "vroom_commerce"; // We'll create this

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
}

export const uploadImageToCloudinary = async (file: File): Promise<CloudinaryUploadResult> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const deleteImageFromCloudinary = async (publicId: string): Promise<void> => {
  // Note: For security, deletion should be done from backend
  // For now, we'll keep the image on Cloudinary even if removed from product
  console.log('Image deletion should be handled by backend:', publicId);
};

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (publicId: string, options?: {
  width?: number;
  height?: number;
  quality?: string;
  format?: string;
}): string => {
  const { width = 400, height = 400, quality = 'auto', format = 'auto' } = options || {};
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},h_${height},c_fill,q_${quality},f_${format}/${publicId}`;
};