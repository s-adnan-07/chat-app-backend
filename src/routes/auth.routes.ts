import express from 'express'
import { login, logout, register } from '../controllers/auth.controller'
import expressAsyncHandler from 'express-async-handler'

const authRoutes = express.Router()

authRoutes.post('/register', expressAsyncHandler(register))

authRoutes.post('/login', expressAsyncHandler(login))

authRoutes.post('/logout', logout)

export default authRoutes
