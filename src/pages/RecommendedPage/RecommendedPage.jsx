import { nanoid } from "nanoid";
import css from "./RecommendedPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecommendedBooks } from "../../redux/books/operations";

const RecommendedPage = () => {
  const dispatch = useDispatch();
  const { items: data, loading, error } = useSelector((state) => state.books);
  console.log("items", data);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getRecommendedBooks(page));
  }, [dispatch, page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!data || !data.results) return null;

  return (
    <div>
      <div className={css.recommendBox}>
        <div className={css.titleBox}>
          <h2 className={css.title}>Recommended</h2>
          <div className={css.pageBox}>
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              prev
            </button>
            <button
              type="button"
              disabled={page === data.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              next
            </button>
          </div>
        </div>
        <ul className={css.list}>
          {data.results.map((item) => {
            return (
              <li key={item._id} className={css.liItem}>
                <img src={item.imageUrl} alt={item.title} className={css.img} />
                <h3 className={css.titleBook}>{item.title}</h3>
                <h4 className={css.authorBook}>{item.author}</h4>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecommendedPage;
