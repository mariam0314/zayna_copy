  import { useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  import 'react-toastify/dist/ReactToastify.css';


  const GuestLoginModal = ({ onClose }) => {
    const [isNewGuest, setIsNewGuest] = useState(false);
    const [guestId, setGuestId] = useState("");
    const [password, setPassword] = useState("");
    const [newGuestData, setNewGuestData] = useState({ name: "", phone: "", roomNumber: "" });
    const [generatedCredentials, setGeneratedCredentials] = useState(null);

    const navigate = useNavigate();

    const handleLogin = () => {
  if (!guestId || !password) {
    alert("Please enter Guest ID and Password.");
    return;
  }

  axios
  .post(`${import.meta.env.VITE_BACKEND_URL}/api/guest/login`, {
    guestId,
    password,
  }, {
    withCredentials: true  // ✅ Add this
  })
  .then((res) => {
    toast.success("Login successful!");
    setGuestId("");
    setPassword("");
    if (typeof onClose === "function") onClose();

    navigate("/guest-panel", { state: res.data });
  })
  .catch((err) => {
    console.error("❌ Login Error: ", err.response?.data || err.message);
    alert(err.response?.data?.error || "Login failed");
  });
};


    const handleRegister = async () => {
  const res = await fetch('https://zayna-backend.onrender.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name, phone, secretCode,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    setGuestId(data.guestId);  // <-- These must match backend response
    setPassword(data.password);
  } else {
    toast.error(data.message || 'Registration failed');
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

          {/* LOGIN VIEW */}
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

          {/* REGISTRATION VIEW */}
          {isNewGuest && !generatedCredentials && (
            <>
              <h2 className="text-xl font-bold mb-4">Register as Guest</h2>
              <input
                type="text"
                placeholder="Name"
                value={newGuestData.name}
                onChange={(e) => setNewGuestData({ ...newGuestData, name: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newGuestData.phone}
                onChange={(e) => setNewGuestData({ ...newGuestData, phone: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Room Number"
                value={newGuestData.roomNumber}
                onChange={(e) => setNewGuestData({ ...newGuestData, roomNumber: e.target.value })}
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

          {/* SUCCESS CREDENTIALS VIEW */}
          {generatedCredentials && (
            <>
              <h2 className="text-xl font-bold mb-4">Guest Created Successfully</h2>
              <p className="mb-2"><strong>Guest ID:</strong> {generatedCredentials.guestId}</p>
              <p className="mb-4"><strong>Password:</strong> {generatedCredentials.password}</p>
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
