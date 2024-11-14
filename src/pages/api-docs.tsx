import dynamic from 'next/dynamic'
import Layout from '@/components/Layout'
import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false })

export default function ApiDocs() {
  return (
    <Layout>
      <SwaggerUI url="/api/docs" />
    </Layout>
  )
}