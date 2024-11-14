import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import Car from '@/models/Car'
import mongoose from 'mongoose'
import clientPromise from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  await clientPromise
  await mongoose.connect(process.env.MONGODB_URI!)

  const { id } = req.query
  const car = await Car.findOne({ _id: id, userId: session.user.id })

  if (!car) {
    return res.status(404).json({ error: 'Car not found' })
  }

  switch (req.method) {
    case 'GET':
      res.status(200).json(car)
      break

    case 'PUT':
      try {
        const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedCar)
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error updating car' })
      }
      break

    case 'DELETE':
      try {
        await Car.findByIdAndDelete(id)
        res.status(200).json({ message: 'Car deleted successfully' })
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error deleting car' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}