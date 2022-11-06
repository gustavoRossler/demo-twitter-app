import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as authActions from "../../store/auth/actions";
import usersApi from "../../api/usersApi";
import postsApi from "../../api/postsApi";
import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";

function User() {
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [error, setError] = useState("");

  const [posts, setPosts] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [errorPosts, setErrorPosts] = useState(null);

  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  async function getCurrentUser() {
    try {
      setLoading(true);
      const res = await usersApi.findByUsername({ username });
      setCurrentUser(res.user);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getPosts = async () => {
    try {
      setLoadingPosts(true);
      const response = await postsApi.getPosts({ authorId: currentUser.id });
      setPosts(response.posts);
    } catch (error) {
      setErrorPosts(error.response.data.message);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (
        user.following.find(item => item.id === currentUser.id) ||
        user.followers.find(item => item.id === currentUser.id) ||
        user.id === currentUser.id) {
        getPosts();
      }
    }
  }, [currentUser]);

  const notifyFollowSuccess = (fUsername) => toast.success(`Your are now following ${fUsername}!`);

  async function followUser(userToFollow) {
    try {
      setLoadingFollow(true);
      const resFollow = await usersApi.addFollowing({ userId: userToFollow.id });
      const resUser = await usersApi.findById({ id: user.id });
      dispatch(authActions.setUser(resUser.user));
      notifyFollowSuccess(userToFollow.username);
      getCurrentUser();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoadingFollow(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <Header />
      <Container>
        {error && <p className="text-danger">{error}</p>}
        {loading && <div className="text-center my-5"><Spinner animation="border" /></div>}

        {currentUser && (
          <>
            <h1>{currentUser.name}</h1>
            <p><b>Username:</b> @{currentUser.username}</p>
            <p><b>E-mail:</b> {currentUser.email}</p>
            <p><b>Register date:</b> {currentUser.created_at.substring(0, 10)} {currentUser.created_at.substring(11, 19)}</p>

            <div className="my-2 border-bottom border-top py-2 d-flex gap-2 align-items-center justify-content-between">
              <div className="d-flex gap-2 align-items-center">
                <Link className="border-end pe-2" to={"/followers/" + currentUser.username}>Followed by ({currentUser.followers?.length})</Link>
                <Link className="border-end pe-2" to={"/following/" + currentUser.username}>Following ({currentUser.following?.length})</Link>
                {!user.following.find(item => item.id === currentUser.id) && (
                  <Button onClick={() => followUser(currentUser)} disabled={loadingFollow}>
                    {loadingFollow && <Spinner animation="border" size="sm" />}
                    {!loadingFollow && "Follow"}
                  </Button>
                )}
              </div>
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
            </div>
          </>
        )}

      </Container>
    </>
  );
}

export default User;