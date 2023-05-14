export default class UserDTO {
    getTokenDTO = (user) => {
        return {
            completeName: user.completeName,
            role: user.role,
            userImg: user.userImg,
            email: user.email,
        }
    }
}