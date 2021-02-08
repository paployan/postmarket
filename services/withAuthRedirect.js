import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

/**
 * Support client-side conditional redirecting based on the user's
 * authenticated state.
 *
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param expectedAuth Whether the user should be authenticated for
 * the component to be rendered.
 * @param location The location to redirect to.
 */
export default function withAuthRedirect({
  WrappedComponent,
  expectedAuth,
  location
}) {
  const WithAuthRedirectWrapper = props => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    if (typeof window !== 'undefined' && expectedAuth !== isAuthenticated) {
      router.push(location);
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };
  return WithAuthRedirectWrapper;
}
