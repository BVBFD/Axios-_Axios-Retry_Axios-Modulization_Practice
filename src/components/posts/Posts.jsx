import React, { useEffect, useMemo, useState } from 'react';
import Post from '../post/Post';

const Posts = ({ axiosService }) => {
  const [posts, setPosts] = useState([]);

  // CSRF 토큰은 로컬 스토리지, 세션, 쿠키에 저장 하면 안됨!!
  // 그래서 HTTP 통신을 하는 컴포넌트에서 개별적으로 불러주어야함!

  useMemo(() => posts, []);

  useEffect(() => {
    const csrfToken = async () => {
      const res = await axiosService.axiosInstance.get('/getCSRFToken');
      return res.data;
    };
    const csrf = csrfToken();
    const getPosts = async () => {
      const postsRes = await axiosService.axiosInstance?.get('/posts', {
        headers: {
          CSRF_TOKEN: csrf,
          // 그리고 다음과 같이 headers에 추가!
        },
      });
      setPosts(postsRes.data.reverse());
    };
    getPosts();
  }, []);

  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Posts;
