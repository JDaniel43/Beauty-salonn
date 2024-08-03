// context/AuthContext.js
import { createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const session = useSession();
  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
