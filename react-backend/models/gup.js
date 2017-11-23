var db = require('../dbconn'); //connection to db

var Gup = {
    /**
     * return all records from gup table
     */
    getAllGups: function (callback) {
        return db.query("select * from gup", callback);
    },

    /**
     * return all records that fit the applied filter in where clause
     */
    getFilteredGups: function (Gup, callback) {
        
        const REGION = '%' + Gup.region + '%';
        const COUNTRY = '%' + Gup.country + '%';
        const BU = '%' + Gup.bu + '%';
        const GUP = '%' + Gup.gup + '%';
        const SITE = '%' + Gup.site + '%';

        return db.query("select * from gup where region like ?" +
            "and country like ?" +
            "and bu like ?" +
            "and gup like ?" +
            "and site like ?" +
            "limit 50",
            [REGION,COUNTRY,BU,GUP,SITE],
            callback);
    },

    /**
     * return one record by given id from gup table
     */
    getGupById: function (id, callback) {
        return db.query("select * from gup where gup_id=?", [id], callback);
    },

    /**
     * insert one record into gup table
     */
    addGup: function (Gup, callback) {
        return db.query("insert into gup (region, country, bu, gup, site, location, contact, bandwidth, pcs)" +
            "values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [Gup.region, Gup.country, Gup.bu, Gup.gup, Gup.site, Gup.location, Gup.contact, Gup.bandwidth, Gup.pcs],
            callback);

    },

    updateGup: function (id, Gup, callback) {
        return db.query("update gup set region=?, country=?, bu=?, gup=?, site=?, location=?, contact=?, bandwidth=?, pcs=? where gup_id=?",
        [Gup.region, Gup.country, Gup.bu, Gup.gup, Gup.site, Gup.location, Gup.contact, Gup.bandwidth, Gup.pcs, id],
        callback);
    },

    /**
     * remove one record from gup table by given id
     */
    removeGup: function (id, callback) {
        return db.query("delete from gup where gup_id=?", [id], callback);
    }
}

module.exports = Gup;