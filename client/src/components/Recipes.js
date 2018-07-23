import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import RecipeCard from './RecipeCard';
import Grid from '@material-ui/core/Grid';

const levels = [
    { level: 'easy', label: 'easy ' },
    { level: 'medium', label: 'medium' },
    { level: 'hard', label: 'hard' },
    { level: '', label: 'all recipies' }
];

class Recipes extends Component {
    constructor(props) {
        super(props);
        props.actions.getRecipies('');
    }
    renderButtons() {
        return levels.map((item, index) => (
            <button
                key={index}
                onClick={() => {
                    this.props.actions.getRecipies(item.level);
                }}
            >
                {item.label}
            </button>
        ));
    }
    render() {
        const { recipes, actions, user } = this.props;

        return (
            <div>
                {this.renderButtons()}
                <Grid container spacing={24}>
                    {recipes &&
                        recipes.map((recipe, index) => {
                            return (
                                <Grid item xs={4} key={index}>
                                    <RecipeCard
                                        title={recipe.name}
                                        date={recipe.dateAdded.slice(0, 10)}
                                        description={recipe.body}
                                        method={recipe.method}
                                        ingredients={recipe.ingredients}
                                        difficulty={recipe.difficulty}
                                        author={recipe.author}
                                        userId={recipe._user}
                                        recipeId={recipe._id}
                                        currentUser={user._id}
                                        getUserRecipies={re => {
                                            actions.getUserRecipies(re);
                                        }}
                                    />
                                </Grid>
                            );
                        })}
                </Grid>
            </div>
        );
    }
}
function mapStateToProps({ recipes, user }) {
    return { recipes, user };
}
Recipes.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Recipes);
