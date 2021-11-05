import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {



    return (
        <nav
            className="navbar navbar-expand-lg navbar-light bg-light shadow mb-2 bg-body rounded"
            style={{ color: "#204C6F" }}
        >
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/tracking"
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                            >
                                Tracking
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex" style={{ marginRight: 20, flexDirection: "column", fontSize: "18px" }}>
                        <div style={{ fontSize: "14px" }}>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
