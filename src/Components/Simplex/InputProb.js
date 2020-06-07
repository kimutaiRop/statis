import React, { Component } from 'react'
import axios from 'axios'
import DrawTables from './DrawTables'
import { HOST_URL } from '../../settings'

export default class InputProb extends Component {
    constructor(props) {
        super(props)

        this.state = {
            num_prods: "",
            num_const: "",
            const_names: [],
            prod_names: [],
            arry: [],
            z_row: [],
            solution: [],

            tableus: [],
            pivot_els: [],
            pivot_rows: [],
            pivot_cols: [],
            col_names: [],
            row_names: []
        }
    }
    
    updateProblem = (e) => {
        e.preventDefault()
        let num_prod = parseInt(e.target.elements.num_prod.value),
            num_const = parseInt(e.target.elements.num_const.value);

        let const_names = []
        let x = 1
        let arry = []
        let sol = []

        while (x <= num_const) {
            const_names.push("CONST " + x)
            x += 1
            arry.push(["",])
            sol.push("")
        }
        let prod_names = []
        let i = 1,
            z_r = [];

        while (i <= num_prod) {
            prod_names.push("x" + i)
            i += 1
            z_r.push("")
        }
        let r = 0
        while (r < const_names.length) {
            let c = 0
            while (c < prod_names.length) {
                arry[r][c] = ""
                c += 1
            }
            r += 1
        }
        this.setState({
            num_prods: num_prod,
            num_const: num_const,
            const_names: const_names,
            prod_names: prod_names,
            arry: arry,
            solution: sol,
            z_row: z_r
        })
    }

    updateArray = (e) => {
        let id = e.target.id,
            val = e.target.value,
            ind_a = id.split("_"),
            row_i = parseInt(ind_a[0]),
            col_i = parseInt(ind_a[1]),
            arr = this.state.arry;

        arr[row_i][col_i] = val
        this.setState({
            arry: arr
        })

    }
    updateEquate = (e) => {
        let id = parseInt(e.target.id),
            val = e.target.value;

        let sol = this.state.solution
        sol[id] = val
        this.setState({
            solution: sol
        })
    }
    updateZ = (e) => {
        let id = parseInt(e.target.id.split("_")[1]),
            val = e.target.value;

        let z_r = this.state.z_row
        z_r[id] = val
        this.setState({
            z_row: z_r
        })
    }

    solveEquiz = (e) => {
        e.preventDefault()
        let data = {
            "prob": this.props.prob,
            "z_row": this.state.z_row,
            "solution": this.state.solution,
            "arry": this.state.arry
        }
        
        axios.defaults.headers = {
            "Content-Type": "application/json",
        };
        axios.post(`${HOST_URL}/simplex`, data).then(res => {
            data = res.data
            console.log(data)
            this.setState({
                tableus: data.tables,
                pivot_els: data.pivot_el,
                pivot_rows: data.pivot_rows,
                pivot_cols: data.pivot_cols,
                col_names: data.col_names,
                row_names: data.row_names
            })
        })
    }
    render() {
        let  symb = ">="
        if(this.props.prob===1){
            symb = "<="
        }
        return (
            <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-12 content-column">
                    <form className="row" onSubmit={this.updateProblem}>
                        <div className="col-sm-12">
                        <h3> develop your {this.props.prob===1?"Maximization":"Minimization"} equation</h3>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 form-group">
                            <input type="text" required={true} name="num_prod" placeholder="number of products" aria-required="true" />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 form-group">
                            <input type="text" required={true} name="num_const" placeholder="number of constrains" aria-required="true" />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                            {this.props.show_btn ?
                                <button className="theme-btn style-one">update</button> :
                                ""}
                        </div>
                    </form>
                    {
                        this.state.num_const ?
                            <form onSubmit={this.solveEquiz}>
                                <table border="1" style={{ padding: "10px", marginTop: "20px" }} className="col-lg-6 col-md-6 col-sm-12 form-group">
                                    <tbody >
                                        <tr>
                                        {
                                            ["constrain"].concat(this.state.prod_names).concat(["equate to"]).map((prd_n, j) =>
                                                <td key={j} style={{ padding: "6px" }}>
                                                    <b>{prd_n}</b>
                                                </td>
                                            )
                                        }
                                        </tr>
                                    
                                        {
                                            this.state.const_names.map((cnst, c_index) =>
                                                <tr key={c_index} style={{ padding: "6px", borderRadius: "10px" }}>
                                                    <th style={{ padding: "6px" }}>{cnst}</th>
                                                    {
                                                        this.state.prod_names.map((prd, p_index) =>
                                                            <td key={p_index} style={{ padding: "6px" }}>
                                                                <input required={true} value={this.state.arry[c_index][p_index]} type="text" id={c_index + "_" + p_index} placeholder={prd} onChange={this.updateArray} style={{ width: "40px", textAlign: "center", border: "0px" }} />
                                                            </td>

                                                        )
                                                    }
                                                    <td style={{ padding: "6px" }}>
                                                        <input value={this.state.solution[c_index]} type="text" placeholder={symb} onChange={this.updateEquate} id={c_index} style={{ width: "46px", textAlign: "center", border: "0px" }} />
                                                    </td>
                                                </tr>

                                            )
                                        }
                                        <tr>
                                            <td colSpan={this.state.prod_names.length + 1}></td>
                                        </tr>
                                        <tr>
                                            <th style={{ padding: "6px" }}>Z</th>
                                            {
                                                this.state.prod_names.map((prd, ind) =>
                                                    <td key={ind} style={{ padding: "6px" }}>
                                                        <input value={this.state.z_row[ind]} type="text" id={"z_" + ind} onChange={this.updateZ} placeholder={prd} style={{ width: "46px", textAlign: "center", border: "0px" }} />
                                                    </td>

                                                )
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                                <button type="submit" className="theme-btn style-one">solve now</button>
                            </form>
                            : ""
                    }
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12 table-column">
                    <DrawTables tableus={this.state.tableus}
                        pivot_els={this.state.pivot_els}
                        pivot_rows={this.state.pivot_rows}
                        pivot_cols={this.state.pivot_cols}
                        col_names={this.state.col_names}
                        row_names={this.state.row_names} />
                </div>
            </div>
        )
    }
}
