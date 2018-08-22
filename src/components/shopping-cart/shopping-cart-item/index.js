import React, { Component } from 'react';

class ShoppingCartItem extends Component {


    render() {
        let data = this.props.data;
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <span className="badge badge-pill badge-secondary mr-2">{data.qty}</span>
                    <strong>{data.item.name}</strong>
                </div>
                <div className="btn-toolbar">
                    <button className="btn btn-success mr-2">{data.price}</button>
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle"
                            data-toggle="dropdown">Action</button>
                        <div className="dropdown-menu">
                            <button className="btn dropdown-item"
                                onClick={this.props.onReduce}>Reduce by 1</button>
                            <button className="btn dropdown-item"
                                onClick={this.props.onRemove}>Remove All</button>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default ShoppingCartItem;
