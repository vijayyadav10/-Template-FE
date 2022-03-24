import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Link } from 'react-router-dom'
import AceEditor from 'react-ace';
import ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/tomorrow';
import 'brace/snippets/html';
import 'brace/ext/language_tools';
import { getCollectionTypes, getFields, postTemplate } from '../api/Api';
import { withRouter } from "react-router-dom";
import ModalUI from '../components/ModalUI';
// import { Row, Col, Grid, Breadcrumb } from 'patternfly-react';

//sachin start
const langTools = ace.acequire('ace/ext/language_tools');
const tokenUtils = ace.acequire('ace/autocomplete/util');
const { textCompleter, keyWordCompleter, snippetCompleter } = langTools;
const defaultCompleters = [textCompleter, keyWordCompleter, snippetCompleter];

const escChars = term => term.replace('$', '\\$').replace('#', '\\#');
const isAttribFunction = term => /[a-zA-Z]+\([^)]*\)(\.[^)]*\))?/g.test(term);

const createSuggestionItem = (key, namespace, lvl = 0, meta = '') => ({
  caption: key,
  value: key,
  score: 10000 + lvl,
  meta: meta || `${namespace} Object ${isAttribFunction(key) ? 'Method' : 'Property'}`,
});

const aceOnBlur = onBlur => (_event, editor) => {
    if (editor) {
        const value = editor.getValue();
        onBlur(value);
    }
};
//sachin end

class AddTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            name: '',
            contentType: [],
            contentTypeProgram: '',
            collectionTypes: [],
            ///////////////////////sachin start
            editor: null,
            dictionaryLoaded: false,
            dictionary: [
                {
                    "caption": "content",
                    "value": "{{content",
                    "score": 10000,
                    "meta": "content Object"
                },
                {
                    "caption": "$i18n",
                    "value": "$i18n",
                    "score": 10000,
                    "meta": "$i18n Object"
                },
                {
                    "caption": "$info",
                    "value": "$info",
                    "score": 10000,
                    "meta": "$info Object"
                },
                {
                    "caption": "#if (<TRUE>) <DO> #else <DOANOTHER> #end",
                    "value": "#if (<TRUE>) <DO> #else <DOANOTHER> #end",
                    "score": 10000,
                    "meta": "#if (<TRUE>) <DO> #else <DOANOTHER> #end Object"
                },
                {
                    "caption": "#if (<TRUE>) <DO> #end",
                    "value": "#if (<TRUE>) <DO> #end",
                    "score": 10000,
                    "meta": "#if (<TRUE>) <DO> #end Object"
                },
                {
                    "caption": "#set ($<VAR> = <VALUE>)",
                    "value": "#set ($<VAR> = <VALUE>)",
                    "score": 10000,
                    "meta": "#set ($<VAR> = <VALUE>) Object"
                },
                {
                    "caption": "#foreach ($item in $<LIST>) $item #end",
                    "value": "#foreach ($item in $<LIST>) $item #end",
                    "score": 10000,
                    "meta": "#foreach ($item in $<LIST>) $item #end Object"
                }
            ],
            dictList: [],
            dictMapped: {
                "$content": {
                    "title": [
                        "getTextForLang(\"<LANG_CODE>\")",
                        "text",
                        "textMap(\"<LANG_CODE>\")"
                    ],
                    "abstract": [
                        "getHead(<VALUE>)",
                        "getHeadEscaped(VALUE)",
                        "getTextAfterImage(<PERCENT_VALUE>)",
                        "getTextBeforeImage(<PERCENT_VALUE>)",
                        "getTextByRange(<START_PERCENT_VALUE>, <END_PERCENT_VALUE>)",
                        "getTextForLang(\"<LANG_CODE>\")",
                        "text",
                        "textMap(\"<LANG_CODE>\")"
                    ],
                    "link": [
                        "destination",
                        "getTextForLang(\"<LANG_CODE>\")",
                        "symbolicLink",
                        "text",
                        "textMap[\"<LANG_CODE>\"]"
                    ],
                    "image": [
                        "getImagePath(<SIZE_ID>)",
                        "getMetadata(\"<METADATA_CODE>\")",
                        "getMetadataForLang(\"<METADATA_CODE>\", \"<LANG_CODE>\")",
                        "getResource(\"<LANG_CODE>\")",
                        "getResourceAltForLang(\"<LANG_CODE>\")",
                        "getResourceDescriptionForLang(\"<LANG_CODE>\")",
                        "getResourceLegendForLang(\"<LANG_CODE>\")",
                        "getResourceTitleForLang(\"<LANG_CODE>\")",
                        "getTextForLang(\"<LANG_CODE>\")",
                        "resource",
                        "resourceAlt",
                        "resourceAltMap[\"<LANG_CODE>\"]",
                        "resourceDescription",
                        "resourceDescriptionMap[\"<LANG_CODE>\"]",
                        "resourceLegend",
                        "resourceLegendMap[\"<LANG_CODE>\"]",
                        "resourceTitle",
                        "resourceTitleMap[\"<LANG_CODE>\"]",
                        "text",
                        "textMap[\"<LANG_CODE>\"]"
                    ],
                    "placement": [
                        "text"
                    ],
                    "getId()": null,
                    "getCategories()": null,
                    "getContentLink()": null,
                    "getCreated('<DATE_PATTERN>')": null,
                    "isUserAllowed('<PERMISSION_NAME>')": null,
                    "getLastEditor()": null,
                    "getContentOnPageLink('<PAGE_CODE>')": null,
                    "getNonce()": null,
                    "getLastModified('<DATE_PATTERN>')": null,
                    "getVersion()": null,
                    "getLangCode()": null
                },
                "$i18n": {
                    "getLabelWithParams('<LABEL_CODE>').addParam('<PARAM_KEY>', '<PARAM_VALUE>')": null,
                    "getLabel('<LABEL_CODE>')": null
                },
                "$info": {
                    "getCurrentLang()": null,
                    "getCurrentPage()": null,
                    "getCurrentWidget()": null,
                    "getConfigParameter('<PARAM_NAME>')": null
                },
                "#if (<TRUE>) <DO> #else <DOANOTHER> #end": {},
                "#if (<TRUE>) <DO> #end": {},
                "#set ($<VAR> = <VALUE>)": {},
                "#foreach ($item in $<LIST>) $item #end": {}
            },
            contentTemplateCompleter: null,
        };
        this.onEditorLoaded = this.onEditorLoaded.bind(this);
        ///////////////////////sachin end
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
            templateName: this.state.name,
            collectionType: this.state.contentType[0],
            contentShape: this.state.contentTypeProgram,
        }
        await postTemplate(data).then((res) => {
            this.props.history.push('/')
        });
    }
    /////////////////////////sachin
    componentDidUpdate(prevProps) {
        const { dictionary } = this.props;
        if (dictionary !== prevProps.dictionary) {
            this.condenseRootDict();
        }
    }

    onEditorLoaded(editor) {
        this.setState({ editor });

        this.initCompleter();

        editor.commands.addCommand({
            name: 'dotCommandSubMethods',
            bindKey: { win: '.', mac: '.' },
            exec: () => {
                editor.insert('.');
                const { selection } = editor;
                const cursor = selection.getCursor();
                const extracted = this.extractCodeFromCursor(cursor);
                const { namespace } = extracted;
                if (!namespace) {
                    this.enableRootSuggestions();
                    return;
                }

                const [rootSpace, ...subSpace] = namespace.split('.');

                if (subSpace.length > 1) {
                    this.enableRootSuggestions();
                    return;
                }

                const verified = subSpace.length
                    ? this.findTokenInDictMap(subSpace[0], rootSpace)
                    : this.findTokenInDictMap(rootSpace);
                if (verified) {
                    this.disableRootSuggestions();
                } else {
                    this.enableRootSuggestions();
                }
                editor.execCommand('startAutocomplete');
            },
        });
    }

    disableRootSuggestions() {
        const { contentTemplateCompleter } = this.state;
        langTools.setCompleters([contentTemplateCompleter]);
    }

    enableRootSuggestions() {
        const { dictionary, contentTemplateCompleter } = this.state;
        langTools.setCompleters([...defaultCompleters, contentTemplateCompleter]);
        this.setState({
            dictList: [...dictionary],
        });
    }

    initCompleter() {
        const contentTemplateCompleter = {
            getCompletions: (
                _editor,
                session,
                cursor,
                prefix,
                callback,
            ) => {
                const extracted = this.extractCodeFromCursor(cursor, prefix);
                const { namespace } = extracted;
                if (!namespace) {
                    this.enableRootSuggestions();
                } else {
                    const [rootSpace, ...subSpace] = namespace.split('.');

                    const verified = subSpace.length
                        ? this.findTokenInDictMap(subSpace[0], rootSpace)
                        : this.findTokenInDictMap(rootSpace);
                    if (verified) {
                        this.disableRootSuggestions();
                        const { dictMapped } = this.state;
                        console.log('dictMapped :::::::::::::::::::', dictMapped);
                        if (verified.namespace) {
                            const mappedToken = dictMapped[verified.namespace];
                            const dictList = mappedToken[verified.term]
                                .map(entry => createSuggestionItem(entry, verified.namespace, 2));
                            this.setState({ dictList });
                        } else {
                            const mappedToken = dictMapped[verified.term];
                            const dictList = Object.entries(mappedToken)
                                .map(([entry]) => createSuggestionItem(entry, verified.term, 1));
                            this.setState({ dictList });
                        }
                    } else {
                        this.disableRootSuggestions();
                    }
                }

                const dictList  = this.state.dictList;
                console.log('dictList === ', dictList);

                callback(null, dictList);
                
                // console.log('wordList === ', wordList);
                // callback(null, wordList.map(function(ea) {
                //     return {
                //       name: ea.caption,
                //       value: ea.value,
                //       score: ea.score,
                //       meta: "rhyme"
                //     };
                //   }))
            },
        };

        langTools.setCompleters([...defaultCompleters, contentTemplateCompleter]);
        this.setState({ contentTemplateCompleter });
    }

    condenseRootDict() {
        const { dictionary: _dict } = this.props;
        const dictMapped = _dict.reduce((acc, curr) => {
            acc[curr.code] = curr.methods;
            return acc;
        }, {});

        const dictionary = _dict.map(({ code }) => (
            createSuggestionItem(code, code, 0, `${code} Object`)
        ));

        this.setState({
            dictionary,
            dictMapped,
            dictList: [...dictionary],
            dictionaryLoaded: true,
        });
    }

    extractCodeFromCursor({ row, column }, prefixToken) {
        const { editor: { session } } = this.state;
        const codeline = (session.getDocument().getLine(row)).trim();
        const token = prefixToken || tokenUtils.retrievePrecedingIdentifier(codeline, column);
        const wholeToken = tokenUtils.retrievePrecedingIdentifier(
            codeline,
            column,
            /[.a-zA-Z_0-9$\-\u00A2-\uFFFF]/,
        );
        if (token === wholeToken) {
            return { token, namespace: '' };
        }
        const namespace = wholeToken.replace(/\.$/g, '');
        return { token, namespace };
    }

    findTokenInDictMap(token, parentToken) {
        const { dictMapped } = this.state;
        const findInDict = (term, dict) => (
            Object.keys(dict).find((key) => {
                const keyRegEx = new RegExp(`${escChars(key)}$`, 'g');
                return keyRegEx.test(term);
            })
        );
        if (!parentToken) {
            const term = findInDict(token, dictMapped);
            return term && { term };
        }
        const namespace = findInDict(parentToken, dictMapped);
        if (!namespace) {
            return false;
        }
        const term = findInDict(token, dictMapped[parentToken]);
        if (!term) return false;
        return { term, namespace };
    }
    ///////////////////////// sachin end

    componentDidMount = async () => {
        const data = await getFields();
        console.log('DATA componentDidMount', data)
        this.setState({dictMapped: data})
        let contentTypes = await getCollectionTypes();
        contentTypes = contentTypes.data.data.filter(obj => {
            return obj && (obj.uid && obj.uid.startsWith("api::")) && obj.isDisplayed;
        });
        const contentTypeRefine = [];
        contentTypes.length && contentTypes.forEach(element => {
            contentTypeRefine.push({label: element.info.pluralName})
        });
        console.log('contentTypeRefine', contentTypeRefine);
        this.setState({ contentType: contentTypeRefine, collectionTypes: contentTypeRefine })
    }

    render() {
        return (
            <div style={{ margin: "1rem 1rem" }}>
                <h1 style={{ fontWeight: "600" }}>Add content template</h1>
                <hr />
                <div className="formContainer show-grid">
                    <form onSubmit={this.handleSubmit}>
                        {/* <div className="formContainer col-xs-12">
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
                        </div> */}
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
                                    options={this.state.collectionTypes}
                                    // options={[{ label: 'Banner' }, { label: 'News' }, { label: '2 columns' }]}
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