import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { registerUser } from "../services/authService";

interface RegisterFormValues {
    userId: string;
    password: string;
    confirmPassword: string;
}

const schema = yup.object().shape({
    userId: yup.string().required("User ID is required"),
    password: yup.string().min(6).required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "Your passwords do not match")
        .required("Please confirm your password"),
});

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({ resolver: yupResolver(schema) });

    const navigate = useNavigate();

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            await registerUser({ userId: data.userId, password: data.password });
            toast.success("Registration successful!", {
                position: "bottom-center",
                autoClose: 3000,
            });
            setTimeout(() => {
                navigate("/login");
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
        <div className="min-h-screen w-[100vw] flex items-center justify-center bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
                noValidate
            >
                <div className="flex items-center justify-center mb-4">
                    <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
                </div>
                <div className="flex items-center justify-center mb-4">
                    <div className="!flex text-2xl text-center justify-center text-black">Welcome to <span className="font-bold pl-2"> myApp</span></div>
                </div>

                <div>
                    <label className="block font-medium text-black">User ID *</label>
                    <input
                        type="text"
                        {...register("userId")}
                        className="w-full border border-gray-300 !bg-transparent text-black rounded px-3 py-2 mt-1"
                        autoComplete="off"
                    />
                    {errors.userId && (
                        <p className="text-sm text-red-600">{errors.userId.message}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium text-black">Password *</label>
                    <input
                        type="password"
                        {...register("password")}
                        className="w-full border border-gray-300 text-black rounded px-3 py-2 mt-1"
                        autoComplete="new-password"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-600">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium text-black">Confirm Password *</label>
                    <input
                        type="password"
                        {...register("confirmPassword")}
                        className="w-full border border-gray-300 text-black rounded px-3 py-2 mt-1"
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                >
                    REGISTER
                </button>
            </form>

            <ToastContainer />
        </div>
    );
}