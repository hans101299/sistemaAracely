// NavbarComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <ul className="flex justify-around">
                <li className="text-white text-lg">
                    <Link
                        to="/form"
                        className="block px-8 py-2 hover:bg-blue-700 rounded"
                    >
                        Formulario
                    </Link>
                </li>
                <li className="text-white text-lg">
                    <Link
                        to="/tramites"
                        className="block px-8 py-2 hover:bg-blue-700 rounded"
                    >
                        Lista de Trámites
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarComponent;
