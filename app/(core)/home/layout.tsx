import React from 'react'
import HeaderBar from '@/app/_components/Navbar';
import HeaderOpenNavBar from '@/app/_components/HeaderOpenNav';
import Footer from '@/app/_components/Footer';

function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <HeaderOpenNavBar />
            <div className='flex'>
                <HeaderBar />
                <main className='w-full mt-28'>
                    {children}
                </main>
            </div>
                <Footer />
        </div>
    );
}

export default layout