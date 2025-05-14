import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Eye, EyeOff } from "lucide-react";
import { login } from "../services/authService";

interface LoginFormValues {
    userId: string;
    password: string;
    rememberMe?: boolean;
}

const schema = yup.object().shape({
    userId: yup.string().required("User ID is required"),
    password: yup.string().required("Password is required"),
});

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormValues>({ resolver: yupResolver(schema), mode: "onChange" });

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await login(data);
            toast.success("Login successful!", {
                position: "bottom-center",
                autoClose: 3000,
            });
            localStorage.setItem("token", res.token);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("failed:", error.message);
                if ((error as any)?.response?.data) {
                    toast.error((error as any).response.data.message, {
                        position: "bottom-center",
                        autoClose: 3000,
                    });
                } else {
                    toast.error("An unexpected error occurred", {
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
    };

    return (
        <div className="min-h-screen w-[100vw] flex flex-col items-center justify-center bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
                noValidate
            >

                <div className="flex items-center justify-center mb-4">
                    <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
                </div>

                <div className="!flex text-2xl text-center justify-center text-black">Welcome to <span className="font-bold pl-2"> myApp</span></div>

                <div>
                    <label className="block font-medium text-black">User ID *</label>
                    <input
                        type="text"
                        {...register("userId")}
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-black"
                    />
                    {errors.userId && (
                        <p className="text-sm text-red-600">{errors.userId.message}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium text-black">Password *</label>
                    <div className="border border-gray-300 rounded px-3 flex flex-row">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            className="w-full py-2 mt-1 text-black"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                            className="text-black"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-sm text-red-600">{errors.password.message}</p>
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        {...register("rememberMe")}
                        className="mr-2"
                    />
                    <label className="text-sm text-black">Keep me logged in</label>
                </div>

                <button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full ${isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300"} text-white font-semibold py-2 rounded`}
                >
                    LOGIN
                </button>
            </form>

            <div className="text-center mt-4">
                <span className="text-sm text-black">No account? </span>
                <Link to="/register" className="text-sm text-blue-600 hover:underline">
                    Register here
                </Link>
            </div>

            <ToastContainer />
        </div>
    );
}