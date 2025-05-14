import React, { useRef } from 'react';
import { User, Upload } from 'lucide-react';

interface ProfileImageProps {
    imageUrl?: string;
    isEditing?: boolean;
    onImageUpload?: (file: File) => void;
}

export default function ProfileHeader({ imageUrl, isEditing, onImageUpload }: ProfileImageProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && onImageUpload) {
            onImageUpload(file);
        }
    };

    return (
        <div className="flex flex-col items-center mb-6">
            <div
                className={`w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden ${isEditing ? 'cursor-pointer hover:opacity-90 transition-opacity duration-200' : ''
                    }`}
                onClick={handleClick}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <User className="w-16 h-16 text-gray-500" />
                )}
            </div>

            {isEditing && (
                <>
                    <button
                        type="button"
                        className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 flex items-center"
                        onClick={handleClick}
                    >
                        <Upload size={14} className="mr-1" />
                        Upload image
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </>
            )}
        </div>
    );
}