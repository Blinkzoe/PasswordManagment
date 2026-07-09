import { UserRepository } from "../repositories/user.repository.js";
import { generateToken } from "../utils/jwt.js";
import { AppError } from "../errors/app-error.js";


export class AuthService {


    private userRepository = new UserRepository();



    public login(
        username: string,
        password: string
    ) {


        const user =
            this.userRepository.findByUsername(username);



        if (!user) {

            throw new AppError(
                "Invalid credentials",
                401
            );

        }



        if (user.password !== password) {

            throw new AppError(
                "Invalid credentials",
                401
            );

        }



        const token = generateToken({

            userId: user.id

        });



        return {
            token
        };

    }

}