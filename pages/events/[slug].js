import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import EventMap from "@/components/EventMap";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


export default function EventPage({ event }) {
  const router = useRouter();


  return (
    <Layout title={`Concert Events - ${event.name}`}>
      <ToastContainer />
      <div className={styles.event}>
        <span>
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}{" "}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <div className={styles.image}>
            <Image
              src={event.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h1>Performers : </h1>
        <p>{event.performers}</p>
        <h3>Description : </h3>
        <p>{event.description}</p>
        <h3>Venue : </h3>
        <p>{event.venue}</p>
        <p>{event.address}</p>

        <EventMap event={event}/>

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();
//   const paths = events.map((event) => ({
//     params: { slug: event.slug },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`);
//   const events = await res.json();
//   console.log(events);
//   return {
//     props: {
//       event: events[0],
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();
  return {
    props: {
      event: events[0],
    },
  };
}
