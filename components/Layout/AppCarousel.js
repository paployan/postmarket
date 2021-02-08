import { Carousel } from 'react-bootstrap';

const AppCarousel = ({ items }) => (
  <Carousel>
    {items.map((item, index) => (
      <Carousel.Item key={index.toString()}>
        <img
          src={item.image}
          alt="First slide"
        />
        {(item.title || item.description) &&  <Carousel.Caption>
          {item.title && <h3>{item.title}</h3>}
          {item.description && <p>{item.description}</p>}
        </Carousel.Caption>}
      </Carousel.Item>
    ))}
  </Carousel>
);

export default AppCarousel;
