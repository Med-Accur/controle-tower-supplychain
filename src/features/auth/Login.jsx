// src/features/auth/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 
  


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password }); 
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Partie gauche (visuelle) */}
      <aside className="w-1/2 bg-[#341B49] text-white flex flex-col items-center justify-center p-12">
        <img src={logo} alt="Logo" className="w-80 h-80 mb-10" />
        <h1 className="font-serif text-4xl leading-tight text-center">
          Control Tower<br />Supply Chain
        </h1>
      </aside>

      {/* Partie droite (formulaire) */}
      <main className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-96">
          <h2 className="text-center text-2xl font-bold text-neutral-800 mb-12">
            Se connecter
          </h2>

          <div className="my-2">
            <label className="block text-xs text-neutral-500 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              required
              className="w-full border-b border-stone-300 text-base text-neutral-700 py-2 focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="my-2">
            <label className="block text-xs text-neutral-500 mb-1">Mot de passe</label>
               <Input
                 type="password"
                 value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**************"
                required
               />


            
          </div>

          <Button type="submit" className="w-full my-2 py-3 bg-[#341B49] text-white text-sm font-semibold rounded-md shadow-lg hover:bg-[#47275f] transition duration-300"
            >Se connecter 
          </Button>

          <p className="my-2 text-center text-xs text-neutral-700 mb-8">
            Mot de passe oublié ?{' '}
            <Link to="/forgetpassword" className="font-bold underline text-neutral-800">
              Cliquez ici
            </Link>
          </p>

          {error && (
            <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
          )}
        </form>
      </main>
    </div>
  );
}
