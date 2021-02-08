import Link from 'next/link';
import { array, number } from 'prop-types';
import { Row, Col, Card, Image } from 'react-bootstrap';

const List = ({ items, col }) => (
  <Row className="mx-auto">
    {items.map((item, index) => (
      <Col xs={12} md={col} key={index} className="mb-4">
        <Card className="product">
          <Link href={`/product/${item.slug}`}>
            <Image className="card-shadow-light w-100 card-img" src={item.thumbnail} />
          </Link>
          <h5 className="mt-3">{item.name}</h5>
          <p className="h4">
            {item.discount ? Math.round((item.unite_price - (item.unite_price*item.discount/100))) : item.unite_price}֏
            {item.discount && <span className="product-price-strikethrough">{item.unite_price}֏</span>}
          </p>
        </Card>
      </Col>
    ))}
  </Row>
);

List.propTypes = {
  items: array.isRequired,
  col: number,
};

List.defaultProps = {
  col: 4,
};

export default List;
