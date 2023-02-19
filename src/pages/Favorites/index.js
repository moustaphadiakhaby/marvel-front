import "./Favorites.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Clear from "@mui/icons-material/Clear";

const Favorites = () => {
  const [chars, setChars] = useState({});
  const [comic, setComic] = useState({});

  useEffect(() => {
    const charsCook = Cookies.get("charsfav");
    if (charsCook) {
      const objChars = JSON.parse(charsCook);
      setChars(objChars);
    }

    const comicCook = Cookies.get("comicfav");
    if (comicCook) {
      const objComic = JSON.parse(comicCook);
      setComic(objComic);
    }
  }, []);

  const handleComicFav = (i) => {
    const comicCopy = [...comic];
    comicCopy.splice(comicCopy.indexOf(comicCopy[i]), 1);
    console.log(comicCopy[i]);
    Cookies.set("comicfav", JSON.stringify(comicCopy));
    setComic(comicCopy);
  };

  const handleCharFav = (i) => {
    const charsCopy = [...chars];
    charsCopy.splice(charsCopy.indexOf(charsCopy[i]), 1);
    console.log(charsCopy[i]);
    Cookies.set("charsfav", JSON.stringify(charsCopy));
    setChars(charsCopy);
  };

  console.log(comic);

  return (
    <div className="Favorites">
      <div className="favorites-container">
        {Array.isArray(chars) &&
          chars.map((elem, i) => {
            return (
              <div className="chars-cookies" key={i}>
                <Clear onClick={handleCharFav} />
                <div className="chars-cookies-img">
                  <img
                    key={i}
                    src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                    alt="comic cover"
                  />
                </div>
                <div className="chars-cookies-txt">
                  <p className="chars-cookies-title">{elem.name}</p>
                </div>
              </div>
            );
          })}
        {Array.isArray(comic) &&
          comic.map((elem, i) => {
            return (
              <div key={i} className="comic-cookies">
                <Clear onClick={handleComicFav} />
                <div className="comic-cookies-img">
                  <img
                    key={i}
                    src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                    alt="comic cover"
                  />
                </div>
                <div className="comic-cookies-txt">
                  <p className="comic-cookies-title">{elem.title}</p>
                  <p className="comic-cookies-desc">{elem.description}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Favorites;
