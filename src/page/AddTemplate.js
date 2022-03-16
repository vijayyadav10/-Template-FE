import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Link } from 'react-router-dom'
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/theme/tomorrow';
import 'brace/snippets/html';
import 'brace/ext/language_tools';
import { postTemplate } from '../api/Api';
import { withRouter } from "react-router-dom";
import ModalUI from '../components/ModalUI';
// import { Row, Col, Grid, Breadcrumb } from 'patternfly-react';

class AddTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            name: '',
            contentType: [],
            contentTypeProgram: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleContentTypeProgram = this.handleContentTypeProgram.bind(this);
    }

    handleCodeChange(event) {
        this.setState({ code: event.target.value });
    }
    
    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }
    
    handleContentTypeProgram(event) {
        this.setState({ contentTypeProgram: event })
    }
    
    handleTypeaheadChangeContentType = selected => {
        let selectedContentType = selected.map(option => option.label);
        this.setState({ contentType: selectedContentType });
    };
    
    handleSubmit = async (event) => {
        // console.table(this.state);
        event.preventDefault();
        // // API Call
        const data = {
            code: this.state.code,
            description: this.state.name,
            collectionType: this.state.contentType[0],
            contentShape: this.state.contentTypeProgram,
        }
        console.log('payload', data);
        await postTemplate(data).then((res) => {
            this.props.history.push('/')
        });
    }

    render() {
        return (
            <div style={{ margin: "1rem 1rem" }}>
                <h1 style={{ fontWeight: "600" }}>Add content template</h1>
                <hr />
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
                                    name="id" type="text" id="id" placeholder="" className="form-control RenderTextInput"
                                    value={this.state.code}
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
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
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
                                    id="basic-typeahead-multiple"
                                    onChange={this.handleTypeaheadChangeContentType}
                                    options={[{ label: 'Banner' }, { label: 'News' }, { label: '2 columns' }]}
                                    placeholder="Choose..."
                                    selected={this.state.contentType}
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
                                {/* <AceEditor
                                    mode="html"
                                    theme="monokai"
                                    onChange={this.handleContentTypeProgram}
                                    name="UNIQUE_ID_OF_DIV"
                                    width='100%'
                                    value={this.state.contentTypeProgram}
                                    editorProps={{ $blockScrolling: true }}
                                /> */}
                                <AceEditor
                                    mode="html"
                                    theme="tomorrow"
                                    width="100%"
                                    showPrintMargin={false}
                                    editorProps={{
                                        $blockScrolling: Infinity,
                                    }}
                                    setOptions={{
                                        useWorker: false,
                                    }}
                                    style={{ border: '1px solid #ddd' }}
                                    enableBasicAutocompletion
                                    enableLiveAutocompletion
                                    enableSnippets
                                    name='UNIQUE_ID_OF_DIV'
                                    onChange={this.handleContentTypeProgram}
                                    onLoad={this.onEditorLoaded}
                                    value={this.state.contentTypeProgram}
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
            </div>
        )
    }
}

export default withRouter(AddTemplate);