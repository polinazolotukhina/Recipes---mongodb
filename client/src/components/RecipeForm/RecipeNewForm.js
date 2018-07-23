import React from 'react';
import { Field, reduxForm } from 'redux-form';

const RecipeNewForm = props => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        classes
    } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <Field name="name" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="ingredients">Ingredients</label>
                <Field name="ingredients" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="prepTime">Preporation Time</label>
                <Field name="prepTime" component="input" type="text" />
            </div>

            <div>
                <label htmlFor="body">Description</label>
                <Field name="body" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="method">Method</label>
                <Field name="method" component="input" type="text" />
            </div>

            <div>
                <label>Difficulty</label>
                <div>
                    <label>
                        <Field
                            name="difficulty"
                            component="input"
                            type="radio"
                            value="easy"
                        />{' '}
                        Easy
                    </label>
                    <label>
                        <Field
                            name="difficulty"
                            component="input"
                            type="radio"
                            value="medium"
                        />{' '}
                        Medium
                    </label>
                    <label>
                        <Field
                            name="difficulty"
                            component="input"
                            type="radio"
                            value="hard"
                        />{' '}
                        Hard
                    </label>
                </div>
            </div>

            <div>
                <button type="submit" disabled={pristine || submitting}>
                    Submit
                </button>
                <button
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                >
                    Clear Values
                </button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'recipes' // a unique identifier for this form
})(RecipeNewForm);
