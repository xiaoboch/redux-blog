
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchPost, deletePost} from '../actions';
import  { Link } from 'react-router-dom'

class PostShow extends Component {

  componentDidMount() {
    const {id} = this.props.match.params;
    console.log('fetch post for id: ',id);
    this.props.fetchPost(id);
  }

  onDeleteClick(){
    const {id} = this.props.match.params;
    this.props.deletePost(id, ()=> {
      this.props.history.push('/');
    })
  }

  render(){

    const {post} = this.props;
    console.log('show post for id: ',this.props.match.params.id);

    if(!post) {
      return (<div>Loading...</div>)
    }

    return(
      <div>
      <Link to='/'>Back to Index</Link>

      <button className='btn btn-danger pull-xs-right'
        onClick={this.onDeleteClick.bind(this)}>
      Delete post
      </button>

        <h3>{post.title}</h3>
        <h6>categories: {post.categories}</h6>
        <div>{post.content}</div>
      </div>
    );

  }
}

function mapStateToProps({posts}, ownProps) {
  return {post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostShow);
