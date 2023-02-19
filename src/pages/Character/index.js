import "./Character.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadAnimation from "../../components/LoadAnimation";

const Character = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://site--marvel-back--dl97zr2bcjvg.code.run/comics/${id}`
        );
        setData(response.data);
        setLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  return (
    <div className="Character">
      <div className="character-container">
        {!loading ? (
          <div>
            <div className="char-profile">
              <img
                src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                alt="comic cover"
              />
              <div className="char-profile-txt">
                <span className="char-profile-name">{data.name}</span>
                <p className="char-profile-desc">{data.description}</p>
              </div>
            </div>
            {data.comics.length > 0 && (
              <p className="char-pres">He/she starred in these comics:</p>
            )}
            {Array.isArray(data.comics) &&
              data.comics.map((elem, i) => {
                return (
                  <div key={i} className="char-comic">
                    <div className="char-comic-img">
                      <img
                        key={i}
                        src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                        alt="comic cover"
                      />
                    </div>
                    <div className="char-comic-txt">
                      <p className="char-comic-title">{elem.title}</p>
                      <p className="char-comic-desc">{elem.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="load">
            <LoadAnimation />
          </div>
        )}
      </div>
    </div>
  );
};

export default Character;
