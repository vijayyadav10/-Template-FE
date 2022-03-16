import React, { Component } from 'react'
import { Button } from 'patternfly-react/dist/js/components/Button'
import { Icon } from 'patternfly-react/dist/js/components/Icon'
import { Modal } from 'patternfly-react/dist/js/components/Modal'

export default class ModalUI extends Component {
    render() {
        return (
            <Modal show={this.props.modalShow} onHide={this.props.modalHide}>
                <Modal.Header>
                    <button
                        className="close"
                        onClick={this.props.modalHide}
                        aria-hidden="true"
                        aria-label="Close"
                    >
                        <Icon type="pf" name="close" />
                    </button>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Delete News - Detail
                    Do you really want to delete?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsStyle="default"
                        className="btn-cancel"
                        onClick={this.props.modalHide}
                    >
                        Close
                    </Button>
                    <Button
                        bsStyle="danger"
                        className="btn-cancel"
                        onClick={()=>{}}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
