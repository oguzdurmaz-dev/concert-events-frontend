import Layout from "../../components/Layout";
import EventItem from "../../components/EventItem";
import { API_URL } from "../../config/index";

export default function EventsPage({ events }) {
  
  return (
    <Layout>
      <h1> Events {events.length}</h1>

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  return {
    props: { events:events.events },
    revalidate: 1,
  };
}
