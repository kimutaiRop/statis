import React, { Component } from 'react'
import StyleData from '../StyleData'
import TitleHeder from './TitleHeder'

export default class SpermanRank extends Component {
    constructor(props){
        super (props)

        this.state = { 
            data:""
         }
    }
    render() {
        return (
            <div>
                <TitleHeder topic={"HYPOTHESIS TESTING"} name={"SPEARMAN RANK"} downloadable={true}/>
                <StyleData data={this.state.data}/>
            </div>
        )
    }
}
