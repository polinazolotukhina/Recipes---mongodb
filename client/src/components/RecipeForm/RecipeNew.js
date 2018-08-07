import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import RecipeNewForm from './RecipeNewForm';

class RecipeNew extends React.Component {
    submit = values => {
        this.props.actions.postRecipe(
            Object.assign({}, values, {
                _user: this.props.user._id,
                author: this.props.user.name,
                img: this.props.img[0].preview
            }),
            this.props.history
        );
        this.props.actions.postImage(this.props.img[0].preview);
        this.props.history.push('/recipes');
    };
    render() {
        console.log('IMG', this.props.img);
        return (
            <div>
                <RecipeNewForm onSubmit={this.submit} />
            </div>
        );
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
