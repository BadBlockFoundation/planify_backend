//const Op = db.Sequelize.Op;
/**
 * Creates a new User Service.
 * @class
 */
class UserService {

  /**
   * constructor - description
   *
   * @param  {type} User description
   * @return {type}      description
   */
  constructor(User, Bcrypt) {
    this.User = User;
    this.bcrypt = Bcrypt;
  }


  /**
   * async getAll - description
   *
   * @return {type}  description
   */
  async getAll() {
    try {
      console.log('getAll')
      return await this.User.findAll();

    } catch (e) {
      throw e.errors;
    }
  }


  /**
   * async findById - description
   *
   * @param  {type} id description
   * @return {type}    description
   */
  async findById(id) {
    try {
      console.log('findOne Service' + id);
      return await this.User.findByPk(id);
    } catch (e) {
      throw e.errors;

    }
  }

  async createUser(data) {
    try {
      console.log(data)
      const _usr = this.User.build({
        email: data.email,
        password: await this.bcrypt.hash(data.password, 10)
      });
      await _usr.save();
      return _usr;

    } catch (e) {
      throw e.errors;

    }
  }
}

module.exports = UserService;
