import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../../actions/shoppingCartAction';

class ProductItem extends Component {
    render() {
        let data = this.props.data;
        let price = parseInt(data.price, 10).toLocaleString('vn-VN').replace(',', '.');
        return (
            <div className="product-item-container col-xl-3 col-lg-4 col-md-6">
                <div className="card">
                    <div className="product-item">
                        <a data-fancybox="" href={data.image}>
                            <img className="card-img-top"
                                src={data.image}
                                alt={data.image} />
                        </a>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <h4 className="product-price float-left">{price}<span> <u>đ</u></span></h4>
                        <button className="btn btn-success float-right"
                            onClick={() => this.props.addToCart(data.id)}>Add To Cart</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (id) => dispatch(addToCart(id))
    };
}

export default connect(null, mapDispatchToProps)(ProductItem);
