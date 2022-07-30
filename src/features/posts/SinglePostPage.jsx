import { useSelector } from 'react-redux';
import { selectPostId } from './postsSlice.js';

import PostAuthor from './PostAuthor.jsx';
import TimeAgo from './TimeAgo.jsx';
import ReactionButton from './ReactionButton.jsx';
import { useParams } from 'react-router-dom';
import React from 'react';
import {Link} from 'react-router-dom'

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostId(state, Number(postId)));
  
  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  } 
    return (
      <article>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p className="postCredit">
          <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButton post={post} />
      </article>
    );
  
};

export default SinglePostPage;
