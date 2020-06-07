import React, { Component } from 'react'
import InputProb from './InputProb'

export default class Help extends Component {
    constructor(props){
        super(props)
        this.state = {
            arr:[["4","2"],["2","3"]],
            z:["3","1"],
            sol:["4","4"]
        }
    }
    render() {
        return (
            <div className="row" style={{padding:"20px"}}>
                <div className="col-lg-6 col-md-6 col-sm-12 content-column">
                    <div className="content-box row">
                        <div className="col-sm-6">
                            <pre style={{ border: "1px dotted lightgrey", padding: "10px" }}>
                                4x₁ + 2x₂ ≶ 4<br />
                                2x₁ + 3x₂ ≶ 4<br />
                                z = 3x₁ + x₂
                            </pre>
                        </div>
                        <div className="col-sm-6">
                            <p>You can triger this program to solve the following equations as an example</p>
                        </div>
                        <p>This is an autometad example to solve the equations above</p>
                        <div>
                        <button className="" style={{margin:"5px"}}>solve maximization</button>
                        <button className="" style={{margin:"5px"}}>solve minimization</button>
                        </div>
                    </div>
                </div>
                <InputProb show_btn={false}/>
                <pre>coming soon</pre>
            </div>

        )
    }
}
