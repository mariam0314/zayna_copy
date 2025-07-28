import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GuestLoginModal = ({ onClose }) => {
  const [isNewGuest, setIsNewGuest] = useState(false);
  const [guestId, setGuestId] = useState("");
  const [password, setPassword] = useState("");
  const [newGuestData, setNewGuestData] = useState({
    name: "",
    phone: "",
    roomNumber: "",
  });
  const [generatedCredentials, setGeneratedCredentials] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/guest/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestId, password }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data.token) {
        localStorage.setItem("guestToken", data.token);
        localStorage.setItem("guestInfo", JSON.stringify(data.guest));
        toast.success("Login successful!");
        navigate("/guest-panel", { state: { guest: data.guest } });
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      toast.error("Login failed. Try again later.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, phone, roomNumber } = newGuestData;

    if (!name || !phone || !roomNumber) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    const dataToSend = { name, phone, roomNumber };
    console.log("Sending registration:", dataToSend);

    try {
      const response = await fetch("/api/guest/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      console.log("Registration response:", data);

      if (data.guestId && data.password) {
        setGeneratedCredentials({
          guestId: data.guestId,
          password: data.password,
        });
        toast.success("Registration successful! Save your credentials.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err.message);
      toast.error("Registration failed. Try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white rounded-xl p-6 w-full max-w-md text-black relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black font-bold text-xl hover:text-red-600"
        >
          ✕
        </button>

        {/* LOGIN FORM */}
        {!isNewGuest && !generatedCredentials && (
          <>
            <h2 className="text-xl font-bold mb-4">Guest Login</h2>
            <input
              type="text"
              placeholder="Login ID"
              value={guestId}
              onChange={(e) => setGuestId(e.target.value.trim())}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Login
            </button>
            <p className="mt-4 text-sm text-center">
              New Guest?{" "}
              <button
                onClick={() => setIsNewGuest(true)}
                className="text-blue-600 underline"
              >
                Register here
              </button>
            </p>
          </>
        )}

        {/* REGISTRATION FORM */}
        {isNewGuest && !generatedCredentials && (
          <>
            <h2 className="text-xl font-bold mb-4">Register as Guest</h2>
            <input
              type="text"
              placeholder="Name"
              value={newGuestData.name}
              onChange={(e) =>
                setNewGuestData({ ...newGuestData, name: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Phone (10 digits)"
              value={newGuestData.phone}
              onChange={(e) =>
                setNewGuestData({ ...newGuestData, phone: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Room Number"
              value={newGuestData.roomNumber}
              onChange={(e) =>
                setNewGuestData({
                  ...newGuestData,
                  roomNumber: e.target.value,
                })
              }
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleRegister}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Register
            </button>
            <p className="mt-4 text-sm text-center">
              Already registered?{" "}
              <button
                onClick={() => setIsNewGuest(false)}
                className="text-blue-600 underline"
              >
                Back to Login
              </button>
            </p>
          </>
        )}

        {/* CREDENTIALS DISPLAY AFTER REGISTRATION */}
        {generatedCredentials && (
          <>
            <h2 className="text-xl font-bold mb-4">Guest Created Successfully</h2>
            <p className="mb-2">
              <strong>Guest ID:</strong> {generatedCredentials.guestId}
            </p>
            <p className="mb-4">
              <strong>Password:</strong> {generatedCredentials.password}
            </p>
            <button
              onClick={() => {
                setGeneratedCredentials(null);
                setIsNewGuest(false);
              }}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GuestLoginModal;
