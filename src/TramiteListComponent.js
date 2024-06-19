import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import { jwtDecode } from 'jwt-decode';

const TramiteListComponent = () => {
    const [tramites, setTramites] = useState([]);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const role = decodedToken.sub.role;
    const [selectedTramite, setSelectedTramite] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleViewHistory = (tramite) => {
        setSelectedTramite(tramite);
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
        setSelectedTramite(null);
    };

    useEffect(() => {
        const fetchTramites = async () => {
            try {
                const response = await axios.get('http://164.68.101.193:5150/api/tramites', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTramites(response.data);
            } catch (error) {
                console.error('Error al obtener los trámites', error);
            }
        };

        fetchTramites();
    }, [token]);

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://164.68.101.193:5150/api/tramites/${id}`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTramites(tramites.map(tramite => tramite.id === id ? { ...tramite, estado: 'aprobado' } : tramite));
        } catch (error) {
            console.error('Error al aprobar el trámite', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.put(`http://164.68.101.193:5150/api/tramitesDenegate/${id}`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTramites(tramites.map(tramite => tramite.id === id ? { ...tramite, estado: 'denegado' } : tramite));
        } catch (error) {
            console.error('Error al denegar el trámite', error);
        }
    };

    return (
        <div>
            <NavbarComponent />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Lista de Trámites</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">Tipo de Trámite</th>
                                <th className="py-2 px-4">DNI</th>
                                <th className="py-2 px-4">Nombre</th>
                                <th className="py-2 px-4">Fecha de Registro</th>
                                <th className="py-2 px-4">Archivos</th>
                                <th className="py-2 px-4">Estado</th>
                                <th className="py-2 px-4">Historial</th>
                                {(role === 'admin' || role === 'secretariado' || role === 'jefe_departamento' || role === 'decanato') && <th className="py-2 px-4">Acciones</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {tramites.map(tramite => (
                                <tr key={tramite.id}>
                                    <td className="py-2 px-4">{tramite.id}</td>
                                    <td className="py-2 px-4">{tramite.tipo_tramite}</td>
                                    <td className="py-2 px-4">{tramite.dni}</td>
                                    <td className="py-2 px-4">{tramite.nombre}</td>
                                    <td className="py-2 px-4">{tramite.fecha}</td>
                                    <td className="py-2 px-4">
                                        {tramite.archivos.map((archivo, index) => (
                                            <a key={index} href={`http://164.68.101.193:5150/uploads/${archivo}`} className="text-blue-500 hover:underline block mb-1" download>{archivo}</a>
                                        ))}
                                    </td>
                                    <td className="py-2 px-4">{tramite.estado}</td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => handleViewHistory(tramite)} className="text-blue-500 hover:underline">Ver Historia</button>
                                    </td>
                                    {(role === 'admin' || role === 'secretariado' || role === 'jefe_departamento' || role === 'decanato') && (
                                        <td className="py-2 px-4">
                                            {(
                                                <>
                                                    <button onClick={() => handleApprove(tramite.id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded mr-2">Aprobar</button>
                                                    <button onClick={() => handleReject(tramite.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">Denegar</button>
                                                </>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md w-1/2">
                        <h3 className="text-xl font-bold mb-4">Historial del Trámite</h3>
                        {selectedTramite.historial.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                        <button onClick={closePopup} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TramiteListComponent;
