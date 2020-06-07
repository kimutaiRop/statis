import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class MainLayout extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">STATIKA</Link>
                    <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap">
                            <Link className="nav-link" to="/">Sign out</Link>
                        </li>
                    </ul>
                </nav>

                <div className="container-fluid">
                    <div className="row">
                        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                            <div className="sidebar-sticky">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/">
                                            <span data-feather="home"></span>
              Dashboard <span className="sr-only">(current)</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/simplex">
                                            <span data-feather="file"></span>
              simplex
            </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            <span data-feather="shopping-cart"></span>
              Products
            </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            <span data-feather="users"></span>
              Customers
            </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            <span data-feather="bar-chart-2"></span>
              Reports
            </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            <span data-feather="layers"></span>
              Integrations
            </Link>
                                    </li>
                                </ul>

                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                    <span>Saved reports</span>
                                    <Link className="d-flex align-items-center text-muted" to="/">
                                        <span data-feather="plus-circle"></span>
                                    </Link>
                                </h6>
                                <ul className="nav flex-column mb-2">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            <span data-feather="file-text"></span>
              Current month
            </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            <span data-feather="file-text"></span>
              Last quarter
            </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            <span data-feather="file-text"></span>
              Social engagement
            </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            <span data-feather="file-text"></span>
              Year-end sale
            </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </div>)
    }
}
