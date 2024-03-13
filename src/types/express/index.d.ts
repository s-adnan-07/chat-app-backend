// Extending the Express Request Object globally

import { UserDocument } from '../../models/user.model'

export {}

declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument
    }
  }
}
