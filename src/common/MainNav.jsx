import React from "react";
import { Link } from "react-router-dom";

 export default function MainNav() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top bg-dark navbar-dark">
            <div className="container">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
             <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link text-black" to="/">Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-black" to="/producto">Producto</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-black" to="/nosotros">Nosotros</Link>
                    </li>
                </ul>
             </div>
            </div>
        </nav>
    )
}