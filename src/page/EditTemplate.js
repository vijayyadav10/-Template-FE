import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Link } from 'react-router-dom'
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/github';
import { getTemplateByCodeId } from '../api/Api';
// import { Row, Col, Grid, Breadcrumb } from 'patternfly-react';
import { withRouter } from "react-router-dom";

class EditTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            attributes: {
                code: '',
                name: '',
                contentType: [],
                contentTypeProgram: '',
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleContentTypeProgram = this.handleContentTypeProgram.bind(this);
    }

    updateState = (propName, value) => {
        let cloneObj = this.state.attributes;
        if (propName === 'contentType') {
            cloneObj[propName] = value;
            return cloneObj;
        }
        cloneObj[propName] = value;
        return cloneObj;
    }

    handleCodeChange(event) {
        this.setState({ attributes: this.updateState('code', event.target.value) });
    }

    handleNameChange(event) {
        this.setState({ attributes: this.updateState('name', event.target.value) })
    }

    handleContentTypeProgram(event) {
        this.setState({ attributes: this.updateState('contentTypeProgram', event) })
    }

    handleTypeaheadChangeContentType = selected => {
        let selectedContentType = selected.map(option => option);
        this.setState({ attributes: this.updateState('contentType', selectedContentType) })
        // this.setState({ contentType: selectedContentType });
    };

    handleSubmit = async (event) => {
        console.log(this.state);
        event.preventDefault();
        // // API Call

        // await postTemplate({
        //     data: {
        //         code: this.state.code,
        //         description: this.state.name,
        //         collectionType: this.state.contentType[0],
        //         contentShape: this.state.contentTypeProgram,
        //     }
        // }).then((res) => {
        //     this.props.history.push('/')
        // });
    }

    componentDidMount = async () => {
        const { data: { data } } = await getTemplateByCodeId(this.props.match.params.templateId);
        const getData = {
            code: data[0].attributes.code,
            contentType: [data[0].attributes.collectionType],
            name: data[0].attributes.description,
            contentTypeProgram: data[0].attributes.contentShape,
        }
        this.setState({ id: data[0].id, attributes: getData })
    }

    render() {
        console.log("RENDER",this.state.attributes.contentType)
        return (
            <div style={{ margin: "1rem 1rem" }}>
                <h1 style={{ fontWeight: "600" }}>Edit content template</h1>
                <hr />
                {this.state.id &&
                    <div className="formContainer show-grid">
                        <form onSubmit={this.handleSubmit}>
                            <div className="formContainer col-xs-12">
                                <div className="col-lg-2" style={{ textAlign: "end" }}>
                                    <label htmlFor="id" className="control-label">
                                        <span className="FormLabel">
                                            <span>Code</span>
                                            <sup>
                                                <i className="fa fa-asterisk required-icon FormLabel__required-icon"></i>
                                            </sup>
                                            <button type="button" className="btn btn-link">
                                                <span aria-hidden="true" className="pficon pficon-info"></span>
                                            </button></span>
                                    </label>
                                </div>
                                <div className="col-lg-10">
                                    <input
                                        name="id"
                                        type="text"
                                        id="id"
                                        placeholder=""
                                        className="form-control RenderTextInput"
                                        value={this.state.attributes.code}
                                        onChange={this.handleCodeChange}
                                    />
                                </div>
                            </div>
                            <div className="formContainer col-xs-12">
                                <div className="col-lg-2" style={{ textAlign: "end" }}>
                                    <label htmlFor="id" className="control-label">
                                        <span className="FormLabel">
                                            <span>Name</span>
                                            <sup>
                                                <i className="fa fa-asterisk required-icon FormLabel__required-icon"></i>
                                            </sup>
                                            <button type="button" className="btn btn-link">
                                                <span aria-hidden="true" className="pficon pficon-info"></span>
                                            </button></span>
                                    </label>
                                </div>
                                <div className="col-lg-10">
                                    <input
                                        name="id"
                                        type="text"
                                        id="id"
                                        placeholder=""
                                        className="form-control RenderTextInput"
                                        value={this.state.attributes.name}
                                        onChange={this.handleNameChange} />
                                </div>
                            </div>
                            <div className="formContainer col-xs-12">
                                <div className="col-lg-2" style={{ textAlign: "end" }}>
                                    <label htmlFor="id" className="control-label">
                                        <span className="FormLabel">
                                            <span>Collection Type</span>
                                            <sup>
                                                <i className="fa fa-asterisk required-icon FormLabel__required-icon"></i>
                                            </sup>
                                            <button type="button" className="btn btn-link">
                                                <span aria-hidden="true" className="pficon pficon-info"></span>
                                            </button></span>
                                    </label>
                                </div>
                                <div className="col-lg-10">
                                    <Typeahead
                                        id="RandomId"
                                        onChange={this.handleTypeaheadChangeContentType}
                                        options={['Banner', 'News', '2 columns']}
                                        placeholder="Choose..."
                                        selected={this.state.attributes.contentType}
                                    />
                                </div>
                            </div>
                            <div className="formContainer col-xs-12">
                                <div className="col-lg-2" style={{ textAlign: "end" }}>
                                    <label htmlFor="id" className="control-label">
                                        <span className="FormLabel">
                                            <span>HTML Model</span>
                                            <sup>
                                                <i className="fa fa-asterisk required-icon FormLabel__required-icon"></i>
                                            </sup>
                                            <button type="button" className="btn btn-link">
                                                <span aria-hidden="true" className="pficon pficon-info"></span>
                                            </button></span>
                                    </label>
                                </div>
                                <div className="col-lg-10">
                                    <button className="default-btn">Inline editing assistant</button>
                                </div>
                            </div>
                            <div className="formContainer col-xs-12">
                                <div className="col-lg-2" style={{ textAlign: "end" }}>
                                </div>
                                <div className="col-lg-10">
                                    <p>
                                        <span>Content assist is <strong>ON</strong></span>
                                        <br />
                                        <span>Help about attributes type is <strong>OFF</strong></span>
                                        <br />
                                        <span>To change status, set in the admin configuration section.</span>
                                    </p>
                                </div>
                            </div>
                            <div className="formContainer col-xs-12">
                                <div className="col-lg-2" style={{ textAlign: "end" }}>
                                </div>
                                <div className="col-lg-10">
                                    <AceEditor
                                        mode="javascript"
                                        theme="github"
                                        onChange={this.handleContentTypeProgram}
                                        name="UNIQUE_ID_OF_DIV"
                                        editorProps={{ $blockScrolling: true }}
                                        value={this.state.attributes.contentTypeProgram}
                                    />
                                </div>
                            </div>
                            {/* FORM ACTION */}
                            <div className="formContainer col-xs-12">
                                <div className="col-lg-10" style={{ textAlign: "end" }}>
                                </div>
                                <div className="col-lg-2">
                                    <Link to="/">
                                        <button className="default-btn">Cancel</button>
                                    </Link>
                                    <button className="default-btn" type="submit">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                }
            </div>
        )
    }
}


export default withRouter(EditTemplate);