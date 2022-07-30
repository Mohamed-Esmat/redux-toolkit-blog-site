import { useSelector} from 'react-redux';//,useDispatch 
import React from 'react';
import { selectAllPosts,getPostsError,getPostsStatus } from './postsSlice.js';//,fetchPosts
// import { useEffect } from 'react';
import PostsExcerpt from './PostsExcerpt.jsx';


function PostsList() {

    // const dispatch = useDispatch()

        const posts = useSelector(selectAllPosts);
        const postsStatus = useSelector(getPostsStatus);
        const postsError = useSelector(getPostsError);


  // useEffect(()=>{
  //   if(postsStatus === 'idle'){
  //       dispatch(fetchPosts());
  //   }
  // },[postsStatus,dispatch])


//   const orderedPosts = posts.slice().sort((a,b)=> b.date.localeCompare(a.date))


//   const renderedPosts = orderedPosts.map((post, index) => {
//     return (
     
//     );
//   });

let content;
if(postsStatus === 'loading'){
    content = <p>"loading......"</p>
} else if (postsStatus==='succeeded') {
    const orderedPosts = posts.slice().sort((a,b)=>b.date.localeCompare(a.date));
    content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post}/>)
}else if (postsStatus === 'failed') {
    content = <p>{postsError}</p>
}

// console.log(content);
  return (
      <>
      <section>
        {/* <h2>Posts</h2> */}
        {content}
      </section>
    </>
  );
}

export default PostsList;
