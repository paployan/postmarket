import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';

const OurPartners = () => (
  <>
    <Head>
      <title>Մեր գործընկերները | Postmarket</title>
      <meta name="description" content="Մենք համագործակցում են հետևյալ գործընկեր կազմակերպությունների հետ" />
    </Head>
    <Container className="container-fluid mt-7">
      <Row>
        <Col className="my-auto">
          <h1 className="page-heading text-uppercase">Մեր գործընկերները</h1>
          <p className="paragraph">
            Մենք համագործակցում են հետևյալ գործընկեր կազմակերպությունների հետ
          </p>
        </Col>
      </Row>
      <Row className="mb-5" xs={1} md={2} lg={2}>
        <Col>
          <ul className="styled-list mb-6">
            <li>«Տիեռաս Դե Արմենիա» ՍՊԸ</li>
            <li>Վահրամ Հակոբյան ԱՁ</li>
            <li>Աննա Սողոմոնյան ԱՁ</li>
            <li>Արթուր Մինասյան ԱՁ</li>
            <li>Սամվել Աբրահամյան ԱՁ</li>
            <li>Օֆելյա Ասիրյան ԱՁ</li>
            <li>«Անտարես» ՍՊԸ</li>
            <li>«Զանգակ-97» ՍՊԸ</li>
            <li>«Լույս հրատարակչություն» ՓԲԸ</li>
            <li>«Լուսաբաց հրատարակչության» ՓԲԸ</li>
            <li>Արշավիր Դավթյան ԱՁ</li>
            <li>«Հայկ Բալայան» ՍՊԸ</li>
            <li>Շավարշ Սարգսյան ԱՁ</li>
            <li>Աշոտ Սարգսան ԱՁ</li>
            <li>Արմեն Ավետիսյան ԱՁ</li>
            <li>Արփինե Հովհաննիսյան ԱՁ</li>
            <li>Մարգարիտ Միրիջանյան ԱՁ</li>
            <li>«Սաթենկար» ՍՊԸ</li>
            <li>«Հելլո» ՍՊԸ</li>
          </ul>
        </Col>
        <Col>
          <ul className="styled-list mb-6">
            <li>«Առևտրի տուն Ուզբեկտկանի» ՍՊԸ</li>
            <li>«ՕԼ-Զա» ՍՊԸ</li>
            <li>«Պասսատ» ՍՊԸ</li>
            <li>«Դոմբաև Ալեքսանդր» ՍՊԸ</li>
            <li>Վարազդատ Ստեփանյան ԱՁ</li>
            <li>«Բյութի պրոդաքս» ՍՊԸ</li>
            <li>«Ալֆա-Մեդիկա Հելֆ Սոլյուշնս» ՍՊԸ</li>
            <li>«Ա.Կ.Լ Հովհաննիսյաններ» ՍՊԸ</li>
            <li>Վարդգես Թուրուզյան ԱՁ</li>
            <li>«Տոնուս-Լես» ՍՊԸ</li>
            <li>«Նար-Առ» ՍՊԸ</li>
            <li>«Բի-Լայն» ՍՊԸ</li>
            <li>«Արսիել էլեքթրոնիքս» ՍՊԸ</li>
            <li>«Զիգզագ» ՍՊԸ</li>
            <li>«Մեծ ծիածան» ՍՊԸ</li>
            <li>«Տիկո Հոլդինգ» ՍՊԸ</li>
            <li>«Էմբ դիզայն» ՍՊԸ</li>
            <li>«Բի էյջ քլին» ՍՊԸ</li>
          </ul>
        </Col>
      </Row>
    </Container>
  </>
);

export default OurPartners;
