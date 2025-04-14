module.exports = (query) => {
    let objectSearch = {
        keyword: "",
        regex: ""
    }
    if(query.keyword){
        const keyword = query.keyword;
        objectSearch.keyword = keyword;
        const regex = new RegExp(keyword, "i");
        objectSearch.regex = regex;
    }
    else {
        delete objectSearch.regex;
    }
    return objectSearch;
}