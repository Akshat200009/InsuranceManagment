import { FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import policyService from "../Services/policyService";

function Navbar() {
  const { fullName, role } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await policyService.getExpiringPolicies();

      setNotifications(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",

      handleClickOutside,
    );

    return () =>
      document.removeEventListener(
        "mousedown",

        handleClickOutside,
      );
  }, []);

  return (
    <div className="h-16 bg-white shadow-md flex items-center justify-between px-8">
      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Insurance Management System
        </h1>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-2xl text-slate-600 hover:text-blue-600"
          >
            <FaBell />

            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-4 w-96 bg-white rounded-xl shadow-2xl border z-50">
              <div className="p-4 border-b">
                <h2 className="font-bold text-lg">Policy Notifications</h2>
              </div>

              {notifications.length === 0 ? (
                <p className="p-6 text-center text-gray-500">
                  No Policies Expiring Soon
                </p>
              ) : (
                <>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((policy) => (
                      <div
                        key={policy.id}
                        className="border-b p-4 hover:bg-gray-50"
                      >
                        <p className="font-semibold">{policy.customerName}</p>

                        <p className="text-sm text-gray-500">
                          {policy.policyNumber}
                        </p>

                        <p className="text-sm text-red-500 mt-1">
                          Expires : {policy.endDate}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      navigate("/policies");

                      setShowNotifications(false);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-b-xl"
                  >
                    View Policies
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <FaUserCircle className="text-4xl text-blue-600" />

          <div>
            <p className="font-semibold text-slate-800">{fullName}</p>

            <p className="text-sm text-slate-500">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
