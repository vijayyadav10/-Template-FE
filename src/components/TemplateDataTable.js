import Paginator from 'patternfly-react/dist/js/components/Pagination/Paginator'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { deleteTemplate, getTemplate } from '../api/Api'
import { DropdownKebab, MenuItem } from 'patternfly-react';
import ModalUI from './ModalUI';
import { withRouter } from "react-router-dom";

class TemplateDataTable extends Component {

    constructor(props) {
        super(props);
        this.state = { templateData: [], modalShow: false, selectedTempate: null };
    }

    componentDidMount = async () => {
        const { data } = await getTemplate();
        this.setState({ templateData: data })
    }

    modalHide = () => {
        this.setState({ modalShow: false });
    }

    handleDelete = async () => {
        await deleteTemplate(this.state.selectedTempate.code).then((res) => {
            this.componentDidMount();
            this.modalHide();
        });
    }

    render() {
        return (
            <div className="show-grid">
                <div className="col-lg-12">
                    <table className="table dataTable table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Collection Type</th>
                                <th>Content Template Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.templateData && this.state.templateData.map((el, idx) => {
                                console.log(
                                    'el', el
                                );
                                return (
                                    <tr key={idx}>
                                        <td>{el.code || el.attributes.code}</td>
                                        <td>{el.collectiontype || el.attributes.collectionType}</td>
                                        <td>{el.description || el.attributes.description}</td>
                                        <td>
                                            <DropdownKebab
                                                className=""
                                                // componentClass={function noRefCheck() { }}
                                                id="myKebab"
                                                pullRight={false}
                                                title="Kebab title"
                                                toggleStyle="link"
                                            >
                                                <MenuItem
                                                    bsClass="dropdown"
                                                    disabled={false}
                                                    divider={false}
                                                    header={false}
                                                >
                                                    <span onClick={() => this.setState({ modalShow: true, selectedTempate: el})}>
                                                        Delete
                                                    </span>
                                                </MenuItem>
                                                <MenuItem
                                                    bsClass="dropdown"
                                                    disabled={false}
                                                    divider={false}
                                                    header={false}
                                                    onClick={()=>this.props.history.push(`/edit-template/${el.code || el.attributes.code}`)}
                                                >
                                                    {/* <Link to={`/edit-template/${el.code || el.attributes.code}`}> */}
                                                        Edit
                                                    {/* </Link> */}
                                                </MenuItem>

                                            </DropdownKebab>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Paginator
                        className=""
                        disableNext={false}
                        disablePrev={false}
                        dropdownButtonId="pagination-row-dropdown"
                        itemCount={75}
                        messages={{
                            currentPage: 'Current Page',
                            firstPage: 'First Page',
                            lastPage: 'Last Page',
                            nextPage: 'Next Page',
                            of: 'of',
                            perPage: 'per page',
                            previousPage: 'Previous Page'
                        }}
                        onPageSet={function noRefCheck() { }}
                        onPerPageSelect={function noRefCheck() { }}
                        pagination={{
                            page: 1,
                            perPage: 10,
                            perPageOptions: [
                                5,
                                10,
                                15
                            ]
                        }}
                        viewType="list"
                    />
                </div>
                <div className="col-lg-10"></div>
                <div className="col-lg-2">
                    <Link to="/add-template">
                        <button className="primary-btn mv-2">
                            <span>Add content template </span>
                        </button>
                    </Link>
                </div>
                <ModalUI modalShow={this.state.modalShow} modalHide={this.modalHide} handleDelete={this.handleDelete} selectedTemp={this.state.selectedTempate}/>
            </div>
        )
    }
}

{/* <ModalUI /> */ }

export default withRouter(TemplateDataTable);