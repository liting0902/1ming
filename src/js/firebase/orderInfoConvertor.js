export class orderInfo {
    /** 
    
     * @param {string} date
     * @param {number} summary
     * @param {object} orderItem
     * @param {string} orderID
    */
    constructor( date,summary,orderItem,orderID) {
        this.date = date;
        this.summary = summary;
        this.orderItem=orderItem;
        this.orderID = orderID;
    }

}
export var orderInfoConverter = {
    toFirestore: (orderInfo) => {
        return {
            date: orderInfo.date,
            summary: orderInfo.summary,
            orderItem: orderInfo.orderItem,
            orderID:orderInfo.orderID,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new orderInfo(data.date, data.summary, data.orderItem, data.orderID);
    }
};