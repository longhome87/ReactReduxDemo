import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
    addNewProduct,
    getProductById,
    updateProduct
} from '../../../actions/productAction';
import AlertError from '../../alert-error';

const initData = {
    name: '',
    cost: 1000,
    quantity: 1,
    price: 1000,
    image: null
};

class ProductItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: initData,
            errors: []
        }
    }

    componentWillMount() {
        if (this.props.isEdit) {
            this.props.getProductById(this.props.match.params.id);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.productData.selectedProduct !== this.props.productData.selectedProduct) {
            this.setState({ data: newProps.productData.selectedProduct });
        }
    }

    handleChange = (fieldName, e) => {
        let state = this.state;
        let value = e.target.value;
        switch (fieldName) {
            case 'cost':
            case 'quantity':
            case 'price':
                value = parseInt(value, 10);
                break;
            case 'image':
                if (e.target.files.length > 0) {
                    value = e.target.files[0]
                }

                break;
            default:
                break;
        }

        state.data[fieldName] = value;
        this.setState(state);
    }

    handleSave = (e) => {
        e.preventDefault();
        let data = this.state.data;

        let errors = [];
        if (!data.name) {
            errors.push('Name must be input.');
        }
        if (!data.image) {
            errors.push('Image must be input.');
        }

        if (errors.length > 0) {
            this.setState({ errors: errors })
        } else if (!this.props.isEdit) {
            this.props.addNewProduct(this.state.data);
        } else {
            this.props.updateProduct(this.state.data);
        }
    }

    render() {
        if (this.props.productData.hasRedirect) {
            return (
                <Redirect to="/products" />
            );
        }

        let data = this.state.data;
        let header = '';
        let imagePreview = null;
        if (!this.props.isEdit) {
            header = 'Add Product';
            if (data.image) {
                imagePreview = URL.createObjectURL(data.image);
            }
        } else {
            header = 'Edit Product';
            imagePreview = data.image;
        }

        if (Object.keys(data).length === 0) {
            data = initData;
        }

        return (
            <div>
                <h2>{header}</h2>
                <AlertError data={this.state.errors} />
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="txtName">Name</label>
                            <input className="form-control"
                                name="txtName"
                                type="text"
                                placeholder="Name"
                                value={data.name}
                                onChange={(e) => this.handleChange('name', e)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="txtCost">Cost</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">đ</div>
                                </div>
                                <input className="form-control text-right"
                                    name="txtCost"
                                    type="number"
                                    placeholder="Cost"
                                    value={data.cost}
                                    step="100"
                                    onChange={(e) => this.handleChange('cost', e)} />
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="txtQty">Quantity</label>
                            <input className="form-control text-right"
                                name="txtQty"
                                type="number"
                                placeholder="Quantity"
                                value={data.quantity}
                                onChange={(e) => this.handleChange('quantity', e)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="txtPrice">Price</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">đ</div>
                                </div>
                                <input className="form-control text-right"
                                    name="txtPrice"
                                    type="number"
                                    placeholder="Price"
                                    value={data.price}
                                    step="1000"
                                    onChange={(e) => this.handleChange('price', e)} />
                            </div>
                        </div>
                        {
                            !this.props.isEdit &&
                            <div className="form-group col-md-6">
                                <label htmlFor="txtImage">Image</label>
                                <input className="form-control"
                                    id="txtImage"
                                    name="txtImage"
                                    type="file"
                                    onChange={(e) => this.handleChange('image', e)} />
                            </div>
                        }
                        {
                            !this.props.isEdit && this.state.data.image &&
                            <div className="form-group col-md-6">
                                <img className="form-control"
                                    id="imagePreview"
                                    hidden=""
                                    alt=""
                                    src={imagePreview} />
                            </div>
                        }
                    </div>
                    <button className="btn btn-success" type="submit" onClick={(e) => this.handleSave(e)}>Save</button>
                    <span> </span>
                    <a className="btn btn-secondary" href="/products">Back</a>
                </form>
            </div>
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
        addNewProduct: (data) => dispatch(addNewProduct(data)),
        getProductById: (id) => dispatch(getProductById(id)),
        updateProduct: (data) => dispatch(updateProduct(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
