import React, { Component } from 'react'
import * as d3 from 'd3'

export default class StyleData extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
        this.reader = new FileReader();
    }
    

    loadFile = (e)=> {
        var file = e.target.files[0];
        this.reader.addEventListener("load", this.parseFile, false);
        if (file) {
            let d= this.reader.readAsText(file);
            console.log(d)
        }
    }

    parseFile=()=> {
        var doesColumnExist = false;
        var data = d3.csv(this.reader.result, function (d) {
            doesColumnExist = d.hasOwnProperty("someColumn");
            return d;
        });
        console.log(doesColumnExist);
    }
    render() {
        return (
            <div>
                <div>
                    <h1>load and select data that you love to style</h1>
                    <input type="file" onChange={this.loadFile}/>
                </div>
            </div>
        )
    }
}
