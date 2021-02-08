import Head from 'next/head';
import { Container } from 'react-bootstrap';
import DefaultLayout from '../../components/Layout/DefaultLayout';

function createMarkup(html) {
  return {__html: html};
};

export default function Page({ page }) {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.excerpt} />
      </Head>
      <DefaultLayout>
        <Container className="container-fluid mt-7">
          <div className="px-3" dangerouslySetInnerHTML={createMarkup(page.body)} />
        </Container>
      </DefaultLayout>
    </>
  );
};

export async function getServerSideProps({ params, locale }) {
  const res = await fetch(`${process.env.SERVER_URL}/api/pages/${params.slug}?locale=${locale}`)
  const { data } = await res.json();

  return {
    props: {
      page: data || {},
    },
  };
};
