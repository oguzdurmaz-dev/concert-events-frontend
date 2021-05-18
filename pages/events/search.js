import qs from "qs";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import Link from "next/link"
export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title={`Search results for :${router.query.term}`}>
      <h1>
        {" "}
        Search results for ({events.length}): {router.query.term}
      </h1>
      {events.length>0?events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      )):<h3>There is no result</h3>}
      <Link href="/events">
          <a>{"< "}Go Back</a>
      </Link>
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events, term },
  };
}
