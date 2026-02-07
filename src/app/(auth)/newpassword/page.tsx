import NewPassword from '@/features/auth1/component/NewPassword'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPassword />
    </Suspense>
  )
}

export default page