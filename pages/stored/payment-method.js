import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';

const PaymentMethod = () => (
  <>
    <Head>
      <title>Վճարման կարգը | Postmarket</title>
      <meta name="description" content="Փոստմարկետ ծառայության միջոցով պատվերներ կատարելիս վճարումը իրականցվում է կանխիկ և ապառիկ եղանակով:" />
    </Head>
    <Container className="container-fluid mt-7">
      <Row className="justify-content-left">
        <Col className="my-auto" lg="5">
          <h1 className="page-heading text-uppercase">Վճարման կարգը</h1>
          <p className="paragraph">
            Փոստմարկետ ծառայության միջոցով պատվերներ կատարելիս վճարումը իրականցվում է կանխիկ և ապառիկ եղանակով:
          </p>
        </Col>
      </Row>

      <Row className="justify-content-left">
        <Col className="my-auto" lg="8">
          <h3>Ապառիկ եղանակով</h3>
          <p className="paragraph">
            «Հայփոստ»-ի և «Կոնվերս բանկի» համագործակցության շնորհիվ դուք կարող եք ձեռք բերել կենցաղային տեխնիկայի բաժնից ցանկացած ապրանք, որի գինը գերազանցում է 30.000 ՀՀ դրամը ապառիկի բացառիկ պայմաններով:
          </p>
          <p className="paragraph">
            Պարզապես ընտրեք Ձեր նախընտրած ապրանքը և այցելեք ստորև նշված Փոստային բաժանմունքներից որևէ մեկը, որտեղ հաշված րոպեների ընթացքում կձակերպեն ապառիկ գործարքը:
          </p>
          <h4>Ապառիկ վարկավորման գործարք իրականացնող փոստային բաժանմունքներ</h4>
          <ul className="styled-list mb-6">
            <li>Շիրակի մարզ, գ. Ախուրյան, 2601</li>
            <li>Արարատի մարզ, գ. Այնթափ 6փող. 49., 0803</li>
            <li>Վայոց Ձորի մարզ, գ. Արենի, 3-րդ փողոց, 26 շ, 3604</li>
            <li>Վայոց Ձորի մարզ, գ. Մալիշկա, 1-ին փ, շ 8, 3610</li>
            <li>Վայոց Ձորի մարզ, ք. Ջերմուկ, Շահումյան 14, 3701</li>
            <li>Վայոց Ձորի մարզ, ք. Եղեգնաձոր, Շահումյան 3, 3601</li>
            <li>Կոտայքի մարզ, գ. Գառնի, 2215</li>
            <li>Տավուշի մարզ, գ. Կողբ, 52փ., շ 2, 4110</li>
            <li>Լոռու մարզ, գ Մեծավան, Չարենցի փ, շ 1, 2112</li>
            <li>Լոռու մարզ, ք. Սպիտակ, Ս. Ավետիսյան փող., թիվ 7 շ, 1801</li>
            <li>Արագածոտնի մարզ, գ. Ոսկևազ, Արագածի փ. 7, 0220</li>
            <li>Գեղարքունիքի մարզ, գ. Վարդենիկ, Կ. Շահինյան 77, 1418</li>
            <li>Գեղարքունիքի մարզ, ք. Սևան, Նաիրյան 137</li>
            <li>Արմավիրի մարզ, գ. Փարաքար, Նաիրի 15, 1149</li>
            <li>Արագածոտնի մարզ, գ. Օշական, Դպրոցականների 8, 0226</li>
          </ul>
        </Col>
      </Row>

      <Row className="justify-content-left">
        <Col className="my-auto" lg="7">
          <h3>Կանխիկ եղանակով</h3>
          <p className="paragraph">
            Եթե պատվերը գրանցել եք փոստային բաժանմունքում վճարումը կատարվում է պատվերի գրանցման պահին` կանխիկ եղանակով։
          </p>
          <p className="paragraph">
            Եթե պատվերը գրանցել եք փոստատարի այցի միջոցով, վճարումը կատարվում է պատվերի գրանցման պահին` կանխիկ եղանակով։
          </p>
          <p className="paragraph">
            Եթե պատվերը գրանցել եք հեռախոսազանգի միջոցով, վճարումը կատարվում է պատվերը ստանալու պահին` կանխիկ եղանակով։
          </p>
          <p className="paragraph">
            Եթե պատվերը գրանցել եք առցանց, վճարումը կատարվում է պատվերը ստանալու պահին` կանխիկ եղանակով։
          </p>
        </Col>
      </Row>
    </Container>
  </>
);

export default PaymentMethod;
