// src/features/auth/ResetPassword.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sessionReady, setSessionReady] = useState(false);

  const { user, resetPassword } = useAuth();
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setSessionReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('❌ Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await resetPassword(password);
      setMessage(' Mot de passe mis à jour avec succès !');
      setTimeout(() => {
        navigate(isLoggedIn ? '/dashboard' : '/login');
      }, 2000);
    } catch (err) {
      setError(`❌ ${err.message}`);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Partie gauche : branding */}
      <aside className="w-1/2 bg-[#341B49] text-white flex flex-col items-center justify-center p-12">
        <h1 className="font-serif text-4xl leading-tight text-center">
          Control Tower<br />Supply Chain
        </h1>
      </aside>

      {/* Partie droite : formulaire */}
      <main className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleUpdatePassword} className="w-96">
          <h2 className="text-center text-2xl font-bold text-neutral-800 mb-12">
            {isLoggedIn ? 'Modifier mon mot de passe' : 'Réinitialiser le mot de passe'}
          </h2>

          {sessionReady || isLoggedIn ? (
            <>
              <Input
                label="Nouveau mot de passe"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**************"
                required
              />

              <Input
                label="Confirmer le mot de passe"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="**************"
                required
                error={password !== confirmPassword ? "Les mots de passe ne correspondent pas" : ""}
              />

              <Button
                type="submit"
                className="w-full bg-[#341B49] text-white py-3 hover:bg-[#47275f]"
              >
                Valider
              </Button>

              {!isLoggedIn && (
                <p className="text-center text-xs text-neutral-700 mt-4">
                  Se connecter ?{" "}
                  <Link to="/login" className="underline font-bold text-neutral-800">
                    Cliquez ici
                  </Link>
                </p>
              )}

              {message && <p className="text-green-600 text-sm text-center mt-4">{message}</p>}
              {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}
            </>
          ) : (
            <p className="text-center text-gray-500">Chargement de la session sécurisée...</p>
          )}
        </form>
      </main>
    </div>
  );
}
