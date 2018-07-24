import React from 'react';
import Dropzone from 'react-dropzone';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import RecipeNew from './RecipeNew';

class Drop extends React.Component {
    state = {
        files: []
    };

    onDrop = files => {
        console.log('files', files);
        this.setState({ files });
    };

    render() {
        const { recipeId, userId, title } = this.props;

        return (
            <div>
                <RecipeNew img={this.state.files} />
                <section>
                    <div className="dropzone">
                        <Dropzone onDrop={this.onDrop.bind(this)}>
                            <p>
                                Try dropping some files here, or click to select
                                files to upload.
                            </p>
                        </Dropzone>
                    </div>
                    <aside>
                        <h2>Dropped files</h2>
                        <ul>
                            {this.state.files.map(f => (
                                <li key={f.name}>
                                    {f.name} - {f.size} bytes
                                </li>
                            ))}
                        </ul>
                    </aside>
                </section>
            </div>
        );
    }
}

function mapStateToProps({ recipes, user }) {
    return { recipes, user };
}
Drop.propTypes = {
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
)(Drop);
