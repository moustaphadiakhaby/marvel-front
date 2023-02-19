import "./Pagination.css";
import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Pagination = ({ props }) => {
  const { pageCount, setSkip } = props;

  const handlePageClick = (e) => {
    setSkip(e.selected);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
      }}
    >
      <ReactPaginate
        activeClassName={"item active "}
        breakClassName={"item break-me "}
        breakLabel={"..."}
        containerClassName={"pagination"}
        disabledClassName={"disabled-page"}
        marginPagesDisplayed={2}
        nextClassName={"item next "}
        nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18, width: 150 }} />}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        pageClassName={"item pagination-page "}
        pageRangeDisplayed={2}
        previousClassName={"item previous"}
        previousLabel={
          <ArrowBackIosIcon style={{ fontSize: 18, width: 150 }} />
        }
      />
    </div>
  );
};

export default Pagination;
