import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {createPost} from '../actions'

class PostNew extends Component {

  renderField(field) {
    const {meta: {touched, error}} = field;
    const className = ` form-group ${touched && error ? 'has-danger' : ''} `

    return (
      <div className={className}>
        <label htmlFor=''>{field.label}</label>
        <input type='text' className="form-control" {...field.input}/>
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {

    this.props.createPost(values, ()=> {
          this.props.history.push('/');
    });
  }

  render() {

    const {handleSubmit} = this.props
    return (

      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        <Field name='title' label='Title' component={this.renderField}/>
        <Field name='categorise' label='Categories' component={this.renderField}/>
        <Field name='content' label='Content' component={this.renderField}/>
        <button type="submit" className='btn btn-primary'>Submit</button>
        <Link to="/" className='btn btn-danger'>Cancel</Link>
      </form>
    );
  }
}

function validate(values) {

  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title'
  }
  if (!values.categorise) {
    errors.categorise = 'Enter a categorise'
  }
  if (!values.content) {
    errors.content = 'Enter some content'
  }

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'PostNewForm'
})(

  connect(null, {createPost})(PostNew)
);
