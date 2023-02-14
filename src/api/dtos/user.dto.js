class UserDto {
    constructor(user) {
        this.email = user.email
        this.username = user.username
        this.name = user.name
        this.lastName = user.lastName
        this.age = user.age
    }

    createDto() {
        return this
    }
}

module.exports = UserDto