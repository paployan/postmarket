import dynamic from 'next/dynamic';
import { string } from 'prop-types';
import { Container } from 'react-bootstrap';

const WizardContainer = ({ page }) => {
  const PageComponent = dynamic(() => import(`../Account/${page}`));
  return (
    <Container className="container-fluid">
      <PageComponent />
    </Container>
  );
};

WizardContainer.propTypes = {
  page: string,
};

WizardContainer.defaultProps = {
  page: 'personal-information',
};

export default WizardContainer;
