import { Request ,Response} from "express";
import { UserService } from "../service/user.service";
import { errorResponse, successResponse } from "../common/responseHandler";
import { ERRORS } from "../common/constants/errors.constants";
import { HttpStatus } from "../common/constants/httpStatus.enum";

export class UserController{
    private static instance:UserController;
    private userService:UserService;
    public static getInstance():UserController{
        if(!UserController.instance){
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    private constructor(){
        this.userService = UserService.getInstance();
    }
    

    createUser = async (req:Request , res:Response)=>{
        try{
            const user = req.body;
            const newUser = await this.userService.createUser(user);
            return successResponse(HttpStatus.CREATED,res,newUser);
        }catch(error:any){
            return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR,res,ERRORS.BAD_REQUEST);
        }
    }

   

}