import React, { useContext } from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars3BottomLeftIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    CardHeader,
    Input,
    Typography,
    Button,
    Tabs,
    TabsHeader,
    Tab,
} from "@material-tailwind/react";
import { Poppins } from 'next/font/google'
import { Fragment } from "react";
import {useState} from 'react'
import { ThemeContext } from '@/app/(core)/context/homepage';
const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
})

const TABS = [
    {
        label: "Actualiza las papeleras y ten contabilidad",
        value: "todas",
    },
];

const TABLE_HEAD = ["codigo de las papeleras", "papelera normal", "papelera reciclaje", "papelera residuos peligros ", "kg reciclaje", "actualizado por", "fecha actualizacion", ""];




function CardHeaderComponent({enviarDatos}:any) {
    let { isOpenHeaderLeft, setIsOpenHeaderLeft }:any = useContext(ThemeContext);
    const [datosParaEnviar] = useState('Información desde Componente B');

    // En algún punto de tu lógica, cuando quieras enviar los datos de vuelta
    
    const handlerSearch = (e:any) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        var email = formData.get('searcher');
        // console.log(e.target.value);
        if(email == undefined || email == null || email.length == 0 || email.toString().trim().length == 0){
            enviarDatos("eeee");
            console.log("error esta vacio, te muestro todo el contenido");
            
        }else{
            enviarDatos(email);
        }

    }

    const cleanFilters = () => {
        enviarDatos(650);
    }


    return (
        <>
        <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-8 w-full">
                <div>
                    <Typography variant="h5" color="blue-gray" className={poppins.className}>
                        Papeleras Registradas
                    </Typography>
                    <Typography color="gray" className={poppins.className}>
                        mira toda la informacion acerca de estas papeleras
                    </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row w-full sm:w-fit">
                    <Button onClick={cleanFilters} variant="outlined" size="sm" className='w-40	md:w-fit w-full sm:w-fit'>
                        <span className='font-semibold'>view all</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <Tabs value="all" className="w-full md:w-max">
                    <TabsHeader>
                        {TABS.map(({ label, value }) => (
                            <Tab key={value} value={value} className={poppins.className}>
                                &nbsp;&nbsp;{label}&nbsp;&nbsp;
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
                <div className="w-full md:w-96">
                <form onSubmit={handlerSearch} className="mt-8 mb-2 flex flex-col sm:flex-row items-center gap-4">
                    <Input
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />} crossOrigin={undefined}
                        // className="w-52 sm:w-72"
                        id="searcher"
                        name='searcher'
                    />
                    <Button type='submit' className="text-sm text-center px-4 pr-4 w-full sm:w-fit">
                        <span className={poppins.className}>Filtrar</span>
                    </Button>
                </form>
                </div>
            </div>
        </CardHeader>
        </>
    )
}

export default CardHeaderComponent