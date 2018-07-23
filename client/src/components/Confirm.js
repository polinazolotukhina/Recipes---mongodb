import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

class Confirm extends React.Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleDelete = recipeId => {
        console.log('CLICK!');
        this.setState({ open: false });
        this.props.actions.deleteRecipies(recipeId);
    };

    render() {
        const { recipeId, userId } = this.props;

        return (
            <div>
                <IconButton onClick={this.handleClickOpen}>
                    <DeleteForeverIcon />
                </IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Are you sure you want to delete this recipe?recipeId${recipeId},userId: ${userId} `}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Once deleted, It would be impossible to undo.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                this.handleDelete(recipeId);
                            }}
                            color="primary"
                            autoFocus
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Confirm.propTypes = {
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
)(Confirm);
