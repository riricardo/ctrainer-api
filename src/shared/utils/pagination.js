const normalizePagination = ({ page = 1, pageSize = 20 } = {}) => {
  const normalizedPage = Math.max(1, Number(page) || 1);
  const normalizedPageSize = Math.min(100, Math.max(1, Number(pageSize) || 20));

  return {
    page: normalizedPage,
    pageSize: normalizedPageSize,
    skip: (normalizedPage - 1) * normalizedPageSize,
    limit: normalizedPageSize,
  };
};

module.exports = {
  normalizePagination,
};
