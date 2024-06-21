import blogsApi from "../../apis/blogs";
import {GetListsBlogsParams, ItemListsBlogs, RespListsBlogs } from "../../models/blogs";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import BlogsModal from "../../components/modals/BlogsModal";
import CreateBlogModal from "../../components/form/CreateBlogModal";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/loading-spinner";
import useAppSelector from "../../hooks/useAppSelector";
import { setListsBlog } from "../../feature/ListsBlog/ListsBlogSlice";
import useAppDispatch from "../../hooks/useAppDispatch";


import "./styled.scss";

const defaultListsBlogsParams: GetListsBlogsParams = {
  page: 1,
  offset: 20,
  search: "",
  sort_by: "created_at",
  sort_direction: "desc",
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch()

  const listsBlogs1 = useAppSelector(state => state.ListsBlog)
  console.log(listsBlogs1, 'listsBlogs1')

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const pages = [];

  const { data: listsBlogs } = useFetch<RespListsBlogs, GetListsBlogsParams>({
    fetcher: blogsApi.getListBlogs,
    params: defaultListsBlogsParams,
  });

  useEffect(() => {
    console.log(listsBlogs?.data.items, 'alo')
    if (listsBlogs?.data?.items) {
      // dispatch(setListsBlog(listsBlogs.data.items));
    }
  }, [dispatch, listsBlogs]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages =
    listsBlogs && listsBlogs.data.items.length > 0
      ? Math.ceil(listsBlogs.data.items.length / itemsPerPage)
      : 1;

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    !listsBlogs ? (
      <LoadingSpinner />
    ) : (
      <div className="home">
        <div className="container-md d-flex justify-content-between">
          <form className="form-inline my-2 col-lg-3 d-flex form">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <div className="my-2">
            <button onClick={toggleModal}>Open Modal</button>
          </div>
        </div>
        <div className="container-md mt-5">
          <div className="row gy-3">
            {listsBlogs?.data.items.map((item) => (
              <div className="col-sm-6 col-md-6 col-lg-3" key={item.id}>
                <img src={item.image.url} className="img-fluid" alt={item.title} />
                <div className="d-grid">
                  <div className="media-body">
                    <h2>{item.title}</h2>
                    <p className="cut-text">{item.content}</p>
                    <p>Comments: {item.comments_count}</p>
                  </div>
                </div>
                <div className="d-grid">
                  <button className="btn mt-2 btn-secondary">
                    <Link to={`/blog/${item.id}`}>Blog detail page</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container-md d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination pagination-style">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {pages.map((page) => (
                <li className="page-item" key={page}>
                  <button
                    className={`page-link ${page === currentPage ? "active" : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <BlogsModal show={showModal} onClose={toggleModal}>
          <h2>Modal Title</h2>
          <p>This is the content of the modal</p>
          <CreateBlogModal onClose={toggleModal} />
        </BlogsModal>
      </div>
    )
  );
  
}
