import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

export default function DefaultLayout({ children }) {
    return (
        <>
            <AppHeader />
                {children}
            <AppFooter />
        </>
    );
};