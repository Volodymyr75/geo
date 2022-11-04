import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const navbarStyle = {
  backgroundColor: 'lightblue',
}

const Header = (props) => {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Navbar.Brand as={Link} to=".">
          {props.title}
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to=".">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="weather">
            Weather
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
