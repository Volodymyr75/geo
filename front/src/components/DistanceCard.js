import React from 'react'
import Button from 'react-bootstrap/Button'
import './DistanceCard.css'

const DistanseCard = ({ distance }) => {
  return (
    distance && (
      <div className="wrapDistance">
        Distanse is: {distance.distance}
        <div>
          <Button className="me-2" variant="secondary">
            Delete
          </Button>
          <Button className="me-2" variant="success">
            Save
          </Button>
        </div>
      </div>
    )
  )
}

export default DistanseCard
