var db = require('../dbconn'); //connection to db


var Subnet = {

    /**
     * return all subnets for given GUP id from subnet table
     */
    getGupSubnets: function(id, callback) {
        return db.query('select * from subnet where for_gup_id=?',[id],callback);
    },

    /**
     * create new record in subnet table
     */
    addSubnet: function(Subnet, callback) {
        return db.query('insert into subnet (range_from, range_to, for_gup_id) values (?, ?, ?)',
     [Subnet.range_from, Subnet.range_to, Subnet.for_gup_id], callback);
    },

    /**
     * delete one record from subnet table by given ID
     */
    removeSubnet: function (id, callback) {
        return db.query('delete from subnet where sub_id=?',[id],callback);
    }
}

module.exports = Subnet;