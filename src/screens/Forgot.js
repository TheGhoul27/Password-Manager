import { useState} from 'react'
import { useHistory } from 'react-router-dom';
import {forgotPassword} from '../models'
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

    // Handle login logic

    if (!body.email || !body.seq1 || !body.seq2 || !body.ans1 || !body.ans2 || !body.password) {
      setValidated(true);
    } else {
      const user = await forgotPassword(body.email, body.seq1, body.ans1, body.seq2, body.ans2, body.password)
      if (user) {
        //localStorage.setItem('email', body.email)
        localStorage.clear()
        history.push('/login');
        window.flash('Password reset successfully!', 'success')
      } else {
        window.flash('Invalid email', 'error')
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
              <Form.Control required name='seq1' type="text" placeholder="Security Question 1" />
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
              <Form.Control required name='seq2' type="text" placeholder="Security Question 2" />
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
          <p className="text-center"><Link to="/register">Register</Link> to create account!</p>
        </Form>
      </Container>
    </>
  )
}
