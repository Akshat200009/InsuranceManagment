import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

import {
    FaShieldAlt,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import { toast } from "react-toastify";
import authService from "../Services/authService";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        if (email.trim() === "") {
            toast.error("Email is required");
            return;
        }

        if (password.trim() === "") {
            toast.error("Password is required");
            return;
        }

        try {

            setLoading(true);

            const response = await authService.login({
                email,
                password
            });

            console.log("Backend Response :", response);

            /*
             * Save customerId only for CUSTOMER
             */
            if (
                response.role === "CUSTOMER" &&
                response.customerId
            ) {

                localStorage.setItem(
                    "customerId",
                    response.customerId
                );

            }

            /*
             * Existing authentication
             */
            login(
                response.token,
                response.role,
                response.fullName
            );

            toast.success(
                response.message || "Login Successful"
            );

            navigate("/dashboard");

        }
        catch (error) {

            console.log("Complete Error :", error);

            if (error.response) {

                console.log(
                    "Backend Error :",
                    error.response.data
                );

                toast.error(
                    error.response.data?.message ||
                    "Login failed"
                );

            } else {

                console.log(
                    "Javascript Error :",
                    error.message
                );

                toast.error(
                    error.message || "Something went wrong"
                );
            }

        }
        finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex">

            {/* Left Section */}

            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white flex-col justify-center items-center p-16">

                <div className="bg-white/20 backdrop-blur-md rounded-full p-6 mb-8 shadow-xl">

                    <FaShieldAlt size={60} />

                </div>

                <h1 className="text-5xl font-extrabold mb-6">

                    Insurance Management

                </h1>

                <p className="text-xl text-blue-100 text-center">

                    Manage Policies, Premiums, Claims and Customers
                    with one modern dashboard.

                </p>

            </div>

            {/* Right Section */}

            <div className="w-full lg:w-1/2 flex justify-center items-center">

                <form
                    onSubmit={handleLogin}
                    className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
                >

                    <div className="text-center">

                        <div className="inline-flex bg-blue-100 p-4 rounded-full mb-4">

                            <FaShieldAlt className="text-blue-700 text-3xl" />

                        </div>

                        <h2 className="text-4xl font-bold text-slate-800">

                            Welcome Back

                        </h2>

                        <p className="text-slate-500 mt-2 mb-8">

                            Login to continue

                        </p>

                    </div>

                    {/* Email */}

                    <div className="mb-5">

                        <label className="block mb-2 font-semibold">

                            Email

                        </label>

                        <div className="relative">

                            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full pl-12 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-700 outline-none"
                            />

                        </div>

                    </div>

                    {/* Password */}

                    <div className="mb-8">

                        <label className="block mb-2 font-semibold">

                            Password

                        </label>

                        <div className="relative">

                            <FaLock className="absolute left-4 top-4 text-gray-400" />

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="w-full pl-12 pr-12 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-700 outline-none"
                            />

                            <button
                                type="button"
                                className="absolute right-4 top-4"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >

                                {showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                                }

                            </button>

                        </div>

                    </div>

                    {/* Login Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >

                        {loading
                            ? "Logging In..."
                            : "Login"
                        }

                    </button>

                    <p className="text-center mt-6">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="text-blue-700 font-semibold ml-2"
                        >
                            Register
                        </Link>

                    </p>

                </form>

            </div>

        </div>

    );
}

export default Login;