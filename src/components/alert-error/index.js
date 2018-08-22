import React, { Component } from 'react'

class AlertError extends Component {
    render() {
        let data = this.props.data;
        return (
            data.length > 0 &&
            <div className="alert alert-danger">
                {
                    data.map((err, i) => {
                        return (
                            <div key={i}>{err}</div>
                        )
                    })
                }
            </div>
        );
    }
}

export default AlertError;