"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationSuperuser = exports.getPaginationNotification = exports.getPaginationLogs = exports.getPaginationComment = exports.getPaginationRepu = exports.getPaginationSales = exports.getPaginationData = exports.getPagination = void 0;
/**---------------------- pagination functions ------------------------ **/
function getPagination(page, size) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
}
exports.getPagination = getPagination;
/** LIST PRODUCT DATA  **/
function getPaginationData(data, page, limit) {
    const currentPage = page ? page + 1 : 1;
    let { count: totalItems, rows: products } = data;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, products, totalPages, currentPage };
}
exports.getPaginationData = getPaginationData;
/** LIST SALES DATA   **/
function getPaginationSales(data, page, limit) {
    const currentPage = page ? page + 1 : 1;
    const { count: totalItems, rows } = data;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, sales: rows, totalPages, currentPage };
}
exports.getPaginationSales = getPaginationSales;
/** LIST REPUTATION DATA   **/
function getPaginationRepu(data, page, limit) {
    const currentPage = page ? page + 1 : 1;
    const { count: totalItems, rows } = data;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, reputation: rows, totalPages, currentPage };
}
exports.getPaginationRepu = getPaginationRepu;
/** LIST COMMENT DATA  **/
function getPaginationComment(data, page, limit) {
    const currentPage = page ? page + 1 : 1;
    const { count: totalItems, rows } = data;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, comments: rows, totalPages, currentPage };
}
exports.getPaginationComment = getPaginationComment;
/** LIST LOGS DATA  **/
function getPaginationLogs(data, page, limit) {
    const currentPage = page ? page + 1 : 1;
    const { count: totalItems, rows } = data;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, logs: rows, totalPages, currentPage };
}
exports.getPaginationLogs = getPaginationLogs;
/** LIST NOTIFICATION DATA  **/
function getPaginationNotification(data, page, limit) {
    const currentPage = page ? page + 1 : 1;
    const { count: totalItems, rows } = data;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, notifications: rows, totalPages, currentPage };
}
exports.getPaginationNotification = getPaginationNotification;
/** LIST SUPERUSERS DATA  **/
function getPaginationSuperuser(data, page, limit) {
    const currentPage = page ? page + 1 : 1;
    const { count: totalItems, rows } = data;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, superusers: rows, totalPages, currentPage };
}
exports.getPaginationSuperuser = getPaginationSuperuser;
/**------------------------------------------------------------------------**/
