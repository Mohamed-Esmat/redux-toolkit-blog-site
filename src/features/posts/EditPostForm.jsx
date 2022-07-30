import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostId, updatePost, deletePost } from './postsSlice.js';
import { useParams, useNavigate } from 'react-router-dom';

import { selectAllUsers } from '../users/userSlice.js';

import React from 'react';
import { set } from 'date-fns';

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostId(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState('idle');

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);
  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === 'idle';

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus('pending');
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error('Failed to save the post', error);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const userOptions = users.map((user) => (
    <option value={user.id} key={post.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      setRequestStatus('pending');
      dispatch(deletePost({ id: post.id })).unwrap(); //we use unwrap() so we can use try catch logic

      setTitle('');
      setContent('');
      setUserId('');
      navigate('/');
    } catch (error) {
      console.error('Failed to delete the post');
    } finally {
      setRequestStatus('idle');
    }
  };

  return (
    <>
      <section>
        <h2>Edit Post</h2>
        <form>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postAuthor">Author:</label>
          <select
            name=""
            id="postAuthor"
            defaultValue={userId}
            onChange={onAuthorChanged}
          >
            <option value=""></option>
            {userOptions}
          </select>
          <label htmlFor="postContent">Content:</label>
          <textarea
            name="postContent"
            id="postContent"
            value={content}
            onChange={onContentChanged}
            cols="30"
            rows="10"
          ></textarea>
          <button disabled={!canSave} onClick={onSavePostClicked} type="button">
            Save Post
          </button>
          <button
            className="deleteButton"
            type="button"
            onClick={onDeletePostClicked}
          >
            Delete Post
          </button>
        </form>
      </section>
    </>
  );
};

export default EditPostForm;
