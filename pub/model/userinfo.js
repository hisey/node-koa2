const mysqlHelper = require('./../db/mysql-helper.js')

const userinfo = {

  /**
   * 增加一条数据
   * @param  {object} args  参数
   * @return {object}       结果
   */
  async add ( args ) {
    let sql = 'INSERT INTO userinfo(UserName, UserPass) VALUES(?, ?)'
    let params = [args.username, args.userpass]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  /**
   * 根据UserName得到一条数据
   * @param  {object} args  参数
   * @return {object}       结果
   */
  async getByUserName( args ){
    let sql = 'SELECT Id, UserName, UserPass FROM userinfo WHERE UserName = ?'
    let params = [args.username]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

   /**
   * 根据UserName得到数量
   * @param  {object} args  参数
   * @return {object}       结果
   */
  async getCountByUserName( args ){
    let sql = 'SELECT COUNT(1) AS UserNum FROM userinfo WHERE UserName = ?'
    let params = [args.username]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

}

module.exports = userinfo