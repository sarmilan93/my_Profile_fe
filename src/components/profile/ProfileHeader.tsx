import { Pencil } from 'lucide-react';

interface ProfileHeaderProps {
    onEditClick: () => void;
}

export default function ProfileHeader({ onEditClick }: ProfileHeaderProps) {
    return (
        <div className="flex items-center justify-between w-full mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                My <span className="font-bold">Profile</span>
            </h1>
            <div className="flex-grow mx-4 border-b border-gray-300"></div>
            <button
                onClick={onEditClick}
                className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
                <span className="mr-1 text-sm">Edit profile</span>
                <Pencil size={16} />
            </button>
        </div>
    );
}