import React, { Component } from 'react'
import TitleHeder from './TitleHeder'
import StyleData from '../StyleData'

export default class MannWitney extends Component {
    constructor(props){
        super (props)

        this.state = { 
            data:""
         }
    }
    render() {
        return (
            <div>
                <TitleHeder topic={"HYPOTHESIS TESTING"} name={"MANN WITNEY"} downloadable={true}/>
                <StyleData data={this.state.data}/>
            </div>
        )
    }
}
