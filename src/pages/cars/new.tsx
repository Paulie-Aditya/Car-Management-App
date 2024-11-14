import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import CarForm from '@/components/CarForm'

export default function NewCar() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const res = await fetch('/api/cars', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      router.push('/')
    }
  }

  if (!session) {
    return (
      <Layout>
        <p>Please sign in to add a new car.</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Add New Car</h1>
      <CarForm onSubmit={handleSubmit} />
    </Layout>
  )
}