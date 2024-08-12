import { Request, Response } from "express"
import { authService } from "../services/authService"
import { loginInputType, loginSuccessType } from "../types/authTypes"

export const loginController = async (req: Request<{}, {}, loginInputType>, res: Response<loginSuccessType>) => {
    const accessToken = await authService.login(req.body.loginOrEmail, req.body.password)

    if (!accessToken) {
        res.sendStatus(401)
        return
    }

    const refreshToken = await authService.generateRefreshToken()

    res
        .cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
        .status(200)
        .send({ accessToken })
    return
}