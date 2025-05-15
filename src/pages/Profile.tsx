import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

import Sidebar from '../components/Sidebar';
import MobileTabs from '../components/MobileTabs';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileImage from '../components/profile/ProfileImage';
import ProfileForm from '../components/profile/ProfileForm';
import { 
  fetchUserProfile, 
  updateBasicProfile, 
  updateAdditionalProfile, 
  updatePersonalPreferences,
  updateSpouseDetails
} from '../services/profileService';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

  const [profileData, setProfileData] = useState({
    // Basic Details
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',

    // Additional Details
    address: '',
    country: '',
    postalCode: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',

    // Spouse Details
    spouseSalutation: '',
    spouseFirstName: '',
    spouseLastName: '',

    // Personal Preferences
    hobbies: '',
    favoriteSports: '',
    musicGenres: '',
    movieTvShows: '',
  });

  const [tabs, setTabs] = useState([
    { id: 'basic', label: 'Basic Details' },
    { id: 'additional', label: 'Additional Details' },
    { id: 'preferences', label: 'Personal Preferences' },
  ]);

  useEffect(() => {
    const getUserProfile = async () => {
      const profile = await fetchUserProfile();
      setProfileData(profileData => ({
        ...profileData,
        ...profile
      }));
    };
    getUserProfile();
  }, []);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
      setProfileData(prev => ({
        ...prev,
        profileImage: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (profileData.maritalStatus === 'Married') {
      if (!tabs.find(tab => tab.id === 'spouse')) {
        setTabs(prev => [...prev, { id: 'spouse', label: 'Spouse Details' }]);
      }
    } else {
      setTabs(prev => prev.filter(tab => tab.id !== 'spouse'));
      if (activeTab === 'spouse') {
        setActiveTab('basic');
      }
    }
  }, [profileData.maritalStatus, activeTab]);

  const handleSubmit = (data: any) => {
    if (profileImage) {
      data.profileImage = profileImage;
    }

    let updateData: any = null;

    if (activeTab === "basic") {
      updateData = {
        profileImage: data.profileImage,
        salutation: data.salutation,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      };

      basicProfileUpdate(updateData);
    }
    if (activeTab === "additional") {
      updateData = {
        address: data.address,
        country: data.country,
        postalCode: data.postalCode,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        maritalStatus: data.maritalStatus,
      };

      additionalProfileUpdate(updateData);
    }
    if (activeTab === "preferences") {
      updateData = {
        hobbies: data.hobbies,
        favoriteSports: data.favoriteSports,
        musicGenres: data.musicGenres,
        movieTvShows: data.movieTvShows,
      };

      personalPreferencesUpdate(updateData);
    }
    if (activeTab === "spouse") {
      updateData = {
        spouseSalutation: data.spouseSalutation,
        spouseFirstName: data.spouseFirstName,
        spouseLastName: data.spouseLastName,
      };

      spouseDetailsUpdate(updateData);
    }

    setIsEditing(false);
  };

  const basicProfileUpdate = async (data: any) => {
    try {

      const res = await updateBasicProfile(data);
      if (res?.updatedAt) {
        toast.success('Profile updated successfully!', {
          position: 'bottom-center',
          autoClose: 3000,
        });

        setProfileData(profileData => ({
          ...profileData,
          ...res
        }));
      }

    } catch (error) {

      if (error instanceof Error) {
        if ((error as any)?.response?.data) {
          toast.error((error as any).response.data.message, {
            position: "bottom-center",
            autoClose: 3000,
          });
        } else {
          toast.error("Failed to update profile", {
            position: "bottom-center",
            autoClose: 3000,
          });
        }
        throw error;
      } else {
        console.log("failed:", error);
        toast.error(error, {
          position: "bottom-center",
          autoClose: 3000,
        });
        throw error;
      }

    }
  }

  const additionalProfileUpdate = async (data: any) => {
    try {

      const res = await updateAdditionalProfile(data);
      if (res?.updatedAt) {
        toast.success('Profile updated successfully!', {
          position: 'bottom-center',
          autoClose: 3000,
        });

        setProfileData(profileData => ({
          ...profileData,
          ...res
        }));
      }

    } catch (error: unknown) {

      if (error instanceof Error) {
        if ((error as any)?.response?.data) {
          toast.error((error as any).response.data.message, {
            position: "bottom-center",
            autoClose: 3000,
          });
        } else {
          toast.error("Failed to update profile", {
            position: "bottom-center",
            autoClose: 3000,
          });
        }
        throw error;
      } else {
        console.log("failed:", error);
        throw error;
      }

    }
  }

  const personalPreferencesUpdate = async (data: any) => {
    try {

      const res = await updatePersonalPreferences(data);
      if (res?.updatedAt) {
        toast.success('Profile updated successfully!', {
          position: 'bottom-center',
          autoClose: 3000,
        });

        setProfileData(profileData => ({
          ...profileData,
          ...res
        }));
      }

    } catch (error: unknown) {

      if (error instanceof Error) {
        if ((error as any)?.response?.data) {
          toast.error((error as any).response.data.message, {
            position: "bottom-center",
            autoClose: 3000,
          });
        } else {
          toast.error("Failed to update profile", {
            position: "bottom-center",
            autoClose: 3000,
          });
        }
        throw error;
      } else {
        console.log("failed:", error);
        throw error;
      }

    }
  }

  const spouseDetailsUpdate = async (data: any) => {
    try {

      const res = await updateSpouseDetails(data);
      if (res?.updatedAt) {
        toast.success('Profile updated successfully!', {
          position: 'bottom-center',
          autoClose: 3000,
        });

        setProfileData(profileData => ({
          ...profileData,
          ...res
        }));
      }

    } catch (error: unknown) {

      if (error instanceof Error) {
        if ((error as any)?.response?.data) {
          toast.error((error as any).response.data.message, {
            position: "bottom-center",
            autoClose: 3000,
          });
        } else {
          toast.error("Failed to update profile", {
            position: "bottom-center",
            autoClose: 3000,
          });
        }
        throw error;
      } else {
        console.log("failed:", error);
        throw error;
      }

    }
  }

  const calculateMinDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 17);
    return date.toISOString().split('T')[0];
  };

  const getActiveTabFields: any = () => {
    switch (activeTab) {
      case 'basic':
        return [
          {
            label: 'Salutation',
            value: profileData.salutation,
            required: true,
            name: 'salutation',
            type: 'select',
            options: ['Mr.', 'Ms.', 'Mrs.'],
          },
          {
            label: 'First name',
            value: profileData.firstName,
            required: true,
            name: 'firstName',
            type: 'text',
          },
          {
            label: 'Last name',
            value: profileData.lastName,
            required: true,
            name: 'lastName',
            type: 'text',
          },
          {
            label: 'Email address',
            value: profileData.email,
            required: true,
            name: 'email',
            type: 'email',
          },
        ];
      case 'additional':
        return [
          {
            label: 'Home address',
            value: profileData.address,
            required: true,
            name: 'address',
            type: 'text',
          },
          {
            label: 'Country',
            value: profileData.country,
            required: true,
            name: 'country',
            type: 'text',
          },
          {
            label: 'Postal code',
            value: profileData.postalCode,
            required: true,
            name: 'postalCode',
            type: 'text',
          },
          {
            label: 'Date of birth',
            value: profileData.dateOfBirth,
            required: false,
            name: 'dateOfBirth',
            type: 'date',
            max: calculateMinDate(),
          },
          {
            label: 'Gender',
            value: profileData.gender,
            required: false,
            name: 'gender',
            type: 'select',
            options: ['Male', 'Female'],
          },
          {
            label: 'Marital status',
            value: profileData.maritalStatus,
            required: false,
            name: 'maritalStatus',
            type: 'select',
            options: ['Single', 'Married'],
          },
        ];
      case 'spouse':
        return [
          {
            label: 'Salutation',
            value: profileData.spouseSalutation,
            required: false,
            name: 'spouseSalutation',
            type: 'select',
            options: ['Mr.', 'Ms.', 'Mrs.'],
          },
          {
            label: 'First name',
            value: profileData.spouseFirstName,
            required: false,
            name: 'spouseFirstName',
            type: 'text',
          },
          {
            label: 'Last name',
            value: profileData.spouseLastName,
            required: false,
            name: 'spouseLastName',
            type: 'text',
          },
        ];
      case 'preferences':
        return [
          {
            label: 'Hobbies and interests',
            value: profileData.hobbies,
            required: false,
            name: 'hobbies',
            type: 'textarea',
          },
          {
            label: 'Favorite sport(s)',
            value: profileData.favoriteSports,
            required: false,
            name: 'favoriteSports',
            type: 'textarea',
          },
          {
            label: 'Preferred music genre(s)',
            value: profileData.musicGenres,
            required: false,
            name: 'musicGenres',
            type: 'textarea',
          },
          {
            label: 'Preferred movie/TV show(s)',
            value: profileData.movieTvShows,
            required: false,
            name: 'movieTvShows',
            type: 'textarea',
          },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="h-[92vh] w-[100vw] bg-white inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="flex-grow flex flex-col md:flex-row relative">
        <div className="absolute opacity-80 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row w-full">
          <div className="hidden md:block">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
          </div>

          <div className="md:hidden px-4 py-2">
            <MobileTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          <main className="flex-grow p-4 md:p-8 flex flex-col">
            <ProfileHeader onEditClick={() => setIsEditing(!isEditing)} />

            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8 flex-grow">
              <div className="md:flex gap-8">
                { activeTab === "basic" && <div className="md:w-1/3 lg:w-1/4">
                  <ProfileImage
                    imageUrl={profileData?.profileImage !== "" ? profileData?.profileImage : profileImage}
                    isEditing={isEditing}
                    onImageUpload={handleImageUpload}
                  />
                </div>}

                <div className="md:w-2/3 lg:w-full">
                  <ProfileForm
                    fields={getActiveTabFields()}
                    isEditing={isEditing}
                    onChange={() => { }}
                    onSubmit={handleSubmit}
                    defaultValues={profileData}
                  />

                  {isEditing && (
                    <div className="mt-8 flex justify-end space-x-4">
                      <button
                        type="submit"
                        form="profile-form"
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                      >
                        <Save size={16} className="mr-2" />
                        SAVE & UPDATE
                      </button>
                      <button
                        type="button"
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setIsEditing(false)}
                      >
                        <X size={16} className="mr-2" />
                        CANCEL
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
