import React, { useState } from 'react';
import axios from 'axios';

const TramiteFormComponent = () => {
    const [tipoTramite, setTipoTramite] = useState('');
    const [dni, setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [archivos, setArchivos] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('tipoTramite', tipoTramite);
            formData.append('dni', dni);
            formData.append('nombre', nombre);
            formData.append('fechaNacimiento', fechaNacimiento);
            archivos.forEach(archivo => {
                formData.append('archivos', archivo);
            });

            const token = localStorage.getItem('token');
            await axios.post('http://164.68.101.193:5150/api/tramites', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Se ha registrado correctamente")
        } catch (error) {
            alert('Error al enviar el trámite', error);
        }
    };

    const handleArchivoChange = (e) => {
        setArchivos([...e.target.files]);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Enviar Trámite</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="tipoTramite" className="block text-gray-700 text-sm font-bold mb-2">Tipo de Trámite</label>
                        <select
                            id="tipoTramite"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={tipoTramite}
                            onChange={(e) => setTipoTramite(e.target.value)}
                            required
                        >
                            <option value="">Seleccionar tipo de trámite</option>
                            <option value="Tipo1">Tipo 1</option>
                            <option value="Tipo2">Tipo 2</option>
                            {/* Agrega más opciones según sea necesario */}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dni" className="block text-gray-700 text-sm font-bold mb-2">DNI</label>
                        <input
                            type="text"
                            id="dni"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fechaNacimiento" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            id="fechaNacimiento"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="archivos" className="block text-gray-700 text-sm font-bold mb-2">Archivos</label>
                        <input
                            type="file"
                            id="archivos"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleArchivoChange}
                            multiple
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600">Enviar Trámite</button>
                </form>
            </div>
        </div>
    );
};

export default TramiteFormComponent;
