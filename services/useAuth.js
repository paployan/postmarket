import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

/**
 * The initial value of `isAuthenticated` comes from the `authenticated`
 * prop which gets set by _app. We store that value in state and ignore
 * the prop from then on. The value can be changed by calling the
 * `setAuthenticated()` method in the context.
 */
export const AuthProvider = ({
  children,
  authenticated
}) => {
  const [isAuthenticated, setAuthenticated] = useState(authenticated);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const initializeAuth = async () => {
      const response = await fetch('/api/auth/user', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache': 'no-cache'
        },
        credentials: 'include'
      });
      setAuthenticated(response.status === 200);
      const data = await response.json();
      setCurrentUser(data);
    };
    initializeAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function useIsAuthenticated() {
  const context = useAuth();
  return context.isAuthenticated;
};
