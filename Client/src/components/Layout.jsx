import Navbar from "./Navbar";
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
    const location = useLocation();
    const hideNavbarPaths = ['/mail', '/newform', '/successpage', '/activation', '/activationsuccess'];

    // Normalize the pathname to remove trailing slashes
    const currentPath = location.pathname.replace(/\/+$/, '');
    const showNavbar = !hideNavbarPaths.includes(currentPath);

    return (
        <>
            {showNavbar && <Navbar />}
            <main style={{
                backgroundImage: `url('https://img.freepik.com/free-vector/winter-light-blue-gradient-vector-background_53876-126054.jpg?auto=format&fit=crop&w=315&h=220')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex', 
                flexDirection: 'column', 
            }}>
                {children}
            </main>
        </>
    );
}

export default Layout;
