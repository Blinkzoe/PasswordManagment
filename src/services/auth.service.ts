import { UserRepository } from "../repositories/user.repository.js";
import { generateToken } from "../utils/jwt.js";
import { AppError } from "../errors/app-error.js";
import {comparePassword} from "../utils/password.js";

export class AuthService {


    private userRepository = new UserRepository();



    public async login(
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



        const isPasswordValid = await comparePassword(
            password,
            user.password
        );

        if (!isPasswordValid) {

            throw new AppError(
                "Invalid credentials",
                401
            );
        }



        const token = generateToken({

            userId: user.id,
            role: user.role

        });



        return {
            token
        };

    }

}