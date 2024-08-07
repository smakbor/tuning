const usePaginaton = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handlePageChange = (value) => {
    setPage(value);
  };

  return { page, total, handlePageChange };
};
