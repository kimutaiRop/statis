import React, { Component } from 'react'
import Help from './Help'
import InputProb from './InputProb'

class Simplex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            prob: 1
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">LINEAR PROGRAMMING (SIMPLEX)</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                        </div>
                        <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                            <span data-feather="calendar"></span>This week</button>
                    </div>

                </div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="maximization-tab" data-toggle="tab" href="#maximization" onClick={() => this.setState({ prob: 1 })} role="tab" aria-controls="maximization" aria-selected="true">Maximization</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="minimization-tab" data-toggle="tab" onClick={() => this.setState({ prob: 2 })} href="#minimization" role="tab" aria-controls="minimization" aria-selected="false">Minimization</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="demo-tab" data-toggle="tab" href="#demo" role="tab" aria-controls="demo" aria-selected="false">Demo</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="maximization" role="tabpanel" aria-labelledby="maximization-tab">
                        <InputProb prob={this.state.prob} show_btn={true} />
                    </div>
                    <div className="tab-pane fade" id="minimization" role="tabpanel" aria-labelledby="minimization-tab">
                        <InputProb prob={this.state.prob} show_btn={true} />
                    </div>
                    <div className="tab-pane fade" id="demo" role="tabpanel" aria-labelledby="demo-tab">
                        <Help prob={this.state.prob} />
                    </div>
                </div>


            </div>
        )
    }
}
export default Simplex