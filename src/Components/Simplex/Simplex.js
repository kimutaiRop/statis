import React, { Component } from 'react'
import Help from './Help'
import InputProb from './InputProb'
import TitleHeder from '../Hypothesis/TitleHeder'

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
                <TitleHeder topic={"LINEAR PROGRAMMING"} name={"SIMPLEX"}/>
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