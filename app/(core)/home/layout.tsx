import React from 'react'
import HeaderBar from '@/app/_components/Navbar';
import HeaderOpenNavBar from '@/app/_components/HeaderOpenNav';


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
        </div>
    );
}

export default layout