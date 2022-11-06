import { useState } from "react";
import { Button, Container, Form, FormControl, FormText, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import postsApi from "../../api/postsApi";
import Header from "../../components/Header/Header";

function CreatePost() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const [created, setCreated] = useState(false);

  async function handleSubmit(event) {
    setError("");
    setValidated(false);

    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      try {
        setLoading(true);
        const data = await postsApi.createPost({ content });
        setContent("");
        setCreated(data?.post);
        setValidated(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError(error?.message);
        }
      } finally {
        setLoading(false);
      }
    }

    setValidated(true);
  }

  function handleOnChangeContent(e) {
    setContent(e.target.value.substring(0, 280));
  }

  if (created) {
    return <Navigate to={"/?postCreated=" + created?.id} />;
  }

  return (
    <>
      <Header />

      <Container>
        <h1>Create Post</h1>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group className="my-3">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" required rows={5} value={content} onChange={handleOnChangeContent} />
            <Form.Text muted>{280 - content.length} characters left</Form.Text>
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <div>
            <Button type="submit" disabled={loading}>
              {loading && <Spinner animation="border" size="sm" />}
              {!loading && "Submit"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default CreatePost;