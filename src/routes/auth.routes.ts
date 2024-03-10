import express from 'express'
import { login, register } from '../controllers/auth.controller'
import expressAsyncHandler from 'express-async-handler'

const authRoutes = express.Router()

authRoutes.post('/register', expressAsyncHandler(register))

authRoutes.post('/login', expressAsyncHandler(login))

export default authRoutes
