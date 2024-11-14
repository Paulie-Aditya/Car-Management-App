import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import { Car } from '@/types'
import Link from 'next/link'

export default function CarDetails() {
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query
  const [car, setCar] = useState<Car | null>(null)

  useEffect(() => {
    if (id && session) {
      fetchCar()
    }
  }, [id, session])

  const fetchCar = async () => {
    const res = await fetch(`/api/cars/${id}`)
    const data = await res.json()
    setCar(data)
  }

  const handleDelete = async () => {
    const res = await fetch(`/api/cars/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/')
    }
  }

  if (!session) {
    return (
      <Layout>
        <p>Please sign in to view car details.</p>
      </Layout>
    )
  }

  if (!car) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">{car.title}</h1>
      <p className="mb-4">{car.description}</p>
      <div className="mb-4">
        {car.tags.map(tag => (
          <span key={tag} className="bg-gray-200 px-2 py-1 rounded mr-2">{tag}</span>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {car.images.map((image, index) => (
          <img key={index} src={image} alt={`Car image ${index + 1}`} className="w-full h-auto" />
        ))}
      </div>
      <div className="flex gap-4">
        <Link href={`/cars/edit/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit
        </Link>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </Layout>
  )
}