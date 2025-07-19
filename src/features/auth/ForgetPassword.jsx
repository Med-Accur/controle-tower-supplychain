// src/features/auth/ForgetPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase/supabase';
import Button from '../../components/ui/Button';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage(" Email envoyé ! Vérifiez votre boîte de réception.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Partie gauche : branding */}
      <aside className="w-1/2 bg-[#341B49] text-white flex flex-col items-center justify-center p-12">
        <h1 className="font-serif text-4xl leading-tight text-center">Control Tower<br />Supply Chain</h1>
      </aside>

      {/* Partie droite : formulaire */}
      <main className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleSendResetLink} className="w-96">
          <h2 className="text-center text-2xl font-bold text-neutral-800 mb-12">
            Mot de passe oublié ?
          </h2>

          <label className="block text-xs text-neutral-500 mb-1">Email</label>
          <input
            type="email"
            required
            placeholder="exemple@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-stone-300 text-base text-neutral-700 py-2 mb-6 focus:outline-none focus:border-indigo-600"
          />

          <Button type="submit" className="w-full bg-[#341B49] text-white py-3 hover:bg-[#47275f]">
            Envoyer le lien de réinitialisation
          </Button>

          <p className="text-center text-xs text-neutral-700 mt-4">
            Se connecter ?{" "}
            <Link to="/login" className="underline font-bold text-neutral-800">
              Cliquez ici
            </Link>
          </p>

          {message && <p className="text-green-600 text-sm text-center mt-4">{message}</p>}
          {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}
        </form>
      </main>
    </div>
  );
}
