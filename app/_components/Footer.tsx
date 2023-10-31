'use client'
import { Typography } from "@material-tailwind/react";

export default function FooterComponent() {
    return (
        <footer className="w-full p-8 mt-12">
            <div className="flex flex-row container flex-wrap bg-white items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
                <div className="flex items-center flex-row sm:flex-col text-black">
                    <img
                        alt="Flowbite React Logo"
                        className="mr-3 h-6 sm:h-9"
                        src="https://seeklogo.com/images/R/recycling-logo-FD00AE4529-seeklogo.com.png"
                    />
                    <span className="text-lg">kodirecicla</span>
                </div>

                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            <span className="text-lg">Nosotros</span>
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            <span className="text-lg">Escanea</span>
                        </Typography>
                    </li>


                </ul>
            </div>
            <hr className="my-8 border-blue-gray-50" />
            <Typography color="blue-gray" className="text-center font-normal">
                <span className="text-lg"> &copy; 2023 kodirecicla</span>
            </Typography>
        </footer>
    );
}