import React, { Component } from 'react'
import TitleHeder from './TitleHeder'
import StyleData from '../StyleData'

export default class TestRandomness extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }
    render() {
        return (
            <div>
                <TitleHeder topic={"HYPOTHESIS TESTING"} name={"TEST FOR RANDOMNESS"} downloadable={true} />
                <StyleData data={this.state.data} />
            </div>
        )
    }
}
