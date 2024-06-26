import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const URL = "https://openlibrary.org/works/";
function BookDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        if (data) {
          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;

          const newBook = {
            description: description
              ? description.value
              : "no description Found ",
            title: title,
            coverImg: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : coverImg,
            subject_places: subject_places
              ? subject_places
              : "no Subject Places Found",
            subject_times: subject_times
              ? subject_times
              : "no Subject Times Found",
            subjects: subjects ? subjects : "no Subject Times Found",
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);
  // console.log(book)
  if (loading) return <Loading />;
  return (
    <section className="book-details">
      <div className="contanier">
        <button
          type="button"
          className="flex flex-c back-btn"
          onClick={() => navigate("/book")}
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>

        <div className="book-details-content grid">
          <div className="book-details-img">
            <img src={book?.coverImg} alt="cover img" />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="fw-6 fs-24">{book?.title}</span>
            </div>
            <div className="book-details-item description">
              <span className="fw-6 fs-18">{book?.description}</span>
            </div>
            <div className="book-details-item ">
              <span className="fw-6 ">Subject Places: </span>
              <span className="text-italic">{book?.subject_places}</span>
            </div>
            <div className="book-details-item ">
              <span className="fw-6 ">Subject Times: </span>
              <span className="text-italic">{book?.subject_times}</span>
            </div>
            <div className="book-details-item ">
              <span className="fw-6 ">Subjects: </span>
              <span className="text-italic">{book?.subjects}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetails;
