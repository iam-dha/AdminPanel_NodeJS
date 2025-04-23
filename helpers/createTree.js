let count = 0;
const createTree = (arr, parentId = "") => {
    let tree = [];
    arr.forEach(item => {
        if(item.parent_id === parentId){
            count++;
            const newItem = item;
            newItem.index = count;
            const children = createTree(arr, item.id);
            if(children.length > 0){
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });

    return tree;
}

module.exports.create = (arr, parentId = "") => {
    count = 0;
    let tree = createTree(arr, parentId = "");
    return tree;
}