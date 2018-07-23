import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import RecipeNewForm from './RecipeNewForm';

class RecipeNew extends React.Component {
    submit = values => {
        // print the form values to the console
        this.props.actions.postRecipe(
            Object.assign({}, values, {
                _user: this.props.user._id,
                author: this.props.user.name
            }),
            this.props.history
        );
        this.props.history.push('/recipes');
    };
    render() {
        return <RecipeNewForm onSubmit={this.submit} />;
    }
}

RecipeNew.propTypes = {
    actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(RecipeNew));
