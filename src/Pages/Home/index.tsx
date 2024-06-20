import blogsApi from '../../apis/blogs'
import { GetListsBlogsParams, RespListsBlogs } from '../../models/blogs'
import useFetch from '../../hooks/useFetch'
import './styled.scss'
import { useState } from 'react'
import BlogsModal from '../../components/modals/BlogsModal'
import CreateBlogModal from '../../components/form/CreateBlogModal'

const defaultListsBlogsParams: GetListsBlogsParams = {
  page: 1,
  offset: 20,
  search: '',
  sort_by: 'created_at',
  sort_direction: 'desc'
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const pages = [];

  const { data: listsBlogs } = useFetch<RespListsBlogs, GetListsBlogsParams>({
    fetcher: blogsApi.getListBlogs,
    params: defaultListsBlogsParams
  })

  console.log(listsBlogs, 'listsBlogs')

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = listsBlogs && listsBlogs.data.items.length > 0 ? Math.ceil(listsBlogs.data.items.length / itemsPerPage) : 1;

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div className='home'>
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <ul className="list-unstyled">
        {listsBlogs?.data.items.map(item => (
          <li key={item.id} className="media">
            <img src={item.image.url} alt={item.title} className='styleImg' />
            <div className="media-body">
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <p>Comments: {item.comments_count}</p>
            </div >
          </li>
        ))}
      </ul>
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-style">
          <li className="page-item">
            <a className="page-link" href="#">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              {pages.map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={page === currentPage ? 'active' : ''}
                >
                  {page}
                </button>
              ))}
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </a>
          </li>
        </ul>
      </nav>
      <button onClick={toggleModal}>Open Modal</button>
      <BlogsModal show={showModal} onClose={toggleModal}>
        <h2>Modal Title</h2>
        <p>This is the content of the modal</p>
        <CreateBlogModal />
      </BlogsModal>
    </div >
  )
}
