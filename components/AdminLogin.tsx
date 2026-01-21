import React, { useState } from 'react';

const SECRET_KEY = '12345';

interface AdminLoginProps {
  onLogin: () => void;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === SECRET_KEY) {
      onLogin();
    } else {
      setError('Invalid secret key.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-heading text-2xl mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-gray-600 mb-4">Enter the secret key to access the admin dashboard.</p>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Secret Key"
            aria-label="Secret Key"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;