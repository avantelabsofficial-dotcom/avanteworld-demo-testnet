import React, { useState } from 'react';
import { AVATAR_URLS, AvatarType } from '../lib/supabase';

interface AvatarSelectorProps {
  onSelect: (avatarType: AvatarType) => Promise<void>;
  isLoading?: boolean;
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ onSelect, isLoading = false }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType | null>(null);

  const handleSelect = async (avatarType: AvatarType) => {
    setSelectedAvatar(avatarType);
    await onSelect(avatarType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Choose Your Avatar</h1>
          <p className="text-xl text-gray-300">Select the avatar you'd like to use in Avante World 3D</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Male Avatar Card */}
          <button
            onClick={() => handleSelect('male')}
            disabled={isLoading}
            className={`group relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              selectedAvatar === 'male'
                ? 'ring-4 ring-blue-500 scale-105'
                : 'hover:ring-2 hover:ring-blue-400'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-900 aspect-square flex flex-col items-center justify-center p-8">
              <div className="text-8xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                👨
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Male</h3>
              <p className="text-blue-100">Ready Player Me Avatar</p>
            </div>

            {selectedAvatar === 'male' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                ) : (
                  <div className="text-white text-2xl">✓</div>
                )}
              </div>
            )}
          </button>

          {/* Female Avatar Card */}
          <button
            onClick={() => handleSelect('female')}
            disabled={isLoading}
            className={`group relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              selectedAvatar === 'female'
                ? 'ring-4 ring-pink-500 scale-105'
                : 'hover:ring-2 hover:ring-pink-400'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="bg-gradient-to-br from-pink-600 to-pink-900 aspect-square flex flex-col items-center justify-center p-8">
              <div className="text-8xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                👩
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Female</h3>
              <p className="text-pink-100">Ready Player Me Avatar</p>
            </div>

            {selectedAvatar === 'female' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                ) : (
                  <div className="text-white text-2xl">✓</div>
                )}
              </div>
            )}
          </button>
        </div>

        {selectedAvatar && (
          <div className="text-center">
            <p className="text-green-400 text-lg font-semibold animate-pulse">
              {isLoading ? 'Saving your avatar selection...' : `${selectedAvatar === 'male' ? 'Male' : 'Female'} avatar selected!`}
            </p>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            You can change your avatar anytime in the settings
          </p>
        </div>
      </div>
    </div>
  );
};
