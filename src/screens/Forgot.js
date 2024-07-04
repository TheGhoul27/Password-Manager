import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { forgotPassword } from '../models'
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'
import Container from "react-bootstrap/Container";
import NavbarComponent from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Flash } from '../components/Flash/flash';

export default function ForgotPassword() {

  const history = useHistory()
  if (localStorage.getItem('email')) {
    setTimeout(() => {
      window.flash('You are logged in', 'warning')
    }, 100)
    history.push('/')
  }

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      email: event.target.email.value,
      seq1: event.target.seq1.value,
      seq2: event.target.seq2.value,
      ans1: event.target.ans1.value,
      ans2: event.target.ans2.value,
      password: event.target.password.value
    }

    if (!body.email || !body.seq1 || !body.seq2 || !body.ans1 || !body.ans2 || !body.password) {
      setValidated(true);
    } else {
      const user = await forgotPassword(body.email, body.seq1, body.ans1, body.seq2, body.ans2, body.password)
      if (user) {
        localStorage.clear()
        history.push('/login');
        window.flash('Password reset successfully!', 'success')
      } else {
        window.flash('Invalid email or answers', 'error')
      }
    }
  }

  return (
    <>
      <NavbarComponent />
      <Flash />
      <Container className='d-flex flex-column align-items-center justify-content-center' style={{ height: '80vh' }}>
        <p className="h3 display-4"><FontAwesomeIcon icon={faUserCircle} size="1x" /></p>
        <p className="h2 display-5">Forgot Password</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ minWidth: '300px' }}>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Email</Form.Label>
              <Form.Control required name='email' type="email" placeholder="Email" />
              <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Security Question 1</Form.Label>
              <Form.Control as="select" required name='seq1'>
                <option value="">Choose...</option>
                <option value="What was the name of your first pet?">What was the name of your first pet?</option>
                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                <option value="What was the name of your elementary school?">What was the name of your elementary school?</option>
                <option value="In what city were you born?">In what city were you born?</option>
                <option value="What is your favorite food?">What is your favorite food?</option>
                <option value="What was your childhood nickname?">What was your childhood nickname?</option>
                <option value="What is the name of your favorite childhood friend?">What is the name of your favorite childhood friend?</option>
                <option value="What was the name of the street you grew up on?">What was the name of the street you grew up on?</option>
                <option value="What is the name of your first school?">What is the name of your first school?</option>
                <option value="What is your favorite book?">What is your favorite book?</option>
                <option value="What is your favorite movie?">What is your favorite movie?</option>
                <option value="What is the name of your first employer?">What is the name of your first employer?</option>
                <option value="What is the name of the town where your first job was located?">What is the name of the town where your first job was located?</option>
                <option value="What was the make and model of your first car?">What was the make and model of your first car?</option>
                <option value="What was the name of your first-grade teacher?">What was the name of your first-grade teacher?</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">Please provide a security question.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Answer 1</Form.Label>
              <Form.Control required name='ans1' type="text" placeholder="Answer 1" />
              <Form.Control.Feedback type="invalid">Please provide an answer.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Security Question 2</Form.Label>
              <Form.Control as="select" required name='seq2'>
                <option value="">Choose...</option>
                <option value="What was the name of your first pet?">What was the name of your first pet?</option>
                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                <option value="What was the name of your elementary school?">What was the name of your elementary school?</option>
                <option value="In what city were you born?">In what city were you born?</option>
                <option value="What is your favorite food?">What is your favorite food?</option>
                <option value="What was your childhood nickname?">What was your childhood nickname?</option>
                <option value="What is the name of your favorite childhood friend?">What is the name of your favorite childhood friend?</option>
                <option value="What was the name of the street you grew up on?">What was the name of the street you grew up on?</option>
                <option value="What is the name of your first school?">What is the name of your first school?</option>
                <option value="What is your favorite book?">What is your favorite book?</option>
                <option value="What is your favorite movie?">What is your favorite movie?</option>
                <option value="What is the name of your first employer?">What is the name of your first employer?</option>
                <option value="What is the name of the town where your first job was located?">What is the name of the town where your first job was located?</option>
                <option value="What was the make and model of your first car?">What was the make and model of your first car?</option>
                <option value="What was the name of your first-grade teacher?">What was the name of your first-grade teacher?</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">Please provide a security question.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Answer 2</Form.Label>
              <Form.Control required name='ans2' type="text" placeholder="Answer 2" />
              <Form.Control.Feedback type="invalid">Please provide an answer.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <Form.Label>New Password</Form.Label>
              <Form.Control required name='password' type="password" placeholder="New Password" />
              <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type="submit">Forgot Password</Button>
          <p className="text-center"><Link to="/register">Register</Link> to create an account!</p>
        </Form>
      </Container>
    </>
  )
}
