const UserType = require('../../types/user')
const getUserInfo = require('../../models/user')

const UserQuery = {
  type: UserType,
  args: {},
  resolve: function (_, args, context) {
    return getUserInfo(context)
  }
}

module.exports = UserQuery
