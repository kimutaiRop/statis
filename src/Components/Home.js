import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div className="row" style={{marginTop:"20px"}}>
                <div className="col-sm-6">
                    <div>
                        <h6>DEVELOPER</h6>
                        <ul className="nav flex-column">
                            <li className="nav-item"><Link to="/">Contribute developing</Link></li>
                            <li className="nav-item"><Link to="/">Help on developing</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
