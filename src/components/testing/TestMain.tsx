import React, { useState } from 'react'
import ImageUpload from '@/utils/ImageUpload';

interface Image {
  url: string;
}
const TestMain = () => {
  const [field, setField] = useState<Image[]>([]);
  return (
    <div>
      <ImageUpload
        value={field.map((image) => image.url)}
        onChange={(url: any) => setField([...field, { url }])}
        onRemove={(url: any) => setField(field.filter((current) => current.url !== url))}
      />
    </div>
  )
}

export default TestMain