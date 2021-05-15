import Layout from "../components/Layout";
import { API_URL } from "../config/index";

export default function HomePage({ events }) {
  console.log(typeof events);

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events yet</h3>}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
