import React, { Component } from 'react'
import TitleHeder from './TitleHeder'
import StyleData from '../StyleData'

export default class ChiSqIndep extends Component {
    constructor(props){
        super (props)

        this.state = { 
            data:""
         }
    }
    render() {
        return (
            <div>
                <TitleHeder topic={"HYPOTHESIS TESTING"} name={"CHI-SQUARE TEST INDEPENDENCE"} downloadable={true}/>
                <StyleData data={this.state.data}/>
            </div>
        )
    }
}
