import React from 'react'
import './ListItems.css'

export default function ListItems() {
  const items = [
    {id: 1, title: 'item'},
    {id: 2, title: 'item'},
    {id: 3, title: 'item'},
  ]

  return (
    <div>
      <h2 className='title-h2-list-item'>Items List</h2>
      <div>
        {items.map((items) => (
          <div key={items.id}>
            <div className='item-panel-text'>  
              <p>{items.id}</p>
              <p>{items.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
