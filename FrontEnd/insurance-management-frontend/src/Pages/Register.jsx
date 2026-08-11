import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../Services/authService";

import {
  FaShieldAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: "",

    dob: "",

    address: "",

    role: "CUSTOMER",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.fullName.trim() === "") {
      toast.error("Full Name is required");

      return;
    }

    if (formData.email.trim() === "") {
      toast.error("Email is required");

      return;
    }

    if (formData.phone.trim() === "") {
      toast.error("Phone Number is required");

      return;
    }
    if (formData.phone.length > 10) {
      toast.error("Invalid Phone Number");

      return;
    }

    if (formData.password.trim() === "") {
      toast.error("Password is required");

      return;
    }

    if (formData.password.length < 6) {
      toast.error("Minimum 6 Characters Needed!");

      return;
    }

    if (formData.confirmPassword.trim() === "") {
      toast.error("Confirm Password is required");

      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }
    if (formData.dob === "") {
      toast.error("Date of Birth is required");
      return;
    }

    if (formData.address.trim() === "") {
      toast.error("Address is required");
      return;
    }

    try {
      setLoading(true);

      const request = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dob: formData.dob,
        address: formData.address,
        role: formData.role,
      };

      const response = await authService.register(request);

      toast.success(response);

      navigate("/");
    } catch (error) {
      if (error.response) {
        const data = error.response.data;

        // RuntimeException
        if (data.message) {
          toast.error(data.message);
        }

        // Validation Errors
        else {
          const firstError = Object.values(data)[0];

          toast.error(firstError);
        }
      } else {
        toast.error("Invalid Credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex">
      {/* Left Section */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white flex-col justify-center items-center p-16">
        <div className="bg-white/20 p-6 rounded-full mb-8">
          <FaShieldAlt size={60} />
        </div>

        <h1 className="text-5xl font-bold mb-6">Insurance Management</h1>

        <p className="text-xl text-blue-100 text-center">
          Create your account and access the insurance dashboard.
        </p>
      </div>

      {/* Right Section */}

      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <div className="inline-flex bg-blue-100 p-4 rounded-full mb-4">
              <FaShieldAlt className="text-blue-700 text-3xl" />
            </div>

            <h2 className="text-4xl font-bold text-slate-800">
              Create Account
            </h2>

            <p className="text-slate-500 mt-2">Register to continue</p>
          </div>

          {/* Full Name */}

          <div className="mb-4">
            <label className="font-semibold">Full Name</label>

            <div className="relative mt-2">
              <FaUser className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-xl pl-12 p-3 focus:ring-2 focus:ring-blue-700 outline-none"
              />
            </div>
          </div>

          {/* Email */}

          <div className="mb-4">
            <label className="font-semibold">Email</label>

            <div className="relative mt-2">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-xl pl-12 p-3 focus:ring-2 focus:ring-blue-700 outline-none"
              />
            </div>
          </div>

          {/* Phone */}

          <div className="mb-4">
            <label className="font-semibold">Phone</label>

            <div className="relative mt-2">
              <FaPhone className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-xl pl-12 p-3 focus:ring-2 focus:ring-blue-700 outline-none"
              />
            </div>
          </div>

          {/* Password */}

          <div className="mb-4">
            <label className="font-semibold">Password</label>

            <div className="relative mt-2">
              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-xl pl-12 pr-12 p-3 focus:ring-2 focus:ring-blue-700 outline-none"
              />

              <button
                type="button"
                className="absolute right-4 top-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div className="mb-4">
            <label className="font-semibold">Confirm Password</label>

            <div className="relative mt-2">
              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-xl pl-12 pr-12 p-3 focus:ring-2 focus:ring-blue-700 outline-none"
              />

              <button
                type="button"
                className="absolute right-4 top-4"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {/* Date Of Birth */}

          <div className="mb-4">
            <label className="font-semibold">Date of Birth</label>

            <div className="relative mt-2">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-700 outline-none"
              />
            </div>
          </div>

          {/* Address */}

          <div className="mb-4">
            <label className="font-semibold">Address</label>

            <textarea
              name="address"
              rows={3}
              placeholder="Enter Complete Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 resize-none focus:ring-2 focus:ring-blue-700 outline-none"
            />
          </div>
          {/* Role */}

          <div className="mb-6">
            <label className="font-semibold">Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 mt-2 focus:ring-2 focus:ring-blue-700 outline-none"
            >
              <option value="CUSTOMER">CUSTOMER</option>

              <option value="AGENT">AGENT</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-xl py-3 font-semibold hover:scale-[1.02] transition disabled:opacity-70"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center mt-6">
            Already have an account?
            <Link to="/" className="text-blue-700 ml-2 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
