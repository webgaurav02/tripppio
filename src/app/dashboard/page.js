// pages/dashboard.js
'use client'
import { useSession } from 'next-auth/react';
import UserDashboard from '../components/UserDashboard';
const Dashboard = () => {
    const { data: session, status } = useSession();  // Get session data

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>You are not authenticated. Please log in.</div>;
    }

    const email = session.user.email; // Get the user's email from the session


    return (
        <div className='py-20 md:px-80 px-10'>
            <UserDashboard email={email} />
        </div>
    );
};

export default Dashboard;
