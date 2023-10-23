'use client'
import React, { useContext } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from '@/app/(core)/context/homepage';
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})


export default function HeaderOpenNavBar() {

    let { isOpenHeaderLeft, setIsOpenHeaderLeft }: any = useContext(ThemeContext);
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar className="mx-auto w-full max-w-none px-6 py-3 fixed z-50">
            <div className="flex items-center justify-between text-blue-gray-900">
                <div className="mb-2 flex items-center gap-4 p-4 ">
                    <img
                        alt="Flowbite React Logo"
                        className="mr-3 h-6 sm:h-9"
                        src="https://seeklogo.com/images/R/recycling-logo-FD00AE4529-seeklogo.com.png"
                    />
                    <Typography variant="h5" color="blue-gray" className={poppins.className}>
                        kodirecicla
                    </Typography>
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
                    ripple={false}
                    onClick={() => setIsOpenHeaderLeft(!isOpenHeaderLeft)}
                >
                    {isOpenHeaderLeft ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
        </Navbar>
    );
}