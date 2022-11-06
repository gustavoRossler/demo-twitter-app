import { useState } from "react";
import { Form, FormControl, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import usersApi from "../../api/usersApi";
import * as authActions from "../../store/auth/actions";

function FormFollowUser() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  async function handleSubmit(event) {
    setValidated(false);

    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      try {
        setLoading(true);
        const resFindUser = await usersApi.findByUsername({ username });

        if (resFindUser.user.id === user.id) {
          notifyErrorSameUser();
          return false;
        }

        if (user.following.find(item => item.id === resFindUser.user.id)) {
          notifyErrorAlready();
          return false;
        }

        const resFollow = await usersApi.addFollowing({ userId: resFindUser.user.id });
        const resCurrentUser = await usersApi.findById({ id: user.id });
        dispatch(authActions.setUser(resCurrentUser.user));
        notifySuccess();
        setUsername("");
      } catch (error) {
        notifyError();
      } finally {
        setLoading(false);
      }
    } else {
      setValidated(true);
    }
  }

  const notifySuccess = () => toast.success(`Your are now following ${username}!`);
  const notifyError = () => toast.error(`User ${username} not found`);
  const notifyErrorSameUser = () => toast.error(`You can\'t follow yourself`);
  const notifyErrorAlready = () => toast.error(`You are already following ${username}`);

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <div className="d-flex gap-2 align-items-center">
          <FormControl
            placeholder="@username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
          <Button type="submit" disabled={loading}>
            {loading && <Spinner animation="border" size="sm" />}
            {!loading && "Follow"}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default FormFollowUser;