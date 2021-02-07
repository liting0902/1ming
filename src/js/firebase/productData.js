let _ = require('lodash');

import products from '../../../adminData/products.json';

let groupNameToZhTW = {
    mainCourse : "主菜",
    meats:"肉類",
    soups:"湯類",
    stirFired:"快炒",
    coldPlates:"冷盤"
}

export default _(products).groupBy('category').map((arrGroupItem ,groupName) => {
    
    let tempGroupProduct = {
            groupName,
            groupNameZTW: groupNameToZhTW[groupName],
            arrGroupItem
        }
        return tempGroupProduct
    }).value()
