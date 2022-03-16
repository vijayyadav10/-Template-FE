import React, { Component } from 'react'

export default class TemplateSearch extends Component {
    render() {
        return (
            <div style={{ margin: "1rem 0rem" }}>
                {/* Search Box Container Start */}
                <div className="well">
                    <div className="well-title">Search by</div>
                    <div className="show-grid row">
                        <div className="col-lg-4">
                            <button
                                id="attribute"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                                type="button"
                                className="app-bulider__dropdown"
                            >Name <span className="caret"></span>
                            </button>
                        </div>
                        <div className="col-lg-8">
                            <div>
                                <div className="form-group">
                                    <span className="input-group">
                                        <input type="text" id="control-4" className="form-control" placeholder="Search content templates" />
                                        <span className="input-group-addon" style={{ backgroundColor: "#043487", color: "white" }}>
                                            <span aria-hidden="true" className="fa fa-search">
                                            </span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Search Box Container End*/}
            </div>
        )
    }
}
