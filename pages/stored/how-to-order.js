import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';

const HowToOrder = () => (
  <>
    <Head>
      <title>Ինչպե՞ս պատվիրել | Postmarket</title>
      <meta name="description" content="Հայփոստ ՓԲԸ-ն հանդիսանում է ամենամեծ փոստային և լոգիստիկ ցանցը ամբողջ ՀՀ տարածքում (շուրջ 900 փոստային բաժանմունք) և ապահովում բազմաթիվ ծառայությունների հասանելիություն Հայաստանի ցանկացած վայրում` նույնիսկ հեռավոր գյուղերում:" />
    </Head>
    <Container className="container-fluid mt-7">
      <Row className="justify-content-left">
        <Col className="my-auto" lg="8">
          <h1 className="page-heading text-uppercase">Ինչպե՞ս պատվիրել</h1>
          <p className="paragraph">
            Հայփոստ ՓԲԸ-ն հանդիսանում է ամենամեծ փոստային և լոգիստիկ ցանցը ամբողջ ՀՀ տարածքում (շուրջ 900 փոստային բաժանմունք) և ապահովում բազմաթիվ ծառայությունների հասանելիություն Հայաստանի ցանկացած վայրում` նույնիսկ հեռավոր գյուղերում:
          </p>
          <p className="paragraph">
            Գնումներ կատա րելը այլևս հոգ չէ Փոստմարկետի հետ միասին: Կատարի՛ր գնումներ Փոստմարկետ ծառայության միջոցով և ստացիր քո պատվերը Քո նախընտրած վայրում:
          </p>
        </Col>
      </Row>

      <Row>
        <Col className="my-auto">
          <h3 className="mb-6">Ինչպես օգտվել Փոստմարկետից`</h3>
          <h4>Այցելելով ցանկացած փոստային բաժանմունք</h4>
          <ul className="styled-list mb-6">
            <li>Այցելեք Հայփոստի ցանկացած Փոստային բաժանմունք</li>
            <li>Ծանոթացեք Փոստկատալոգին</li>
            <li>Առանձնացրեք ձեր նախընտրած ապրանքները</li>
            <li>Հայփոստի աշխատակիցների օգնությամբ գրանցեք պատվերը անմիջապես փոստային բաժանմունքում</li>
          </ul>
          <h4>Պատվիրելով փոստատարի այց</h4>
          <ul className="styled-list mb-6">
            <li>Զանգահարեք 514-514 հեռախոսահամարով</li>
            <li>Նախօրոք հեռախոսակապի օպերատորին տեղեկացրեք, ձեր նախընտրած ապրանքների մասին</li>
            <li>Մեր աշխատակիցները կայցելեն Ձեր նախընտրած հասցեով և կանեն համապատասխան ձևակերպումները</li>
          </ul>
          <h4>Զանգի միջոցով</h4>
          <ul className="styled-list mb-6">
            <li>Պարզապես զանգահարեք 514-514 հեռախոսահամարով և մեր աշխատակիցը կգրանցի Ձեր պատվերը</li>
          </ul>
          <h4>Կայքով</h4>
          <ul className="styled-list mb-6">
            <li>Այցելիր www.postmarket.am կայք</li>
            <li>Գրանցվիր և բացիր քո անհատական էջը</li>
            <li>Ընտրիր քո նախընտրած ապրանքը(ները)</li>
            <li>Ձևակերպիր պատվերը</li>
            <li>Ստացիր քո պատվերը ՀՀ ցանկացած բաժանմունքից կամ քո նախընտրած ցանկացած հասցեով 1-2 (Երևանում), 2-3 (մարզերում) օրերի ընթացքում</li>
          </ul>
        </Col>
      </Row>
    </Container>
  </>
);

export default HowToOrder;
