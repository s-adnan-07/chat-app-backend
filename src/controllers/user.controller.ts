import { HttpStatus } from '@nestjs/common'
import { Request, RequestHandler, Response } from 'express'
import GetUserResponse from '../dtos/get-user.dto'
import sendResponse from '../middlewares/sendResponse'
import User from '../models/user.model'
import {
  checkExistingEmail,
  checkExistingUserName,
} from '../middlewares/checkExisting'

export const viewUser: RequestHandler<{}, GetUserResponse> = (req, res) => {
  const { email, username } = req.user
  res.status(HttpStatus.OK).json({ email, username })
}

export const updateUser: RequestHandler<{}, {}, GetUserResponse> = async (
  req,
  res,
) => {
  const messages: string[] = []
  const { email, username } = req.body

  if (email) {
    await checkExistingEmail(email, req)
    req.user.email = email
    messages.push('Email updated')
  }

  if (username) {
    await checkExistingUserName(username, req)
    req.user.username = username
    messages.push('Username updated')
  }

  if (messages.length == 0) {
    req.statusCode = HttpStatus.BAD_REQUEST
    req.statusMessage = 'No values provided'
    throw new Error('Empty update body')
  }

  await req.user.save()
  sendResponse(res, HttpStatus.OK, messages)
}
