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

  switch (req.method) {
    case 'GET':
      try {
        const cars = await Car.find({ userId: session.user.id })
        res.status(200).json(cars)
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching cars' })
      }
      break

    case 'POST':
      try {
        const car = new Car({
          ...req.body,
          userId: session.user.id,
        })
        await car.save()
        res.status(201).json(car)
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error creating car' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}