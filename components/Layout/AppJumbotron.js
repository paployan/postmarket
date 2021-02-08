import { Jumbotron, Container } from 'react-bootstrap';

const AppJumbotron = () => (
  <Jumbotron className="bg-white text-uppercase" fluid>
    <Container>
      <h1 className="font-weight-bold mb-0">
        Փոստ<span>մարկետ</span>
      </h1>
      <span className="support-phone">
        +374 10 514 514
      </span>
    </Container>
  </Jumbotron>
);

export default AppJumbotron;
