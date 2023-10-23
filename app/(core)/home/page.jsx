'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Poppins } from 'next/font/google'
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})
import TableSearcher from '@/app/_components/TableSearcher';
import CardHeaderComponent from '@/app/_components/CardHeader';
import {PAPELERYSMAIN, PAPELERYS, STATUS, USERS} from '@/const/uri'

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const TABLE_HEAD = ["codigo de las papeleras", "Organicos aprovechables", "Residuos no aprovechables", "Residuos Aprovechables", "kg reciclaje", "actualizado por", "fecha actualizacion", ""];


async function loadPapelerys() {
  const response = await axios.get(PAPELERYSMAIN)
  return response;
}

async function loadContentPapelerys() {
  const response = await axios.get(PAPELERYS)
  return response;
}

async function loadContentStatus() {
  const response = await axios.get(STATUS)
  return response;
}



function Page() {

  const [papeleryMain, setPapeleryMain] = useState([]);
  const [dataPapeleryMainFil, setdataPapeleryMainR] = useState([])
  const [papeleryContent, setPapeleryContent] = useState([])
  const [status, setStatus] = useState([])
  const [datosRecibidos, setDatosRecibidos] = useState(null);
  const [messages, setMessages] = useState(null)
  const [updateData, setupdateData] = useState("")
  
  // realizar filtro de datos con usuarios con este dato 
  const [users, setUsers] = useState([])

  // console.log(users[0].email);

  useEffect(() => {
    async function fetchData() {

      try {

        const responseMainData = await loadPapelerys();
        setPapeleryMain(responseMainData.data);
        setdataPapeleryMainR(responseMainData.data);

        const responseContentData = await loadContentPapelerys();
        setPapeleryContent(responseContentData.data)
        const responseStatusData = await loadContentStatus();
        setStatus(responseStatusData.data);

        fetch(USERS)
          .then(response => {
            if (!response.ok) {
              throw new Error('La solicitud no fue exitosa');
            }
            return response.json(); // Parsear la respuesta JSON
          })
          .then(data => {
            // console.log('Datos recibidos:', data);
            setUsers(data)
            // Realizar acciones con los datos aquí
          })
          .catch(error => {
            console.error('Hubo un error:', error);
          });


        // Almacena los datos en el estado
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }

    }
    fetchData();
  }, []);

  // searcher and filter 
  const recibirDatos = (datos) => {
    setDatosRecibidos(datos);
    if (datos == 650) {
      setMessages("")
      setPapeleryMain(dataPapeleryMainFil)
      return true;
    }
    var responseFilter = dataPapeleryMainFil.filter(item => item.cod_litter_bins.includes(datos));
    console.log(responseFilter.length);
    if (responseFilter.length > 0) {
      setMessages("")
      setPapeleryMain(responseFilter)
    } else if (responseFilter.length == 0) {
      setMessages("no se encontraron coicidencia con sus resultados")
      setPapeleryMain(dataPapeleryMainFil)
    }
  };

  const recibirDatosUpdate = async (datosUpdated) => {
    setupdateData(datosUpdated);
    if (datosUpdated == 200) {
      const responseMainData = await loadPapelerys();
      setPapeleryMain(responseMainData.data);
      setdataPapeleryMainR(responseMainData.data)
      const responseContentData = await loadContentPapelerys();
      setPapeleryContent(responseContentData.data)
      const responseStatusData = await loadContentStatus();
      setStatus(responseStatusData.data);

      fetch(USERS)
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
          }
          return response.json(); // Parsear la respuesta JSON
        })
        .then(data => {
          console.log('Datos recibidos:', data);
          setUsers(data)
          // Realizar acciones con los datos aquí
        })
        .catch(error => {
          console.error('Hubo un error:', error);
        });
    }
  }

  // console.log(papeleryMain);
  const combinedData = papeleryMain.map(mainData => {
    const data_status_a = status.filter(statusFilter => statusFilter.id === mainData.a_status);
    const data_status_b = status.filter(statusFilter => statusFilter.id === mainData.b_status);
    const data_status_c = status.filter(statusFilter => statusFilter.id === mainData.c_status);
    const contentDataSet = papeleryContent.filter(content => content.id_litter_bin_main === mainData.id.toString());
    const contentUserDataSet = contentDataSet.map(content => content.user_id);
    return {
      ...mainData,
      a_status: data_status_a.map(statusFilter => statusFilter.name),
      b_status: data_status_b.map(statusFilter => statusFilter.name),
      c_status: data_status_c.map(statusFilter => statusFilter.name),
      statuses: status.filter(statusFilter => statusFilter.id === mainData.a_status),
      contentData: contentDataSet,
      user: users.filter(user => user.id == mainData.user_id),


    }
  }
  );
  // console.log(combinedData);

  return (
    <Card className="h-fit w-auto	 m-4">
      <CardHeaderComponent enviarDatos={recibirDatos} />
      {/* {messages} */}
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full  table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className={poppins.className}
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {combinedData.map((data, index) => (
              <TableSearcher enviarDatosUpdate={recibirDatosUpdate} key={index} messages={messages} data={data} index={index} lengCombine={combinedData.length} />
            ))}
          </tbody>

        </table>
      </CardBody>
      {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className={poppins.className}>
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" className={poppins.className}>
            Previous
          </Button>
          <Button variant="outlined" size="sm" className={poppins.className}>
            Next
          </Button>
        </div>
      </CardFooter> */}
    </Card>
  )
}

export default Page;