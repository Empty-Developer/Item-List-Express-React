import React from 'react'
import './ListItems.css'

export default function ListItems() {
  const items = [
    {id: 1, title: '1'},
    {id: 2, title: '2'},
    {id: 3, title: '3'},
  ]

  return (
    <div>
      <h2>Items List</h2>
      <div>
        {items.map((items) => (
          <div key={items.id}>
            <div className=''>  
              <p>{items.id}</p>
              <p>{items.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
