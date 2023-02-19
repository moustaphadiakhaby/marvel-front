import "./Comics.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../App";
import { useDebounce } from "use-debounce";
import Pagination from "../../components/Pagination";
import LoadAnimation from "../../components/LoadAnimation";
import Favorite from "@mui/icons-material/Favorite";
import Cookies from "js-cookie";

const Comics = () => {
  const [data, setData] = useState({});
  const [skip, setSkip] = useState(0);
  const [comic, setComic] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const { search } = useContext(ThemeContext);
  const [value] = useDebounce(search, 500);
  const limit = 40;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://site--marvel-back--dl97zr2bcjvg.code.run/comics?title=${value}&skip=${
            skip * limit
          }&limit=${limit}`
        );
        setPageCount(Math.ceil(response.data.count / limit));
        setData(response.data);
      };
      const cookies = Cookies.get("comicfav");

      if (cookies) {
        setComic(JSON.parse(cookies));
      }
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [value, skip]);

  console.log(comic);

  const handleClickFav = (elem) => {
    const comicCopy = [...comic];

    comicCopy.push({
      type: "comic",
      title: elem.title,
      thumbnail: elem.thumbnail,
      desc: elem.description,
      id: elem._id,
    });
    console.log(comicCopy);
    Cookies.set("comicfav", JSON.stringify(comicCopy), { expires: 7 });
    setComic(comicCopy);
  };

  const props = {
    pageCount: pageCount,
    setSkip: setSkip,
  };

  return (
    <div className="Comics">
      <div className="comics-container">
        <div className="comic-list">
          {Array.isArray(data.results) ? (
            data.results.map((elem, i) => {
              return (
                <div key={i} className="comicbook">
                  <div className="comic-img">
                    <img
                      src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                      alt="comic cover"
                    />
                    <div className="comic-text">
                      <p className="comic-desc">{elem.description}</p>
                    </div>
                  </div>

                  <div className="comic-bot">
                    <p className="comic-title">{elem.title}</p>
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
        <div className="pagination">{<Pagination props={props} />}</div>
      </div>
    </div>
  );
};

export default Comics;
