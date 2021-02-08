import { string } from 'prop-types';
import { Card } from 'react-bootstrap';

const CardBox = ({ title, children }) => {
  return (
    <Card className="card-shadow-light">
      <div className="card-img">
        {children}
      </div>
      <Card.Body className="h-7x">
        <Card.Title>
          {title}
        </Card.Title>
      </Card.Body>
    </Card>
  )
}

CardBox.propTypes = {
  title: string.isRequired,
};

export default CardBox;
