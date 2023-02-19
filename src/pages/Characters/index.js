import "./Characters.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../App";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import LoadAnimation from "../../components/LoadAnimation";
import Cookies from "js-cookie";
import Favorite from "@mui/icons-material/Favorite";

const Characters = () => {
  const [data, setData] = useState({});
  const [skip, setSkip] = useState(0);
  const [chars, setChars] = useState({});
  const [pageCount, setPageCount] = useState(0);

  const { search } = useContext(ThemeContext);
  const [value] = useDebounce(search, 500);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://site--marvel-back--dl97zr2bcjvg.code.run/characters?name=${value}&skip=${
            skip * limit
          }&limit=${limit}`
        );
        setData(response.data);
        setPageCount(Math.ceil(response.data.count / limit));
      };
      const cookies = Cookies.get("charsfav");

      if (cookies) {
        setChars(JSON.parse(cookies));
      }
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [value, skip]);

  const limit = 20;

  const props = {
    pageCount: pageCount,
    setSkip: setSkip,
  };

  const handleClickFav = (elem) => {
    const charsCopy = [...chars];

    charsCopy.push({
      type: "character",
      name: elem.name,
      thumbnail: elem.thumbnail,
      id: elem._id,
    });
    console.log(charsCopy);
    Cookies.set("charsfav", JSON.stringify(charsCopy), { expires: 7 });
    setChars(charsCopy);
  };

  return (
    <div className="Characters">
      <div className="characters-container">
        <div className="characters-list">
          {Array.isArray(data.results) ? (
            data.results.map((elem, i) => {
              return (
                <div key={i} className="character-pic">
                  <div
                    className="char-img"
                    onClick={() => {
                      navigate(`/character/${elem._id}`);
                    }}
                  >
                    <img
                      src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                      alt="comic cover"
                    />
                  </div>

                  <div className="char-text">
                    <p className="char-title"> {elem.name}</p>
                    <Favorite
                      onClick={() => {
                        handleClickFav(elem);
                      }}
                      className="fav"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <LoadAnimation />
          )}
        </div>
        <div className="pagination">
          <Pagination props={props} />
        </div>
      </div>
    </div>
  );
};

export default Characters;
