import React, { useState, useEffect } from "react";
import { User } from 'lucide-react';
import { Link } from "react-router-dom";
import { fetchUserProfile } from '../services/profileService';

const Home = () => {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const getUserProfile = async () => {
          const profile = await fetchUserProfile();
          if(profile?.userId) {
            setUserData(profile);
          }
        };
        getUserProfile();
      }, []);

    return (
        <div className="h-[92vh] bg-white text-black flex justify-center items-center p-4">
            <div className="w-full max-w-5xl bg-black text-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Profile Image Section */}
                    <div className="md:w-1/3 bg-white text-black flex items-center justify-center p-6">
                        {userData?.profileImage ? (
                            <img src={userData?.profileImage} alt="Profile" className="rounded-full w-40 h-40 object-cover border-4 border-black" />
                        ) : (
                            <User className="w-40 h-40 text-black object-cover" />
                        )}
                    </div>

                    {/* Profile Details */}
                    { userData ? (<div className="md:w-2/3 p-8 space-y-4">
                        <h2 className="text-3xl font-bold border-b border-white pb-2">
                            {userData?.salutation ? userData?.salutation : "-"} {userData?.firstName ? userData?.firstName : "-"} {userData?.lastName ? userData?.lastName : "-"}
                        </h2>
                        <div className="space-y-2 text-sm md:text-base">
                            <div>
                                <span className="font-semibold">Email:</span> {userData?.email ? userData?.email : "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Gender:</span>{" "}
                                {userData?.gender ? userData?.gender : "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Date of Birth:</span> {userData?.dateOfBirth ? userData?.dateOfBirth : "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Address:</span> {userData?.address ? userData?.address : "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Country:</span> {userData?.country ? userData?.country : "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Postal Code:</span> {userData?.postalCode ? userData?.postalCode : "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Marital Status:</span> {userData?.maritalStatus ? userData?.maritalStatus : "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Spouse Name:</span> {userData?.spouseSalutation ? userData?.spouseSalutation : "-"} {userData?.spouseFirstName ? userData?.spouseFirstName : "-"} {userData?.spouseLastName ? userData?.spouseLastName : "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Favorite Sports:</span> {userData?.favoriteSports ? userData?.favoriteSports : "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Hobbies:</span> {userData?.hobbies ? userData?.hobbies : "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Favorite Movie TV Shows:</span> {userData?.movieTvShows ? userData?.movieTvShows : "-"}
                            </div>
                            <div>
                                <span className="font-semibold">Favorite MusicGenres:</span> {userData?.musicGenres ? userData?.musicGenres : "-"}
                            </div>
                        </div>
                    </div>) : (
                        <div className="md:w-2/3 min-h-[500px] p-8 space-y-4 flex flex-col justify-center items-center text-center">
                            <p>Please fill all the mandatory details to generate the user profile.</p>
                            <Link to="/profile" className="hover:underline text-center py-2 px-6 bg-white text-black rounded-lg mt-3">
                                My Profile
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
