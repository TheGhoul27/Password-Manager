import { useState } from 'react'
import { createUser } from '../models';
import {useHistory} from 'react-router-dom'
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom'
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import NavbarComponent from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Flash } from '../components/Flash/flash';
import '../styles/scrollbar.css';

export default function SignIn() {

  const history = useHistory();
  if (localStorage.getItem('email')) {
    setTimeout(() => {
      window.flash('You are logged in', 'warning')
    }, 100)
    history.push('/')
  }

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      sec1q: e.target.sec1q.value,
      sec2q: e.target.sec2q.value,
      sec1a: e.target.sec1a.value,
      sec2a: e.target.sec2a.value
    }

    try {
      if (body.firstName && body.lastName && body.password && body.email && body.password === e.target.confirm_password.value && body.sec1q && body.sec2q && body.sec1a && body.sec2a) {
        const user = await createUser(body.firstName, body.lastName, body.email, body.password, body.sec1q, body.sec1a, body.sec2q, body.sec2a)
        if (!user) {
          window.flash('Email has been chosen', 'error')
        } else {
          localStorage.setItem('email', body.email)
          history.push('/')
          window.flash('Account created successfully, signed in', 'success')
        }
      } else if (!body.firstName || !body.email || !body.lastName || !e.target.confirm_password.value) {
        setValidated(true)
      } else {
        setValidated(true)
      }
    } catch (error) {
      console.log(error)
      window.flash('Something went wrong', 'error')
    }
  }

  return (
    <>
      <NavbarComponent />
      <Flash />
      <Container className='d-flex flex-column align-items-center justify-content-center pt-5' style={{ height: '80vh' }}>
        <p className="h3 display-4 mt-5"><FontAwesomeIcon icon={faUserCircle} size="1x" /></p>
        <p className="h2 display-5">Register</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ minWidth: '300px' }}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control required name='firstName' type="text" placeholder="First name" />
              <Form.Control.Feedback type="invalid">Please provide your first name.</Form.Control.Feedback>
              <Form.Control.Feedback>Great name!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Last Name</Form.Label>
              <Form.Control required name='lastName' type="text" placeholder="Last name" />
              <Form.Control.Feedback type="invalid">Please provide your last name.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" aria-describedby="inputGroupPrepend" required name='email' />
              <Form.Control.Feedback type="invalid">Please choose a valid and unique email.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required name='password' />
              <Form.Control.Feedback type="invalid">Please provide a password between 8 and 20.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" required name='confirm_password' />
              <Form.Control.Feedback type="invalid">Fields do not match.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Security Question 1</Form.Label>
              <Form.Control as="select" required name='sec1q'>
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
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Security Answer 1</Form.Label>
              <Form.Control type="text" placeholder="Security Answer 1" aria-describedby="inputGroupPrepend" required name='sec1a' />
              <Form.Control.Feedback type="invalid">Please provide a security answer.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Security Question 2</Form.Label>
              <Form.Control as="select" required name='sec2q'>
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
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Security Answer 2</Form.Label>
              <Form.Control type="text" placeholder="Security Answer 2" aria-describedby="inputGroupPrepend" required name='sec2a' />
              <Form.Control.Feedback type="invalid">Please provide a security answer.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type="submit">Register</Button>
          <p className="text-center"><Link to="/login">Sign in</Link> if already registered!</p>
        </Form>
      </Container>
    </>
  )
}
