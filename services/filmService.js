const { postgresConnection } = require('../DBConnection');
const {QueryTypes} = require("sequelize");
class FilmService {
    static async getFilmByName(title){
        try {
            return await postgresConnection.query('SELECT * FROM film WHERE title=:title LIMIT 1', {
                replacements: {title},
                type: QueryTypes.SELECT,
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports.FilmService = FilmService;