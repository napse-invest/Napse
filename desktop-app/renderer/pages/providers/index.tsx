import React from 'react'
import ContextHeader from '@/components/layout/contextHeader'
import Link from 'next/link'
function Next(): JSX.Element {
  const Boxes = [{ name: 'Tom' }, { name: 'Tom' }, { name: 'Tom' }]
  return (
    <ContextHeader isSpace>
      {Boxes.map((box, index) => (
        <>{box.name}</>
      ))}
    </ContextHeader>
  )
}

export default Next
