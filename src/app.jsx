import "./index.css";
import data from "./data";
import { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }

    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);

    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div className="section">
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, title, image, quote, name } = person;
          let position = "nextSlide";
          if (index === personIndex) {
            position = "activeSlide";
          }

          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <section className={position}>
              <img className="person-img" src={image} alt={name} />
              <h5 className="title">{name}</h5>
              <p className="job">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="last-icon" />
            </section>
          );
        })}
        <button
          onClick={() => {
            setIndex(index + 1);
          }}
          className="next"
        >
          <FaChevronRight />
        </button>
        <button
          className="prev"
          onClick={() => {
            setIndex(index - 1);
          }}
        >
          <FaChevronLeft />
        </button>
      </div>
    </div>
  );
}

export default App;
