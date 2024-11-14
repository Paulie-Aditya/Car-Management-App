import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { Car } from '@/types'

export default function Home() {
  const { data: session } = useSession()
  const [cars, setCars] = useState<Car[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (session) {
      fetchCars()
    }
  }, [session])

  const fetchCars = async () => {
    const res = await fetch('/api/cars')
    const data = await res.json()
    setCars(data)
  }

  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <Layout>
      <h1 className="text-center mb-4">Your Cars</h1>
      <input
        type="text"
        placeholder="Search cars..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-input mb-4"
      />
      <Link href="/cars/new" className="btn mb-4">
        Add New Car
      </Link>
      <div className="car-grid">
        {filteredCars.map(car => (
          <div key={car._id} className="car-card">
            <h2 className="car-title">{car.title}</h2>
            <p className="mb-2">{car.description}</p>
            <Link href={`/cars/${car._id}`} className="btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}