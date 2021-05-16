import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Image from "next/image";
import {FaImage} from "react-icons/fa"
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "../../../components/Modal"
import { API_URL } from "../../../config/index";
import styles from "../../../styles/Form.module.css";
import moment from "moment";
export default function EditEventPage({ evt }) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const [showModal,setShowModal]=useState(false);

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );
  const router = useRouter();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyFields) {
      toast.error("Please fill all fields.");
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      toast.error("Something Went Wrong");
    } else {
      const evt = await res.json();

      router.push(`/events/${evt.slug}`);
      toast.success("Event Added!");
    }
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go back</Link>
      <h1>Edit Event</h1>
      <h3 className={styles.subHead}>
        Current editing - <span>{evt.name}</span>
      </h3>
      <ToastContainer />
      <form className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name"> Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers"> Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue"> Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address"> Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date"> Date</label>

            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time"> Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description"> Description</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="submit"
          onClick={handleSubmit}
          value="Update Event"
          className="btn"
        />
      </form>
      <h2>Event Iamge</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
          <button onClick={()=>setShowModal(true)} className="btn-secondary"><FaImage/> Set Image</button>
      </div>
      <Modal show={showModal} onClose={()=>setShowModal(false)}>
        IMAGE UPLOAD
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  return {
    props: {
      evt,
    },
  };
}
