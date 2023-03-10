import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Search.css'

const SearchWeather = ({
  handleSubmit,
  handleClear,
  coordinate,
  setCoordinate,
  handleChange,
  latRef,
  lonRef,
  errors,
}) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Text className="text-muted pb-2">Coordinates</Form.Text>
              <Form.Group as={Col} controlId="formLat">
                <Form.Control
                  type="text"
                  name="Latitude"
                  //   value={coordinate.Latitude}
                  //   onChange={handleChange}
                  ref={latRef}
                  placeholder="Enter latitude"
                  isInvalid={!!errors.latRef}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.latRef}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formLong">
                <Form.Control
                  type="text"
                  name="Longitude"
                  //   value={coordinate.Longitude}
                  //   onChange={handleChange}
                  ref={lonRef}
                  placeholder="Enter longitude"
                  isInvalid={!!errors.lonRef}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lonRef}
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
                  {/* <Button
                    className="float-end me-2"
                    variant="primary"
                    type="button"
                    onClick={handleClear}
                  >
                    One more
                  </Button> */}
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SearchWeather
