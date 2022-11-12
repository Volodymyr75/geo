import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Search.css'

const Search = ({
  handleSubmit,
  handleClear,
  coordinate,
  setCoordinate,
  handleChange,
  errors,
}) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Text className="text-muted pb-2">From</Form.Text>
              <Form.Group as={Col} controlId="formFromLat">
                <Form.Control
                  type="text"
                  name="fromLat"
                  value={coordinate.fromLat}
                  onChange={handleChange}
                  placeholder="Enter latitude"
                  isInvalid={!!errors.fromLat}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fromLat}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formFromLong">
                <Form.Control
                  type="text"
                  name="fromLong"
                  value={coordinate.fromLong}
                  onChange={handleChange}
                  placeholder="Enter longitude"
                  isInvalid={!!errors.fromLong}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fromLong}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Text className="text-muted pb-2">To</Form.Text>
              <Form.Group as={Col} controlId="formToLat">
                <Form.Control
                  type="text"
                  name="toLat"
                  value={coordinate.toLat}
                  onChange={handleChange}
                  placeholder="Enter latitude"
                  isInvalid={!!errors.toLat}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.toLat}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formToLong">
                <Form.Control
                  type="text"
                  name="toLong"
                  value={coordinate.toLong}
                  onChange={handleChange}
                  placeholder="Enter longitude"
                  isInvalid={!!errors.toLong}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.toLong}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Col xs={6}></Col>
              <Col>
                <div className="text-right">
                  <Button className="float-end" variant="success" type="submit">
                    Submit
                  </Button>
                  <Button
                    className="float-end me-2"
                    variant="primary"
                    type="button"
                    onClick={handleClear}
                  >
                    One more
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Search
