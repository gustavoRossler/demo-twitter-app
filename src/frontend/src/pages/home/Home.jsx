import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector, } from 'react-redux';
import { Container, FormControl, Button, Spinner, Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header/Header";
import postsApi from "../../api/postsApi";
import Post from "../../components/Post/Post";
import FormFollowUser from "../../components/FormFollowUser/FormFollowUser";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const user = useSelector(state => state.auth.user);

  const [posts, setPosts] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [errorPosts, setErrorPosts] = useState(null);
  const [postsTotalItems, setPostsTotalItems] = useState(0);
  const [postsCurrentPage, setPostsCurrentPage] = useState(0);

  const getPosts = async () => {
    try {
      setLoadingPosts(true);
      const response = await postsApi.getPosts({ authorId: user.id, fromUsersFollowing: true, page: postsCurrentPage });
      setPosts(response.posts);
      setPostsTotalItems(response.totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const notify = () => toast.success("New post created successfully!");

  useEffect(() => {
    getPosts();
    const param = searchParams.get("postCreated");
    if (param) {
      notify();
      searchParams.delete("postCreated");
      setSearchParams(searchParams);
    }
  }, []);

  const paginationItems = () => {
    const items = [];
    const pages = Math.ceil(postsTotalItems / 10);
    for (let i = 0; i < pages; i++) {
      items.push(
        <Pagination.Item key={i} active={i === postsCurrentPage} onClick={() => setPostsCurrentPage(i)}>
          {i + 1}
        </Pagination.Item>
      );
    }
    return items;
  }

  useEffect(() => {
    if (posts && !loadingPosts) {
      getPosts();
    }
  }, [postsCurrentPage]);

  return (
    <>
      <ToastContainer />
      <Header />
      <Container>

        <div className="my-2 border-bottom py-2 d-flex gap-2 align-items-center justify-content-between">
          <div className="d-flex gap-2 align-items-center">
            <Link className="border-end pe-2" to={"/followers/" + user.username}>Followed by ({user.followers?.length})</Link>
            <Link to={"/following/" + user.username}>Following ({user.following?.length})</Link>
          </div>
          <Link to="/create-post" className="btn btn-primary">Create Post</Link>
          <FormFollowUser />
        </div>

        <div className="my-3 d-flex flex-column justify-content-center align-items-center">
          {loadingPosts && (
            <Spinner animation="border" />
          )}
          {!loadingPosts && !posts?.length && (
            <p>No posts to show</p>
          )}
          {!loadingPosts && posts && posts.map(post => (
            <Post post={post} key={post.id} />
          ))}
          {!loadingPosts && posts && <Pagination>{paginationItems()}</Pagination>}
        </div>

      </Container>
    </>
  );
}

export default Home;