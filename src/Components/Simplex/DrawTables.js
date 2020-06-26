import React, { Component } from 'react'

export default class DrawTables extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "kim",
            age: 20
        }
    }

    render() {
        return (
            <div>
                <h3>SOLUTION FOR YOUR SIMPLEX</h3>
                {
                    this.props.tableus.map((tb, T_IND) =>
                        <div className="row" style={{ marginBottom: "20px" }} key={T_IND}>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <table>
                                    <tbody>
                                        <tr style={{ padding: "6px", border: "1px solid lightgrey" }}>
                                        <th colSpan={this.props.col_names[T_IND].length + 1} style={{ padding: "6px", border: "1px solid lightgrey" }}>
                                                {T_IND + 1}<sup>{String(T_IND + 1).charAt(String(T_IND + 1).length - 1) === 1 ? "th" : String(T_IND + 1).charAt(String(T_IND + 1).length - 1) === 2 ? "nd" : String(T_IND + 1).charAt(String(T_IND + 1).length - 1) === 3 ? "rd" : "th"}</sup> TABLEU
                                        </th>
                                        </tr>
                                        <tr>
                                            {["row name"].concat(this.props.col_names[T_IND]).map((c, inds) =>
                                                <td key={inds} style={{ padding: "6px", border: "1px solid lightgrey" }}>
                                                    <b>{c}</b>
                                                </td>
                                            )}
                                        </tr>
                                        {
                                            tb.map((rw, ind) =>
                                                <tr key={ind} style={{ padding: "6px", border: "1px solid lightgrey" }}>
                                                    <td>
                                                        <input value={this.props.row_names[T_IND][ind]} readOnly={true} type="text" style={{ width: "46px", textAlign: "center", border: "0px" }} />
                                                    </td>
                                                    {
                                                        rw.map((el, ind) =>

                                                            <td key={ind} style={{ padding: "6px", border: "1px solid lightgrey" }}>
                                                                <input value={el} readOnly={true} type="text" style={{ width: "46px", textAlign: "center", border: "0px" }} />

                                                            </td>
                                                        )
                                                    }
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 float-right">
                                {
                                    this.props.pivot_cols ?
                                        T_IND < this.props.pivot_cols.length ?
                                            <pre>
                                                pivot col       : [{this.props.pivot_cols[T_IND].map((e,ind) => <span key={ind}>{e},</span>)}]<br />
                                    pivot row       : [{this.props.pivot_rows[T_IND].map((e,ind) => <span key={ind}>{e},</span>)}]<br />
                                    pivot element   : {this.props.pivot_els[T_IND]}<br />
                                            </pre> :
                                            null
                                        :
                                        null
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}
