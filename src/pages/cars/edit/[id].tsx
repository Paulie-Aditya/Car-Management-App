import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import CarForm from '@/components/CarForm'
import { Car } from '@/types'

export default function EditCar() {
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

  const handleSubmit = async (formData: FormData) => {
    const res = await fetch(`/api/cars/${id}`, {
      method: 'PUT',
      body: formData,
    })

    if (res.ok) {
      router.push(`/cars/${id}`)
    }
  }

  if (!session) {
    return (
      <Layout>
        <p>Please sign in to edit a car.</p>
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
      <h1 className="text-3xl font-bold mb-4">Edit Car</h1>
      <CarForm onSubmit={handleSubmit} initialData={car} />
    </Layout>
  )
}