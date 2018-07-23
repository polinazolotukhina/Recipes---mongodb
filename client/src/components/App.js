import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';
import RecipeNew from './RecipeForm/RecipeNew';
import Recipes from './Recipes';

const Dashboard = () => <h2>Dashboard</h2>;

class App extends Component {
    componentDidMount() {
        this.props.actions.getUser();
    }
    render() {
        return (
            <div style={{ padding: '0 50px ' }}>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/new_recipe" component={RecipeNew} />
                        <Route path="/recipes" component={Recipes} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

Home.propTypes = {
    actions: PropTypes.object.isRequired
};
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    null,
    mapDispatchToProps
)(App);
