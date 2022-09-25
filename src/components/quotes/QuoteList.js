import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.text > quoteB.text ? 1 : -1;
    } else {
      return quoteA.text < quoteB.text ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isAscending = queryParams.get("sort") === "asc";

  const changeSortingHandler = () => {
    navigate(`/quotes?sort=${isAscending ? "desc" : "asc"}`);
  };

  const sortedQuotes = sortQuotes(props.quotes, isAscending);

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;