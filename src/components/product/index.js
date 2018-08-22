import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import {
    getProduct,
    deleteProduct,
    reload,
    toggleAddNewProductDialog,
    toggleEditProductDialog,
    toggleDeleteProductDialog
} from '../../actions/productAction';
import { BUTTON_TYPE } from '../../configs/constants'

class ProductList extends Component {
    componentWillMount() {
        this.props.getProduct();
    }

    handleAddNew = (e, id) => {
        e.preventDefault();
        this.props.toggleAddNewProductDialog();
    }

    handleEdit = (e, id) => {
        e.preventDefault();
        this.props.toggleEditProductDialog(id);
    }

    handleDelete = (e, id) => {
        e.preventDefault();
        this.props.toggleDeleteProductDialog(id);
    }

    handleConfirm = (type) => {
        this.props.toggleDeleteProductDialog();
        if (type === BUTTON_TYPE.YES) {
            this.props.deleteProduct(this.props.productData.currentProductId);
        }
    }

    render() {
        if (this.props.productData.isAddNewProductShowed) {
            return (
                <Redirect to="/products/add" />
            );
        }

        if (this.props.productData.isEditProductShowed) {
            let redirectTo = "/products/edit/" + this.props.productData.currentProductId;
            return (
                <Redirect to={redirectTo} />
            );
        }

        let productList = this.props.productData.data;

        return (
            <div>
                <h2>Product Page</h2>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th style={{ width: '5%' }}>No.</th>
                                <th style={{ width: '40%' }}>Name</th>
                                <th style={{ width: '10%' }}>Price</th>
                                <th style={{ width: '35%' }}>Image</th>
                                <th style={{ width: '10%' }}>
                                    <a className="btn btn-success" href="" onClick={(e) => this.handleAddNew(e)}>Add New</a>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productList.map((product, i) => {
                                    return (
                                        <tr key={i + 1}>
                                            <td>{i + 1}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.imageName}</td>
                                            <td>
                                                <a href="" onClick={(e) => this.handleEdit(e, product.id)}>Edit</a>
                                                <span> | </span>
                                                <a href="" onClick={(e) => this.handleDelete(e, product.id)}>Delete</a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {
                    this.props.productData.isDeleteProductShowed &&
                    <Modal.Dialog>
                        <Modal.Body>Are you sure?</Modal.Body>
                        <Modal.Footer >
                            <Button onClick={() => this.handleConfirm(BUTTON_TYPE.CLOSE)}>No</Button>
                            <Button bsStyle="primary"
                                onClick={() => this.handleConfirm(BUTTON_TYPE.YES)}>{BUTTON_TYPE.YES}</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                }
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        productData: state.productReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProduct: () => dispatch(getProduct()),
        deleteProduct: (id) => dispatch(deleteProduct(id)),
        reload: () => dispatch(reload()),
        toggleAddNewProductDialog: () => dispatch(toggleAddNewProductDialog()),
        toggleEditProductDialog: (id) => dispatch(toggleEditProductDialog(id)),
        toggleDeleteProductDialog: (id) => dispatch(toggleDeleteProductDialog(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
