import { useEffect, useState } from "react";
import { getUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    getUser(token).then(data => setUser(data.user)).catch(() => navigate("/"));
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h1 className="text-center text-[#1e3a5f] text-xl font-bold tracking-wide">RENTMOTE</h1>

          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Perfil de Usuario</h2>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-medium">Nombre</label>
              <div className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 flex items-center">
                {user.nombre}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-medium">Apellido</label>
              <div className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 flex items-center">
                {user.apellido}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-medium">Edad</label>
              <div className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 flex items-center">
                {user.edad}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full h-12 border-2 border-[#1e3a5f] hover:bg-[#1e3a5f] text-[#1e3a5f] hover:text-white font-semibold rounded-full transition-all duration-200 uppercase tracking-wide">Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}