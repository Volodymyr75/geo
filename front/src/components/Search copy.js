import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Search.css'

const Search = ({
  word,
  setWord,
  handleSubmit,
  handleFilter,
  onSuggestHandler,
  data,
}) => {
  const [filterData, setFilterData] = useState([])
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  value={word}
                  // onChange={(e) => setWord(e.target.value)}
                  onChange={(e) => handleFilter(e.target.value)}
                  placeholder="Enter place"
                />
                {data && (
                  <div className="dataItem">
                    {console.log(data.features[0])}
                  </div>
                )}
                {data && (
                  <div className="dataResult">
                    {data.features.map((value, key) => {
                      return (
                        <div
                          key={key}
                          className="dataItem"
                          onClick={() => onSuggestHandler(value.place_name)}
                        >
                          {value.place_name}
                        </div>
                      )
                    })}
                  </div>
                )}
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Search
