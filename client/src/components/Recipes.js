import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import RecipeCard from './RecipeCard';
import Grid from '@material-ui/core/Grid';

const levels = [
    { level: 'easy', label: 'easy' },
    { level: 'medium', label: 'medium' },
    { level: 'hard', label: 'hard' },
    { level: '', label: 'all recipies' }
];
const style = {
    active: { backgroundColor: '#66A5A0' },
    notActive: { backgroundColor: '' }
};

class Recipes extends Component {
    constructor(props) {
        super(props);
        props.actions.getRecipies('');
    }
    handleBtnClick = (level, label) => {
        this.props.actions.getRecipies(level);
        this.props.actions.btnActive(label);
    };
    buttonColor = btnId => {
        if (this.props.activeButton === btnId) {
            return style.active;
        }
        return style.notActive;
    };

    renderButtons = () => {
        return levels.map((item, index) => (
            <button
                key={index}
                style={this.buttonColor(item.label)}
                onClick={() => {
                    this.handleBtnClick(item.level, item.label);
                }}
            >
                {item.label}
            </button>
        ));
    };
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
                                        img={recipe.img}
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
function mapStateToProps({ recipes, user, activeButton }) {
    return { recipes, user, activeButton };
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
