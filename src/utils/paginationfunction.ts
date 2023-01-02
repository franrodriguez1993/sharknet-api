/**---------------------- pagination functions ------------------------ **/
export function getPagination(page: number, size: number) {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
}

/** LIST PRODUCT DATA  **/
export function getPaginationData(data: any, page: number, limit: number) {
  const currentPage = page ? page + 1 : 1;
  let { count: totalItems, rows: products } = data;
  totalItems = totalItems - 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, products, totalPages, currentPage };
}

/** LIST SALES DATA   **/
export function getPaginationSales(data: any, page: number, limit: number) {
  const currentPage = page ? page + 1 : 1;
  const { count: totalItems, rows } = data;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, sales: rows, totalPages, currentPage };
}

/** LIST REPUTATION DATA   **/
export function getPaginationRepu(data: any, page: number, limit: number) {
  const currentPage = page ? page + 1 : 1;
  const { count: totalItems, rows } = data;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, reputation: rows, totalPages, currentPage };
}

/** LIST COMMENT DATA  **/
export function getPaginationComment(data: any, page: number, limit: number) {
  const currentPage = page ? page + 1 : 1;
  const { count: totalItems, rows } = data;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, comments: rows, totalPages, currentPage };
}

/** LIST LOGS DATA  **/
export function getPaginationLogs(data: any, page: number, limit: number) {
  const currentPage = page ? page + 1 : 1;
  const { count: totalItems, rows } = data;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, logs: rows, totalPages, currentPage };
}

/** LIST NOTIFICATION DATA  **/
export function getPaginationNotification(
  data: any,
  page: number,
  limit: number
) {
  const currentPage = page ? page + 1 : 1;
  const { count: totalItems, rows } = data;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, notifications: rows, totalPages, currentPage };
}

/** LIST SUPERUSERS DATA  **/
export function getPaginationSuperuser(data: any, page: number, limit: number) {
  const currentPage = page ? page + 1 : 1;
  const { count: totalItems, rows } = data;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, superusers: rows, totalPages, currentPage };
}

/**------------------------------------------------------------------------**/
