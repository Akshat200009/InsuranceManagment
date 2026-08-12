import { useEffect, useState } from "react";

import DashboardLayout from "../../Layouts/DashboardLayout";

import {
  FaBuilding,
  FaShieldAlt,
  FaFileAlt,
  FaBell,
  FaSave,
} from "react-icons/fa";

import Swal from "sweetalert2";


function SystemSettings() {

  const [settings, setSettings] = useState({
    companyName: "Insurance Management System",
    email: "admin@insurance.com",
    phone: "",
    address: "",

    sessionTimeout: "30",

    maxFileSize: "10",

    newCustomerNotification: true,
    newClaimNotification: true,
    claimApprovedNotification: true,
    claimRejectedNotification: true,
    documentUploadedNotification: true,
  });


  // ===============================
  // LOAD SETTINGS
  // ===============================

  useEffect(() => {

    const savedSettings =
      localStorage.getItem("systemSettings");

    if (savedSettings) {

      setSettings(
        JSON.parse(savedSettings)
      );

    }

  }, []);


  // ===============================
  // INPUT CHANGE
  // ===============================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // ===============================
  // TOGGLE CHANGE
  // ===============================

  const handleToggle = (name) => {

    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

  };


  // ===============================
  // SAVE SETTINGS
  // ===============================

  const handleSave = () => {

    localStorage.setItem(
      "systemSettings",
      JSON.stringify(settings)
    );


    Swal.fire({

      icon: "success",

      title: "Settings Saved",

      text: "System settings updated successfully.",

      timer: 1500,

      showConfirmButton: false,

    });

  };


  return (

    <DashboardLayout>

      <div className="p-8">

        {/* ===============================
            HEADER
        =============================== */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold">

            System Settings

          </h1>

          <p className="text-gray-500 mt-2">

            Manage system configuration and preferences.

          </p>

        </div>


        {/* ===============================
            COMPANY INFORMATION
        =============================== */}

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">

              <FaBuilding />

            </div>

            <div>

              <h2 className="text-xl font-bold">

                Company Information

              </h2>

              <p className="text-gray-500 text-sm">

                Manage basic company information.

              </p>

            </div>

          </div>


          <div className="grid md:grid-cols-2 gap-6">

            {/* Company Name */}

            <div>

              <label className="block font-semibold mb-2">

                Company Name

              </label>

              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Email */}

            <div>

              <label className="block font-semibold mb-2">

                Company Email

              </label>

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Phone */}

            <div>

              <label className="block font-semibold mb-2">

                Phone

              </label>

              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                placeholder="Enter company phone"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Address */}

            <div>

              <label className="block font-semibold mb-2">

                Address

              </label>

              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                placeholder="Enter company address"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>

        </div>


        {/* ===============================
            SECURITY SETTINGS
        =============================== */}

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="bg-green-100 text-green-600 p-3 rounded-xl">

              <FaShieldAlt />

            </div>

            <div>

              <h2 className="text-xl font-bold">

                Security Settings

              </h2>

              <p className="text-gray-500 text-sm">

                Configure basic security preferences.

              </p>

            </div>

          </div>


          <div className="max-w-md">

            <label className="block font-semibold mb-2">

              Session Timeout

            </label>

            <select
              name="sessionTimeout"
              value={settings.sessionTimeout}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="15">
                15 Minutes
              </option>

              <option value="30">
                30 Minutes
              </option>

              <option value="60">
                1 Hour
              </option>

              <option value="120">
                2 Hours
              </option>

            </select>

          </div>

        </div>


        {/* ===============================
            DOCUMENT SETTINGS
        =============================== */}

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">

              <FaFileAlt />

            </div>

            <div>

              <h2 className="text-xl font-bold">

                Document Settings

              </h2>

              <p className="text-gray-500 text-sm">

                Configure document upload preferences.

              </p>

            </div>

          </div>


          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block font-semibold mb-2">

                Maximum File Size

              </label>

              <select
                name="maxFileSize"
                value={settings.maxFileSize}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="5">
                  5 MB
                </option>

                <option value="10">
                  10 MB
                </option>

                <option value="20">
                  20 MB
                </option>

                <option value="50">
                  50 MB
                </option>

              </select>

            </div>


            <div>

              <label className="block font-semibold mb-2">

                Allowed File Types

              </label>

              <div className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50">

                <span className="mr-3">
                  PDF
                </span>

                <span className="mr-3">
                  JPG
                </span>

                <span>
                  PNG
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ===============================
            NOTIFICATION SETTINGS
        =============================== */}

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">

              <FaBell />

            </div>

            <div>

              <h2 className="text-xl font-bold">

                Notification Settings

              </h2>

              <p className="text-gray-500 text-sm">

                Manage system notification preferences.

              </p>

            </div>

          </div>


          <div className="space-y-5">

            <Toggle
              label="New Customer Notification"
              checked={settings.newCustomerNotification}
              onChange={() =>
                handleToggle("newCustomerNotification")
              }
            />

            <Toggle
              label="New Claim Notification"
              checked={settings.newClaimNotification}
              onChange={() =>
                handleToggle("newClaimNotification")
              }
            />

            <Toggle
              label="Claim Approved Notification"
              checked={settings.claimApprovedNotification}
              onChange={() =>
                handleToggle("claimApprovedNotification")
              }
            />

            <Toggle
              label="Claim Rejected Notification"
              checked={settings.claimRejectedNotification}
              onChange={() =>
                handleToggle("claimRejectedNotification")
              }
            />

            <Toggle
              label="Document Uploaded Notification"
              checked={settings.documentUploadedNotification}
              onChange={() =>
                handleToggle("documentUploadedNotification")
              }
            />

          </div>

        </div>


        {/* ===============================
            SAVE BUTTON
        =============================== */}

        <div className="flex justify-end">

          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
          >

            <FaSave />

            Save Settings

          </button>

        </div>

      </div>

    </DashboardLayout>

  );

}


// ========================================
// TOGGLE COMPONENT
// ========================================

function Toggle({
  label,
  checked,
  onChange
}) {

  return (

    <div className="flex justify-between items-center border-b pb-4">

      <span className="font-medium text-gray-700">

        {label}

      </span>


      <button
        type="button"
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition ${
          checked
            ? "bg-blue-600"
            : "bg-gray-300"
        }`}
      >

        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
            checked
              ? "left-7"
              : "left-1"
          }`}
        />

      </button>

    </div>

  );

}


export default SystemSettings;