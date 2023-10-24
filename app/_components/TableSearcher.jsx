'use client'
import { Litter_bins } from "@/app/(core)/models/Litter_bins";
import { Litter_bins_status } from "@/app/(core)/models/Litter_bins_status";
import { User } from "@/app/(core)/models/User";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Typography,
    Chip,
    Avatar,
    IconButton,
    Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Select,
    Option,
    Card,
    Input
} from "@material-tailwind/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Poppins } from 'next/font/google'
import { FormEvent, Fragment, useState } from "react";
const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
})


const TABLE_HEAD = ["codigo de las papeleras", "papelera normal", "papelera reciclaje", "papelera residuos peligros ", "kg reciclaje", "actualizado por", "fecha actualizacion", ""];


export default function TableSearcher({ data, index, lengCombine, messages, enviarDatosUpdate }) {
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const [buttonSubmit, setbuttonSubmit] = useState(true)

    const handleOpen = () => setOpen(!open) ;
    const handleClose = () => setOpen(false);
    
    // console.log(data);

    const isLast = index === lengCombine;
    const classes = isLast
        ? "p-4"
        : "p-4 border-b border-blue-gray-50";

    const handleChangeSelects = (e) => {

        console.log(e.target.value);
        if (e.target.value) {
            setbuttonSubmit(false)
            console.log("cambiaste de valor");

        }
    }


    const handlerSubmit = async (e) => {
        
        e.preventDefault();

        const formData = new FormData(e.currentTarget)

        const a_status = formData.get("a_status");
        const b_status = formData.get("b_status");
        const c_status = formData.get("c_status");
        var today = new Date();
        var fechaSubmit = today.toISOString();
        const updated_at = new Date(fechaSubmit);
        const user_id = session.user.id;
        var updated_at_add = "0000-00-00 00:00:00";

        var a_content = formData.get("a_content");
        var b_content = formData.get("b_content");
        var c_content = formData.get("c_content");
        if(a_content == null || a_content == ""){a_content = 0;}
        if(b_content == null || b_content == ""){b_content = 0;}
        if(c_content == null || c_content == ""){c_content = 0;}

        const litterbins_main = {

            a_status: a_status,
            b_status: b_status,
            c_status: c_status,
            user_id: user_id,
            updated_at: updated_at
        }

        const litterbins_content = {
            id_litter_bin_main: data.id,
            a_content: a_content,
            b_content: b_content,
            c_content: c_content,
            user_id: user_id,
            created_at: updated_at,
            updated_at: updated_at_add
        }

        // console.log(litterbins_content);
        


        const resultUpdated = await axios.put("/api/papelerysmain/" + data.id, litterbins_main)

        
        const resultInsertNewData = await axios.post("/api/papelerys", litterbins_content)
        // console.log(resultUpdated);
        // console.log(resultInsertNewData);
        // console.log(litterbins_content);
        // console.log(litterbins_main);
        
        

        if (resultUpdated?.status == 200 && resultInsertNewData.status == 200) {

            console.log(resultUpdated.data);
            if (resultUpdated !== null) {
                enviarDatosUpdate(200)
                handleClose();
                setbuttonSubmit(true)
            }
        }
    }
    // console.log(messages);
    return (
        <Fragment>
            <Dialog className="bg-transparent shadow-none" size="md" open={open} handler={handleOpen}>
                <Card className="mx-auto w-full p-8">
                    <form action="" method="post" onSubmit={handlerSubmit}>
                        <Typography variant="h4">
                            <h1 className={poppins.className}>Actualiza la papelera</h1>
                        </Typography>


                        <div className="flex flex-col gap-0 sm:flex-row gap-6 items-center ">
                            <div className="relative h-10 w-full my-4">
                                <select name="a_status" id="a_status" onChange={handleChangeSelects} className="h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-1  focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                                    <option className="optionunu" value="1" selected={data.a_status == "lleno" ? (true) : (false)}> lleno</option>
                                    <option className="optionunu" value="2" selected={data.a_status == "recoleccion" ? (true) : (false)}>recoleccion</option>
                                    <option className="optionunu" value="3" selected={data.a_status == "en uso" ? (true) : (false)}>en uso</option>
                                </select>
                                
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-t-1 peer-focus:before:border-l-1 peer-focus:after:border-t-1 peer-focus:after:border-r-1 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    <span className={poppins.className}>Residuos no aprovechables</span>
                                </label>
                            </div>
                            <div className="input w-full sm:w-96">
                                <Input
                                    type="number"
                                    placeholder="kg de no aprovechables"
                                    name="a_content"
                                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }} crossOrigin={undefined}
                                />
                            </div>
                        </div>





                        <div className="flex flex-col gap-0 sm:flex-row gap-6 items-center ">
                            <div className="relative h-10 w-full my-4">
                                <select name="b_status" id="b_status" onChange={handleChangeSelects} className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-1  focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                                    <option className={poppins.className} value="1" selected={data.b_status == "lleno" ? (true) : (false)}>lleno</option>
                                    <option className={poppins.className} value="2" selected={data.b_status == "recoleccion" ? (true) : (false)}>recoleccion</option>
                                    <option className={poppins.className} value="3" selected={data.b_status == "en uso" ? (true) : (false)}>en uso</option>
                                </select>
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-t-1 peer-focus:before:border-l-1 peer-focus:after:border-t-1 peer-focus:after:border-r-1 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    <span className={poppins.className}>Organicos aprovechables</span>
                                </label>
                            </div>
                            <div className="input w-full sm:w-96">
                                <Input
                                    type="number"
                                    placeholder="kg de organicos aprovechables"
                                    name="b_content"
                                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 placeholder:poppins" 
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }} crossOrigin={undefined}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-0 sm:flex-row gap-6 items-center ">
                            <div className="relative h-10 w-full my-4">
                                <select name="c_status" id="c_status" onChange={handleChangeSelects} className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-1  focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                                    <option className={poppins.className} value="1" selected={data.c_status == "lleno" ? (true) : (false)}>lleno</option>
                                    <option className={poppins.className} value="2" selected={data.c_status == "recoleccion" ? (true) : (false)}>recoleccion</option>
                                    <option className={poppins.className} value="3" selected={data.c_status == "en uso" ? (true) : (false)}>en uso</option>
                                </select>
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-t-1 peer-focus:before:border-l-1 peer-focus:after:border-t-1 peer-focus:after:border-r-1 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    <span className={poppins.className}>Residuos reciclables</span>
                                </label>
                            </div>
                            <div className="input w-full sm:w-96">
                                <Input
                                    type="number"
                                    placeholder="kg de residuos reciclables"
                                    name="c_content"
                                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[120px]" }} crossOrigin={undefined}
                                />
                            </div>
                        </div>

                        <div className="flex items-center mt-4 ">
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1 border-2 border-rose-500"
                                fullWidth
                            >
                                <span className={poppins.className}>Cancel</span>
                            </Button>
                            <Button disabled={buttonSubmit ? (true) : (false)} type="submit" variant="gradient" className="text-sm text-center px-4 pr-4" onClick={handleOpen} fullWidth>
                                <span className={poppins.className}>Confirm</span>
                            </Button>
                        </div>
                    </form>
                </Card>
                <DialogFooter >

                </DialogFooter>
            </Dialog>
            <tr key={data.id}>
                <td className={classes}>
                    <div className="flex items-center gap-3">
                        <TrashIcon className="w-6  text-blue-400	"/>
                        <div className="flex flex-col">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className={poppins.className}
                            >
                                {data.cod_litter_bins}
                            </Typography>
                        </div>
                    </div>
                </td>
                <td className={classes}>

                    <div className="w-max">
                        <Chip
                            variant="ghost"
                            size="sm"
                            value={data.a_status}
                            className={data.a_status ? "text-blue-400 text-base normal-case	font-semibold" : "blue-gray"}
                            color="blue"
                        />
                    </div>
                </td>
                <td className={classes}>
                    <div className="w-max">
                        <Chip
                            variant="ghost"
                            size="sm"
                            value={data.b_status}
                            className={data.b_status ? "text-blue-400 text-base normal-case	font-semibold" : "blue-gray"}
                            color="blue"
                        />
                    </div>
                </td>
                <td className={classes}>
                    <div className="w-max">
                        <Chip
                            variant="ghost"
                            size="sm"
                            value={data.c_status}
                            className={data.c_status ? "text-blue-400 text-base normal-case	font-semibold" : "text-blue-400"}
                            color="blue"
                        />
                    </div>
                </td>
                <td className={classes}>
                    <div className="flex flex-col">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className={poppins.className}
                        >
                            {data.contentData.reduce((total, item) => total + parseFloat(item.c_content), 0)} kg
                        </Typography>

                    </div>
                </td>
                <td className={classes}>
                    <div className="flex flex-col">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className={poppins.className}
                        >
                            {data.user.map((datauser, index) => datauser.first_name + " " + datauser.last_name)}
                        </Typography>

                    </div>
                </td>
                <td className={classes}>
                    <div className="flex flex-col">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className={poppins.className}
                        >
                            {data.updated_at == "0000-00-00 00:00:00" ? data.created_at : data.updated_at}
                        </Typography>

                    </div>
                </td>

                <td className={classes} onClick={handleOpen}>
                    <Tooltip content="Edit User" >
                        <IconButton variant="text">
                            <PencilIcon className="h-6 w-6 text-blue-400 " />
                        </IconButton>
                    </Tooltip>
                </td>
            </tr>
        </Fragment>
    );
}