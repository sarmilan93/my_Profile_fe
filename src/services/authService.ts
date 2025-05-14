import api from "./api";

interface LoginFormValues {
  userId: string;
  password: string;
  rememberMe?: boolean;
}

interface RegisterFormValues {
  userId: string;
  password: string;
  rememberMe?: boolean;
}

export const login = async (data: LoginFormValues) => {
    try {
        const response = await api.post("/auth/login", data);
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

export const registerUser = async (data: RegisterFormValues) => {
    try {
        const response = await api.post("/auth/register", data);
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

export const fetchCurrentUser = async () => {
    try {
        const response = await api.get("/auth/me");
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

export const logoutUser = async () => {
    try {
        const response = await api.get("/auth/logout");
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