import Paginator from 'patternfly-react/dist/js/components/Pagination/Paginator'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getTemplate } from '../api/Api'
import { DropdownKebab, MenuItem } from 'patternfly-react';
import ModalUI from './ModalUI';

export default class TemplateDataTable extends Component {

    constructor(props) {
        super(props);
        this.state = { templateData: [], modalShow: false };
    }

    componentDidMount = async () => {
        const { data: { data } } = await getTemplate();
        this.setState({ templateData: data })
    }

    modalHide = () => {
        this.setState({ modalShow: false });
    }

    render() {
        return (
            <div className="show-grid">
                <div className="col-lg-12">
                    <table className="table dataTable table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Content Type</th>
                                <th>Content Template Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.templateData && this.state.templateData.map((el, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{el.attributes.code}</td>
                                        <td>{el.attributes.collectionType}</td>
                                        <td>{el.attributes.description}</td>
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
                                                    <span onClick={() => this.setState({ modalShow: true })}>
                                                        Delete
                                                    </span>
                                                </MenuItem>
                                                <MenuItem
                                                    bsClass="dropdown"
                                                    disabled={false}
                                                    divider={false}
                                                    header={false}
                                                >
                                                    <Link to={`/edit-template/${el.attributes.code}`}>
                                                        Edit
                                                    </Link>
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
                <ModalUI modalShow={this.state.modalShow} modalHide={this.modalHide} />
            </div>
        )
    }
}

{/* <ModalUI /> */ }