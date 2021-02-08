import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import CardBox from '../../components/Addon/CardBox';
import { Location, Delivery, CartBag, Hourglass } from '../../components/SVG';

const WhatIsPostMarket = () => (
  <>
    <Head>
      <title>Ի՞նչ է փոստմարկետը | Postmarket</title>
      <meta name="description" content="«Փոստմարկետ»-ը բացառիկ ծառայություն է, որը հնարավորություն է ընձեռնում իր հաճախորնդներին կատարել գնումներ կատալոգի միջոցով և առցանց:" />
    </Head>
    <Container className="container-fluid mt-7">
      <Row className="justify-content-left">
        <Col className="my-auto" lg="8">
          <h1 className="page-heading text-uppercase">Ի՞նչ է փոստմարկետը</h1>
          <p className="paragraph">«Փոստմարկետ»-ը բացառիկ ծառայություն է, որը հնարավորություն է ընձեռնում իր հաճախորնդներին կատարել գնումներ կատալոգի միջոցով և առցանց:</p>
          <p className="paragraph">Խնայեք Ձեր ժամանակը և խանութներ այցելելու փոխարեն գնումներ կատարեք տանը, իսկ առաքման մասին կհոգանք մենք, ձեր պատվերը հասցնելով ձեր նշած փոստային բաժանմունք կամ ձեր նախընտրած հասցեով ամբողջ ՀՀ տարածքում:</p>
          <p className="paragraph">Համագործակցություն ծավալելով քառասունից ավել գործընկեր կազմակերպությունների հետ, վստահ ենք, որ մեր հաճախորդին ընձեռնում ենք ընտրության մեծ հնարավորություն գնումներ կատարել մեր հարթակում ներկայացված բազմազան տեսականուց:</p>
        </Col>
      </Row>

      <Row>
        <Col className="my-auto">
          <h3>PostMarket-ից օգտվելու առավելությունները</h3>
          <Row xs={1} md={2} lg={4}>
            <Col>
              <CardBox title="Հասանելիություն ամբողջՀՀ տարածքում">
                <Location />
              </CardBox>
            </Col>
            <Col>
              <CardBox title="Առաքում ՀՀ ցանկացածվայր սեղմ ժամկետներում">
                <Delivery />
              </CardBox>
            </Col>
            <Col>
              <CardBox title="Ապրանքների ընտրության լայն տեսականի">
                <CartBag />
              </CardBox>
            </Col>
            <Col>
              <CardBox title="Ժամանակի խնայողություն">
                <Hourglass />
              </CardBox>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </>
);

export default WhatIsPostMarket;
