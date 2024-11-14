import { useState } from 'react'
import { Car } from '@/types'

type CarFormProps = {
  onSubmit: (formData: FormData) => Promise<void>
  initialData?: Car
}

export default function CarForm({ onSubmit, initialData }: CarFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [tags, setTags] = useState(initialData?.tags.join(', ') || '')
  const [images, setImages] = useState<File[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('tags', tags)
    images.forEach((image, index) => {
      formData.append(`image${index}`, image)
    })

    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-textarea"
        />
      </div>
      <div className="form-group">
        <label htmlFor="tags" className="form-label">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="images" className="form-label">
          Images
        </label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
          className="form-input"
        />
      </div>
      <button type="submit" className="btn">
        {initialData ? 'Update Car' : 'Add Car'}
      </button>
    </form>
  )
}