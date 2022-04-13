import React, { Component } from 'react'

export default class TemplateSearch extends Component {
    render() {
        return (
            <div className="well" style={{ height: "15rem" }}>
                <div style={{ position: "relative", zIndex: "0" }}>
                    <div className="container-fluid">
                        <div className="show-grid row">
                            <div className="col-lg-1" style={{fontSize: "large", fontWeight: "500"}}>Search</div>
                            <div className="col-lg-10"></div>
                        </div>
                        <div className="show-grid row" style={{ height: "3.2rem" }}>
                            <div className="col-lg-1"></div>
                            <div
                                className="col-lg-1"
                                style={{ fontSize: "larger", fontWeight: "600", position: "relative", top: "50%", transform: "translateY(-50%)", }}
                            >Type</div>
                            {/* <div
                                className="col-lg-1"
                                style={{ fontSize: "larger", fontWeight: "600", position: "relative", top: "50%", transform: "translateY(-50%)", }}
                            ></div> */}
                            <select className="col-lg-7" name="cars" id="cars" style={{ height: "100%", marginLeft: '2rem' }}>
                                <option value="volvo">BC</option>
                                <option value="saab">Saab</option>
                                <option value="opel">Opel</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                        <div className="show-grid row" style={{ marginTop: "1rem" }}>
                            <div className="col-lg-7"></div>
                            <div className="col-lg-4" style={{marginLeft: "5rem"}}>
                                <button className="btn btn-primary">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="well-title" style={{fontSize: "large", fontWeight: "600"}}>Search</div>
                <div className="" style={{ height: "3.5rem" }}>
                    <div className="col-lg-4" style={{ position: "relative",top: "50%",transform: "translateY(-50%)", fontSize: "large", fontWeight: "600" }}>Type</div>
                    <select className="col-lg-6" name="cars" id="cars" style={{ height: "100%" }}>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div className="" style={{ height: "3.5rem" }}>
                    <div className="col-lg-9"></div>
                    <div className="col-lg-3" name="cars" id="cars" style={{ height: "100%" }}>
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div> */}
                
            </div>
        )
    }
}
