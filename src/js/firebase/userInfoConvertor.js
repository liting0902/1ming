export class userAccount {
    /** 
     * @param {string} uid
     * @param {string} email
     * @param {string} phone
     * @param {Date} dateRegistered
     * @param {string} name
     * @param {string} address
    */
    constructor( uid, email, phone, dateRegistered, name, address) {
        this.dateRegistered = dateRegistered;
        this.uid = uid;
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.address = address
    }

}
export var accountConverter = {
    toFirestore: (account) => {
        return {
            dateRegistered: account.dateRegistered,
            uid: account.uid,
            email: account.email,
            phone: account.phone,
            name:account.name,
            address: account.address
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new userAccount(data.uid, data.email, data.phone, data.dateRegistered, data.name, data.address);
    }
};