import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { deleteTemplate, getTemplate } from '../api/Api'
import { DropdownKebab, MenuItem, Paginator } from 'patternfly-react';
import ModalUI from './ModalUI';
import { withRouter } from "react-router-dom";
import Pagination from './Pagination';
import { PaginationRow } from 'patternfly-react/dist/js/components/Pagination';

const perPageOptions = [5, 10, 15, 25, 50];

class TemplateDataTable extends Component {

    constructor(props) {
        super(props);
        this.state = { templateData: [], modalShow: false, selectedTempate: null, page:1, pageSize:5, totalItems:20, lastPage:4, pageInput: 1 };
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

    onPerPageSelect = (eventKey, e) => {
        const newPaginationState = Object.assign({}, this.state.pagination);
        newPaginationState.perPage = eventKey;
        this.setState({ pageSize: newPaginationState.perPage });
        // todo code logic once pagesize is saved.
    }

    changePage(page) {
        this.setState({ page: page })
        const { fetchList, pageSize } = this.state;
        // fetchList({ page, pageSize });
    }
    onPageInput = e => {
        console.log('HELLOOWW', e.target.value)
        this.setState({ page: e.target.value });
    };
    onSubmit = () => {
        console.log("SUBMIT");
        this.setPage(this.state.pageInput);
    };
    setPage = value => {
        const page = Number(value);
        if (
            !Number.isNaN(value) &&
            value !== '' &&
            page > 0 &&
            page <= this.totalPages()
        ) {
            // let newPaginationState = Object.assign({}, this.state.pagination);
            // newPaginationState.page = page;
            this.setState({ page: page, pageInput: page });
        }
    }
    render() {
        // const { pagination } = this.state;
        const pagination = {
            page: this.state.page,
            perPage: this.state.pageSize,
            perPageOptions,
          };
        const itemsStart = this.state.totalItems === 0 ? 0 : ((this.state.page - 1) * this.state.pageSize) + 1;
        const itemsEnd = Math.min(this.state.page * this.state.pageSize, this.state.totalItems);

        return (
            <div className="show-grid">
                <div className="col-lg-12">
                    <table className="table dataTable table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Collection Type</th>
                                <th>Collection Template Name</th>
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
                                        <td>{el.templatename || el.attributes.templatename}</td>
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
                    <div className="custom-page"></div>
                    {/* <Pagination /> */}
                    {/* <form class="content-view-pf-pagination table-view-pf-pagination clearfix">
                        <div class="form-group">
                            Your search returned 61 results |
                            <span>
                                <span class="pagination-pf-items-current">1-7</span>
                            </span>
                            <ul class="pagination pagination-pf-back">
                                <li class=""><a href="#" title="First Page"><span aria-hidden="true" class="fa fa-angle-double-left i"></span></a></li>
                                <li class=""><a href="#" title="Previous Page"><span aria-hidden="true" class="fa fa-angle-left i"></span></a></li>
                            </ul>
                            <label class="sr-only control-label">Current Page</label><input type="text" class="pagination-pf-page form-control" value="3" /><span>&nbsp;of&nbsp;<span class="pagination-pf-pages">4</span></span>
                            <ul class="pagination pagination-pf-forward">
                                <li class=""><a href="#" title="Next Page"><span aria-hidden="true" class="fa fa-angle-right i"></span></a></li>
                                <li class=""><a href="#" title="Last Page"><span aria-hidden="true" class="fa fa-angle-double-right i"></span></a></li>
                            </ul>
                        </div>
                    </form> */}
                    {/* <Paginator
                        className=""
                        disableNext={false}
                        disablePrev={false}
                        // dropdownButtonId="pagination-row-dropdown"
                        itemCount={75}
                        // pageSizeDropUp={false}
                        messages={{
                            currentPage: 'Current Page',
                            firstPage: 'First Page',
                            lastPage: 'Last Page',
                            nextPage: 'Next Page',
                            of: 'of',
                            perPage: '',
                            previousPage: 'Previous Page',
                        }}
                        // onPageSet={function noRefCheck(event) { console.log('hello', event); }}
                        // onPerPageSelect={function noRefCheck() { console.log('trillo'); }}
                        pagination={{
                            page: 1,
                            perPage: 10,
                            // perPageOptions: [
                            //     // 5,
                            //     // 10,
                            //     // 15
                            // ]
                        }}
                        viewType="list"
                    /> */}
                    <PaginationRow
                        viewType={"list"}
                        pageInputValue={this.state.page}
                        pagination={pagination}
                        amountOfPages={this.state.lastPage}
                        pageSizeDropUp={true}
                        itemCount={this.state.totalItems}
                        itemsStart={itemsStart}
                        itemsEnd={itemsEnd}
                        onPerPageSelect={this.onPerPageSelect}
                        onFirstPage={() => this.changePage(1)}
                        onPreviousPage={() => this.changePage(this.state.page - 1)}
                        onPageInput={this.onPageInput}
                        onNextPage={() => this.changePage(this.state.page + 1)}
                        onLastPage={() => this.changePage(this.state.lastPage)}
                        onSubmit={this.onSubmit}
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