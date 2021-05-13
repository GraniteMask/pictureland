// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initDB from '../../helpers/initDB'

initDB()

export default (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}
