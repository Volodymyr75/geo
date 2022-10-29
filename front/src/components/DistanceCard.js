import React from 'react'
import Button from 'react-bootstrap/Button'
import './DistanceCard.css'

const DistanseCard = ({ distance, saveDistance, deleteDistance }) => {
  return (
    distance && (
      <div className="wrapDistance">
        Distanse is: {distance.distance}
        <div>
          <Button
            className="me-2"
            variant="secondary"
            onClick={() => deleteDistance(distance.id)}
          >
            Delete
          </Button>
          {/* {!distance.saved && (
            <Button
              className="me-2"
              variant="success"
              onClick={() => saveDistance(distance.id)}
            >
              Save
            </Button>
          )} */}
          <Button
            disabled={distance.saved}
            className="me-2"
            variant={distance.saved ? 'success' : 'primary'}
            onClick={() => saveDistance(distance.id)}
          >
            {distance.saved ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>
    )
  )
}

export default DistanseCard
