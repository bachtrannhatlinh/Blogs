import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import blogsApi from "../../apis/blogs";
import { GetListsBlogsParams, RespListsBlogs } from "../../models/blogs";
import useFetch from "../../hooks/useFetch";
import BlogsModal from "../../components/modals/BlogsModal";
import CreateBlogModal from "../../components/form/CreateBlogModal";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/loading-spinner";
import useAppSelector from "../../hooks/useAppSelector";
import { setListsBlog } from "../../feature/ListsBlog/ListsBlogSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import { fetchData } from "../../feature/ListsBlog/ListsBlogAction";
import UpdateBlogModal from "../../components/form/UpdateBlogModal";

import "./styled.scss";

const defaultListsBlogsParams: GetListsBlogsParams = {
  page: 1,
  offset: 20,
  search: "",
  sort_by: "created_at",
  sort_direction: "desc",
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // State cho giá trị tìm kiếm
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");

  const dispatch = useAppDispatch();

  const stateListsBlogs = useAppSelector((state) => state.ListsBlog);
  const status = useAppSelector((state) => state.ListsBlog.status);
  const hasFetchedData = useRef(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleOpenModalUpdate = (id: number) => {
    setOpenModalUpdate(true);
    setIdUpdate(id);
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  const { data: listsBlogs } = useFetch<RespListsBlogs, GetListsBlogsParams>({
    fetcher: blogsApi.getListBlogs,
    params: { ...defaultListsBlogsParams, page: currentPage, sort_by: sortBy, sort_direction: sortDirection },
  });

  useEffect(() => {
    if (listsBlogs?.items) {
      dispatch(setListsBlog({ list: listsBlogs.items }));
      setTotalPages(Math.ceil(listsBlogs.total / defaultListsBlogsParams.offset));
    }
  }, [dispatch, listsBlogs]);

  useEffect(() => {
    if (status === 'succeeded' && !hasFetchedData.current) {
      dispatch(fetchData({ ...defaultListsBlogsParams, page: currentPage, sort_by: sortBy, sort_direction: sortDirection }));
      hasFetchedData.current = true;
    }
  }, [status, dispatch, currentPage, sortBy, sortDirection, hasFetchedData]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBlogs = stateListsBlogs.list.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSortChange = (newSortBy: string) => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortBy(newSortBy);
    setSortDirection(newSortDirection);
    dispatch(fetchData({ ...defaultListsBlogsParams, sort_by: newSortBy, sort_direction: newSortDirection }));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    dispatch(fetchData({ ...defaultListsBlogsParams, page: newPage }));
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  return status === 'loading' || !stateListsBlogs.list ? (
    <LoadingSpinner />
  ): (
    <div className="home">
      <div className="container-md d-flex justify-content-between">
        <form className="form-inline my-2 col-lg-3 d-flex form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <div className="sort-options my-2">
          <button onClick={() => handleSortChange("created_at")} className='btn-sort-date'>
            Sort by Date {sortBy === "created_at" && (sortDirection === "asc" ? "↑" : "↓")}
          </button>
          <button onClick={() => handleSortChange("title")}>
            Sort by Title {sortBy === "title" && (sortDirection === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      <div className="container-md mt-5 block-btn">
        <div className="row gy-3">
          {filteredBlogs.map((item) => (
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
                  <Link to={`/blog/${item.id}`} className="link-detail-page">
                    Blog detail page
                  </Link>
                </button>
                <button className="btn mt-2 btn-secondary link-detail-page" onClick={() => handleOpenModalUpdate(item.id)}>
                  Edit Blog
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BlogsModal show={showModal} onClose={toggleModal}>
        <CreateBlogModal onClose={toggleModal} />
      </BlogsModal>
      <BlogsModal show={openModalUpdate} onClose={handleCloseModalUpdate}>
        <UpdateBlogModal onClose={handleCloseModalUpdate} idUpdate={idUpdate} />
      </BlogsModal>
    </div>
  );
}
