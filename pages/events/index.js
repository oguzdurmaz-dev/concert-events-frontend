import Layout from "../../components/Layout";
import EventItem from "../../components/EventItem";
import { API_URL, PER_PAGE } from "../../config/index";
import Pagination from "../../components/Pagination";

export default function EventsPage({ events,total,page }) {


  return (
    <Layout>
      <h1> Events {page} </h1>

      {events.length > 0 ? (
        events.map((evt) => <EventItem key={evt.id} evt={evt} />)
      ) : (
        <h4>There is no event here</h4>
      )}

     <Pagination page={page} total={total}/>
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
 
  //CALCULATE START PAGE
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  //const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
  
  //Fetch Total/count
  const totalRes = await fetch(
    `${API_URL}/events/count`
  );
  const total = await totalRes.json();

  //Fetch Events
  const EventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await EventRes.json();

  return {
    props: { events, page:+page,total },
  };
}
