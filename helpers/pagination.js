module.exports = (objPagination, query, countProducts) => {
    if(query.page){
        let page = parseInt(query.page);
        if(!isNaN(page) && page >= 1 ){
            objPagination.currentPage = page;
        }
    }

    objPagination.skip = 4 * (objPagination.currentPage - 1);
    objPagination.totalPage = Math.ceil(countProducts/objPagination.limitItems);
    return objPagination;
}