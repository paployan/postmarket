import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';

const Delivery = () => (
  <>
    <Head>
      <title>Առաքում | Postmarket</title>
      <meta name="description" content="Երևան քաղաքում առաքումը կատարավում է 1-2 աշխատանքային օրերի ընթացքում, իսկ մարզերում` 2-3 աշխատանքային օրերի ընթացքում." />
    </Head>
    <Container className="container-fluid mt-7">
      <Row className="justify-content-left">
        <Col className="my-auto" lg="7">
          <h1 className="page-heading text-uppercase">Առաքում</h1>
          <p className="paragraph">
            Առաքման պայմանները Երևան քաղաքում և մարզերում:
          </p>
          <p className="paragraph">
            Երևան քաղաքում առաքումը կատարավում է 1-2 աշխատանքային օրերի ընթացքում, իսկ մարզերում` 2-3 աշխատանքային օրերի ընթացքում.
          </p>
          <ul className="styled-list">
            <li>Եթե պատվերի ընդհանուր գումարը չի գերազանցում է 2999 ՀՀ դրամը, ապա Երևան քաղաքի և մարզային փոստային բաժանմունքների համար հաճախորդից գանձվում է 500 ՀՀ դրամ առաքման գումար:</li>
            <li>Եթե պատվերի ընդհանուր գումարը գերազանցում է 2999 ՀՀ դրամը, ապա առաքումը դեպի Երևան քաղաքի և մարզային փոստային բաժանմունքներ անվճար է:</li>
            <li>Եթե պատվերի ընդհանուր գումարը չի գերազանցում 6999 ՀՀ դրամը, ապա Երևան քաղաքում և մարզերում հասցեական առաքման համար գանձվում է 500 ՀՀ դրամ առաքման գումար:</li>
            <li>Եթե պատվերի ընդհանուր գումարը ավել է 6999 ՀՀ դրանից, ապա Երևան քաղաքում և մարզերում հասցեական առաքումը անվճար է:</li>
          </ul>
        </Col>
      </Row>
      <Row className="justify-content-left mb-5">
        <Col className="my-auto" lg="8">
          <h3>Ապրանքի փոխարինման կամ հետ վերադարձի պայմանները</h3>
          <p className="paragraph">
            Ապրանքն ընդունելու պահին հաճախորդը իրավունք ունի իր ընտրությամբ հրաժարվել ապրանքն ընդունելուց և պահանջել վերադարձնելու ապրանքի դիմաց վճարված գումարը կամ պահանջել ապրանքը փոխարինել կատալոգում կամ կայքում նշված համարժեք ապրանքով: Պատշաճ կերպով առաքված և որակի պահանջներին համապատասխանող ապրանքի հետ վերադարձ կամ փոխարինում այլ ապրանքով չի կատարվում:
          </p>
          <p className="paragraph">
            Ապրանքը կարող է հետ վերադարձվել կամ փոխարինել այլ համարժեք ապրանքով, եթե առկա են ապրանքի որակին, կոմպլեկտայնության, պիտանելիության և օգտագործման ժամկետներին ու այլ պայմաններին վերաբերվող այնպիսի անհամապատասխանություններ (թերություններ), որոնց առկայության դեպքում ՀՀ քաղաքացիական օրենսգրքի համաձայն գնորդը կարող է պահանջել վաճառված ապրանքի հետվերադարձ կամ փոխարինում այլ համարժեք ապրանքով:
          </p>
          <p className="paragraph">
            Ապրանքի հետվերադարձի հաճախորդը պետք է հստակ նշի ապրանքի հետ վերադարձի պատճառները` համապատասխան գրառում կատարելով:
          </p>
          <p className="paragraph">
            Հաճախորդի կողմից ապրանքի այլ համանման ապրանքով փոխարինման պահանջ ներկայացնելու դեպքում, փոխարինումը կատարվում է, եթե նման ապրանքը ենթակա է փոխարինման ՀՀ օրենսդրության համաձայն: Հաճախորդն իրավունք ունի ոչ պարենային ապրանքը փոխարինել այլ չափի, ձևի, գույնի կամ համանման կոմպլեկտայնության ապրանքով` գնի տարբերության դեպքում անհրաժեշտ վերահաշվարկ կատարելով գործակալի հետ և համապատասխան նշում կատարելով առաքումը հաստատող փաստաթղթում` այդ թվում նշելով փոխարինման պատճառը:
          </p>
        </Col>
      </Row>
    </Container>
  </>
);

export default Delivery;