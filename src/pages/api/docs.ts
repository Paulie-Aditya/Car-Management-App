// import { NextApiRequest, NextApiResponse } from 'next'
// import swaggerJsdoc from 'swagger-jsdoc'

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Car Management API',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./src/pages/api/**/*.ts'],
// }

// const swaggerSpec = swaggerJsdoc(options)

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader('Content-Type', 'application/json')
//   res.send(swaggerSpec)
// }