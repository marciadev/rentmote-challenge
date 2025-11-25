import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/rent-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/profile");
    } catch {
      setError("Email o contraseña incorrectos");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16">
              <img src={logo} alt="rentmote-logo" />
            </div>
            <h1 className="text-[#1e3a5f] text-xl font-bold tracking-wide">RENTMOTE</h1>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Iniciar Sesión</h2>
            <p className="text-gray-600 text-sm leading-relaxed">Bienvenido Rentmote, por favor ingrese a su cuenta</p>

            <div className="w-full text-left space-y-2">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium">
                Email *
              </label>
              <input
                type="email"
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#4ade80] focus:ring-2 focus:ring-[#4ade80]/20 transition-all"
                required
              />
            </div>
            <div className="w-full text-left space-y-2">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                Contraseña *
              </label>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#4ade80] focus:ring-2 focus:ring-[#4ade80]/20 transition-all"
                required
              />
            </div>
            {error && <p className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</p>}
            <button type="submit" className="w-full sm:w-auto sm:min-w-[200px] h-12 bg-[#238845] hover:bg-[#22c55e] text-white font-semibold rounded-full shadow-sm transition-all duration-200 uppercase tracking-wide">Entrar</button>
            <div className="text-center pt-2">
              <a
                href="#"
                className="text-[#238845] hover:text-[#22c55e] text-sm font-medium underline underline-offset-2 transition-colors"
              >
                Olvidaste tu contraseña
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
