import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items, onItemFormSubmit }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("")
  // const [currentItems, setCurrentItems] = useState(items)
  const [newItem, setNewItem] = useState({
    id: uuid(),
    name: "",
    category: "Produce",
  })

  // function handleFormChange(event) {

  //   const name = event.target.name
  //   const value = event.target.value
  //   setNewItem({
  //     ...newItem,
  //     [name]: value
  //   })
  // }


  function handleSearchChange(e) {
    e.preventDefault()
    setSearch(e.target.value)
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory
  }).filter((item) => (
    item.name.includes(search))
  )

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter search={search} onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
