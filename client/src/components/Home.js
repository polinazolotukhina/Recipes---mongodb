import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
    renderGreeting() {
        if (this.props.user) {
            return <h5>Hello {this.props.user.name}</h5>;
        }
        return <h5>Please login</h5>;
    }
    render() {
        return <div>{this.renderGreeting()}</div>;
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

export default connect(mapStateToProps)(Home);
