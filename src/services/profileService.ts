import api from "./api";

interface basicProfile {
    profileImage: string
    salutation: string
    firstName: string
    lastName: string
    email: string
}

interface additionalProfile {
    address: string
    country: string
    postalCode: string
    dateOfBirth: string
    gender: string
    maritalStatus: string
}

interface personalPreferencesData {
    hobbies: string
    favoriteSports: string
    musicGenres: string
    movieTvShows: string
}

interface spouseData {
    spouseSalutation: string
    spouseFirstName: string
    spouseLastName: string
}

export const fetchUserProfile = async () => {
    try {
        const response = await api.get("/user/profile");
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("failed:", error.message);
            throw error;
        } else {
            console.log("failed:", error);
            throw error;
        }
    }
};

export const updateBasicProfile = async (data: basicProfile) => {
    try {
        const response = await api.put("/user/basicProfile", data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("failed:", error.message);
            throw error;
        } else {
            console.log("failed:", error);
            throw error;
        }
    }
};

export const updateAdditionalProfile = async (data: additionalProfile) => {
    try {
        const response = await api.put("/user/additional", data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("failed:", error.message);
            throw error;
        } else {
            console.log("failed:", error);
            throw error;
        }
    }
};

export const updatePersonalPreferences = async (data: personalPreferencesData) => {
    try {
        const response = await api.put("/user/preferences", data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("failed:", error.message);
            throw error;
        } else {
            console.log("failed:", error);
            throw error;
        }
    }
};

export const updateSpouseDetails = async (data: spouseData) => {
    try {
        const response = await api.put("/user/spouse", data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("failed:", error.message);
            throw error;
        } else {
            console.log("failed:", error);
            throw error;
        }
    }
};