'use client'
import { PAPELERYS, PAPELERYSMAIN, STATUS, USERS } from '@/const/uri';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Card,
  CardBody,
  Typography
} from "@material-tailwind/react";
import { BrowserQRCodeReader } from '@zxing/library';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ImageScreen from '../(core)/images/screen_qr.png';

const QRReaderComponent = () => {
  const [result, setResult] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);
  const qrScanner = useRef(null);
  const [papeleryMain, setPapeleryMain] = useState([]);
  const [dataPapeleryMainFil, setdataPapeleryMainR] = useState([])
  const [papeleryContent, setPapeleryContent] = useState([])
  const [status, setStatus] = useState([])
  const [users, setUsers] = useState([])
  const reader = useRef(new BrowserQRCodeReader());


  const obtenerIdPapelery = (respuesta) => {
    // let toStrResponse = respuesta.toString();
    const parteDelCodigo = respuesta.substring(35, 43);
    const cadenaTransform = parteDelCodigo.replace(/["']/g, '');
    // console.log(cadenaTransform);
    return cadenaTransform;
  }

  async function loadPapelerys(id) {
    const response = await axios.get(PAPELERYSMAIN + "/" + id)
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

  async function UploadData(response) {
    try {



      let cod_papelery = obtenerIdPapelery(response)
      // console.log(cod_papelery);


      const responseMainData = await loadPapelerys(cod_papelery);
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
          console.log('Datos recibidos:', data);
          setUsers(data)
          // Realizar acciones con los datos aquí
        })
        .catch(error => {
          console.error('Hubo un error:', error);
        });
    } catch (error) {
      console.log(error);
    }

    setResult(response)
  }

  useEffect(() => {
    const initializeReader = async () => {
      await reader.current.getVideoInputDevices();
      setIsLoaded(true);
    };

    initializeReader();

    return () => {
      reader.current.reset();
    };
  }, []);

  const startScan = async () => {
    setIsRunning(true);
    reader.current.decodeFromInputVideoDevice(undefined, videoRef.current)
      .then((result) => {
        UploadData(result.text);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const stopScan = () => {
    setIsRunning(false);
    reader.current.reset();
  };

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
  // var lengCombine = combinedData.dataContent.length();
  // const isLast = index === lengCombine;
  //   const classes = isLast
  //       ? "p-4"
  //       : "";

  // console.log(combinedData);
  return (
    <div className='container mx-auto p-4 px-6 md:px-0 text-black'>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="escanner relative h-fit">
          <div className="middle-scanner">
            <Image src={ImageScreen} alt={'imagen de screen selectr'} />
          </div>
          <video className='panoramic-video' style={{ border: '1px solid black' }} ref={videoRef} />
          <Button className='mt-4 mr-4 bg-blue-400' fullWidth onClick={startScan} disabled={!isLoaded || isRunning}>
            <span className='text-base'>Escanear</span>
          </Button>
          <Button className='mt-4' fullWidth onClick={stopScan} disabled={!isRunning}>
            <span className='text-base'> Detener</span>
          </Button>
        </div>

        {result ? (
          <h1></h1>
        ) : (
          <h1 className='text-xl'>Dale en escanear para escanear el codigo qr y asi tener informacion!</h1>
        )}

        <div className="valuesObt">
          {combinedData.map((data, index) => (
            <Card className="w-full" key={index}>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  <span>papelera con codigo: <span className='text-blue-400'>{data.cod_litter_bins}</span></span>
                </Typography>
                <div className="status w-full sm:w-96">
                  <h1 className='my-2 ml-2 text-black font-medium'>estado de papelera</h1>
                  <Typography>
                    <div className="flex flex-col gap-2 ">
                      <p className='flex gap-2 '><CheckCircleIcon className='w-6 text-blue-400' />No aprovechable:{data.a_status}</p>
                      <p className='flex gap-2'><CheckCircleIcon className='w-6 text-blue-400' />Organico Aprovechable{data.b_status}</p>
                      <p className='flex gap-2'><CheckCircleIcon className='w-6 text-blue-400' />Reciclaja Aprovechable{data.c_status}</p>
                    </div>
                  </Typography>
                </div>
                <div className="overflow-scroll w-full sm:w-full registers">
                  <h1 className='my-4 ml-2 text-black font-medium'>Ultimos 6 cambios y sub-totales</h1>
                  <Typography>
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>

                          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              <span>Organico Aprovechable</span>
                            </Typography>
                          </th>
                          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              <span>No aprovechable</span>
                            </Typography>
                          </th>
                          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              <span>Reciclaja Aprovechable</span>
                            </Typography>
                          </th>
                          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              <span>Fecha del registro</span>
                            </Typography>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.contentData.slice(0, 6).map((dataContent, index) => (
                          <tr key={index}>
                            <td className='p-4 border-b border-blue-gray-50'>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                <span>{dataContent.a_content}</span>
                              </Typography>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  <span>{dataContent.b_content}</span>
                                </Typography>
                              </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <span>{dataContent.c_content}</span>
                              </Typography>

                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <span>{dataContent.created_at}</span>
                              </Typography>
                            </td>


                          </tr>
                        ))}
                        <tr>
                          <td>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              <span className='text-blue-400 p-3'>{data.contentData.reduce((total, item) => total + parseFloat(item.a_content), 0)} kg</span>
                            </Typography>
                          </td>
                          <td>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              <span className='text-blue-400 p-3'>{data.contentData.reduce((total, item) => total + parseFloat(item.b_content), 0)} kg</span>
                            </Typography>
                          </td>
                          <td>
                            <Typography
                              variant="small"
                              color="blue"
                              className="font-normal"
                            >
                              <span className='text-blue-400 p-3'>{data.contentData.reduce((total, item) => total + parseFloat(item.c_content), 0)} kg</span>
                            </Typography>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Typography>
                </div>
              </CardBody>

            </Card>

          ))}
        </div>
      </div>
    </div>
  );
};

export default QRReaderComponent;