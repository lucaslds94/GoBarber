import { createContext } from 'react';

interface AuthContextData {
  name: string;
}

const AuthContext = createContext<AuthContextData | null>({} as AuthContextData);

export default AuthContext;
