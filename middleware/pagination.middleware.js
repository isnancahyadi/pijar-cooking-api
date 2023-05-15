const paginate = (req, data) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let result = {};

  if (startIndex > 0) {
    result.prev = page - 1;
  }

  if (endIndex < data.length) {
    result.next = page + 1;
  }

  return (result = {
    ...result,
    current: page,
    metadata: data.slice(startIndex, endIndex),
  });
};

module.exports = paginate;
