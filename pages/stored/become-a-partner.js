import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';

const BecomePartner = () => (
  <>
    <Head>
      <title>Դարձիր գործընկեր | Postmarket</title>
      <meta name="description" content="Ունենալով առաքելություն անընդհատ զարգացնելու և մեծացնելու ծառայության ծավալները, մենք միշտ պատրաստ ենք համագործակցության եզրեր գտնել նոր գործընկեր կազմակերպությունների հետ:" />
    </Head>
    <Container className="container-fluid mt-7">
      <Row className="justify-content-left mb-5">
        <Col className="my-auto" lg="8">
          <h1 className="page-heading text-uppercase">Դարձիր գործընկեր</h1>
          <p className="paragraph">
            Ունենալով առաքելություն անընդհատ զարգացնելու և մեծացնելու ծառայության ծավալները, մենք միշտ պատրաստ ենք համագործակցության եզրեր գտնել նոր գործընկեր կազմակերպությունների հետ:
          </p>
          <p className="paragraph">
            Եթե Ձեզ հետաքրքում է մեր մատուցած ծառայությունը և ցանկանում եք, որպեսզի Ձեր պրոդուկտը հասանելի լինի ամբողջ ՀՀ տարածքում, ապա մենք պատրաստ ենք համագործակցել Ձեզ հետ: Արդեն իսկ 40-ից ավել կազմակերպություն և անհատ ձեռնարկատեր միացել է մեզ:
          </p>
          <p className="paragraph">
            Եթե Ձեզ հետաքրքրեց, ապա զանգահարիր 514-541 հեռախոսահամարով կամ այցելիր Հայփոստի գլխամասային գրասենյակ, կոմերցիոն վարչության, Սարյան 22 հասցեով:
          </p>
          <p className="paragraph">
            Մեր թիմը սիրով պատրաստ է լսել և քննարկել ցանկացած նոր առաջարկ:
          </p>
        </Col>
      </Row>
    </Container>
  </>
);

export default BecomePartner;
