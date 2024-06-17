import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const TramiteListComponent = () => {
    const [tramites, setTramites] = useState([]);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const role = decodedToken.sub.role;

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
            await axios.put(`http://164.68.101.193:5150/api/tramites/${id}`, { estado: 'aprobado' }, {
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
            await axios.put(`http://164.68.101.193:5150/api/tramites/${id}`, { estado: 'denegado' }, {
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
                            <th className="py-2 px-4">Fecha de Nacimiento</th>
                            <th className="py-2 px-4">Archivos</th>
                            <th className="py-2 px-4">Estado</th>
                            {(role === 'admin' || role === 'supervisor') && <th className="py-2 px-4">Acciones</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tramites.map(tramite => (
                            <tr key={tramite.id}>
                                <td className="py-2 px-4">{tramite.id}</td>
                                <td className="py-2 px-4">{tramite.tipo_tramite}</td>
                                <td className="py-2 px-4">{tramite.dni}</td>
                                <td className="py-2 px-4">{tramite.nombre}</td>
                                <td className="py-2 px-4">{tramite.fecha_nacimiento}</td>
                                <td className="py-2 px-4">
                                    {tramite.archivos.map((archivo, index) => (
                                        <a key={index} href={`http://164.68.101.193:5150/uploads/${archivo}`} className="text-blue-500 hover:underline block mb-1" download>{archivo}</a>
                                    ))}
                                </td>
                                <td className="py-2 px-4">{tramite.estado}</td>
                                {(role === 'admin' || role === 'supervisor') && (
                                    <td className="py-2 px-4">
                                        {tramite.estado === 'registrado' && (
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
    );
};

export default TramiteListComponent;
