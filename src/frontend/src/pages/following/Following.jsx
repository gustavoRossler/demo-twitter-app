import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as authActions from "../../store/auth/actions";
import usersApi from "../../api/usersApi";
import Header from "../../components/Header/Header";

function Following() {
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [error, setError] = useState("");

  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  async function getCurrentUser() {
    try {
      setLoading(true);
      const res = await usersApi.findByUsername({ username });
      setCurrentUser(res.user);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  const notifyFollowSuccess = (fUsername) => toast.success(`Your are now following ${fUsername}!`);

  async function followUser(userToFollow) {
    try {
      setLoadingFollow(true);
      const resFollow = await usersApi.addFollowing({ userId: userToFollow.id });
      const resCurrentUser = await usersApi.findById({ id: user.id });
      dispatch(authActions.setUser(resCurrentUser.user));
      notifyFollowSuccess(userToFollow.username);
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
            <h1>Users followed by {currentUser.username}</h1>
            <Table>
              <tbody>
                {
                  currentUser.following.map(item => (
                    <tr key={item.id}>
                      <td className="d-flex gap-3 align-items-center">
                        {item.name},
                        <Link to={"/user/" + item.username}>@{item.username}</Link>
                        {!user.following.find(fUser => fUser.id === item.id) && item.id !== user.id && (
                          <Button onClick={() => followUser(item)} disabled={loadingFollow}>
                            {loadingFollow && <Spinner animation="border" size="sm" />}
                            {!loadingFollow && "Follow"}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </>
        )}

      </Container>
    </>
  );
}

export default Following;