const { User } = require("../../models");

export class UserService {
    static async findByEmail(email : string){
        return await User.findOne({where: { email }})
    }

    static async findById(id: string){
        return await User.findByPk(id)
    }
}
