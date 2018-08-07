import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Header extends Component {
    renderContent() {
        switch (this.props.user) {
            case null:
                return;
            case false:
                return (
                    <Button>
                        <a href="/auth/facebook" className="myMenuItem">
                            Login with Facebook
                        </a>
                    </Button>
                );
            default:
                return [
                    <Button key="1">
                        <Link to={'/'} className="myMenuItem">
                            Home
                        </Link>
                    </Button>,
                    <Button key="2">
                        <Link to={'/recipes'} className="myMenuItem">
                            Recipes
                        </Link>
                    </Button>,
                    <Button key="3">
                        <Link to={'/new_recipe'} className="myMenuItem">
                            Add Recipe
                        </Link>
                    </Button>,
                    <Button key="5">
                        <Link to={'/new-recipe'} className="myMenuItem">
                            Add Recipe with DROP
                        </Link>
                    </Button>,

                    <Button key="4">
                        <a href="/api/logout" className="myMenuItem">
                            Logout
                        </a>
                    </Button>
                ];
        }
    }
    render() {
        return (
            <div
                style={{
                    backgroundColor: '#64a5a0',
                    width: '100%',
                    height: '77px'
                }}
            >
                {this.renderContent()}
            </div>
        );
    }
}
function mapStateToProps({ user }) {
    return { user };
}
export default connect(mapStateToProps)(Header);
