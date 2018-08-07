import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Confirm from './Confirm';
const styles = theme => ({
    card: {
        maxWidth: 400
    },
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
    },
    actions: {
        display: 'flex'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        }),
        marginLeft: 'auto'
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    avatarEasy: {
        backgroundColor: blue[500]
    },
    avatarHard: {
        backgroundColor: red[500]
    },
    avatarMedium: {
        backgroundColor: yellow[500]
    }
});

class RecipeCard extends React.Component {
    state = {
        expanded: false
    };

    handleExpandClick = () => {
        this.setState(state => ({
            expanded: !state.expanded
        }));
    };
    renderDelete(current, id, recipeId, title) {
        if (current === id) {
            return (
                <Confirm userId={current} recipeId={recipeId} title={title} />
            );
        }
    }
    renderAvatar() {
        if (this.props.difficulty === 'easy') {
            return this.props.classes.avatarEasy;
        }
        if (this.props.difficulty === 'hard') {
            return this.props.classes.avatarHard;
        }
        return this.props.classes.avatarMedium;
    }

    render() {
        const {
            classes,
            title,
            date,
            method,
            ingredients,
            author,
            difficulty,
            userId,
            currentUser,
            recipeId,
            description
        } = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="Recipe"
                                className={this.renderAvatar()}
                            >
                                {difficulty && difficulty.charAt(0)}
                            </Avatar>
                        }
                        action={
                            <div>
                                {this.renderDelete(
                                    currentUser,
                                    userId,
                                    recipeId,
                                    title
                                )}
                            </div>
                        }
                        title={title}
                        subheader={date}
                    />
                    <CardMedia
                        className={classes.media}
                        image="/static/images/cards/paella.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <p>{this.props.description}</p>
                    </CardContent>
                    <CardActions
                        className={classes.actions}
                        disableActionSpacing
                    >
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse
                        in={this.state.expanded}
                        timeout="auto"
                        unmountOnExit
                    >
                        <CardContent>
                            <h5>Ingridients:</h5>
                            <div>
                                {ingredients &&
                                    ingredients.map((item, i) => {
                                        return <p key={i}>{item}</p>;
                                    })}
                            </div>
                            <h5>Method:</h5>
                            <p>{method ? method : 'No method is provided'}</p>
                            <p>
                                All recipies by
                                <button
                                    onClick={() => {
                                        this.props.getUserRecipies(userId);
                                    }}
                                >
                                    {author}
                                </button>
                            </p>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

RecipeCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeCard);
