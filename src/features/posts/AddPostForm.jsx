import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit'; //nanoid will help us create random id so u don't need to import so something else like a package uuid
import { addNewPost } from './postsSlice.js';
import React from 'react';
import { selectAllUsers } from '../users/userSlice.js';
import { useNavigate } from "react-router-dom"


const AddPostForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate()
  
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = () => {
    // if (title && content) {
    //   dispatch(
    //     postAdded(
    //       // {id: nanoid(),title,content,}
    //       title,
    //       content,
    //       userId
    //     )
    //   );
    //   setTitle('');
    //   setContent('');
    //   setUserId('');
    // }

    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate('/')
      } catch (error) {
        console.error('failed to save the post', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  const userOptions = users.map((userValue, index) => {
    return (
      <option key={index} value={userValue.id}>
        {userValue.name}
      </option>
    );
  });
  return (
    <>
      <section>
        <h2>Add a new Post</h2>
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
            value={userId}
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
        </form>
      </section>
    </>
  );
};

export default AddPostForm;
