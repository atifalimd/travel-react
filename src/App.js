import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];


export default function App(){

    const[items, setItems] = useState([])

    function handleAddItems(item){
        setItems(items=>([...items, item]))
    }

    function handleDeleteItem(id){
        setItems(items=>
            items.filter(item=>
                item.id!==id))
    }

    function handleToggleItem(id){
        setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
    }

    return(
        <div className="app">
            <Logo/>
            <Form onAddItems={handleAddItems} />
            <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}/>
        </div>
    )
}


function Logo(){
    return(
        <div className="logo">
            <h1>🏝️ Far Away 💼 </h1>
        </div>
    )
}


function Form({onAddItems}){
    const [quantity, setQuantity] = useState(1)
    const [description, setDescription] = useState('')
    function handleSubmit(e){
        e.preventDefault()
    const newItem = {description, quantity, packed:false, id:Date.now()}
    onAddItems(newItem)
    if (!setDescription) return ;
    setDescription('')
    setQuantity(1)
    }
    return(
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Things to pack for the 😍 Trip</h3>
            <select value={quantity} onChange={(e)=>setQuantity(e.target.value)}>
                {Array.from({length:10},(_,i)=>i+1).map((num)=>(
                    <option>{num}</option>))}
            </select>
            <input type="text" placeholder="item..."
            value={description}
            onChange={(e)=>setDescription(e.target.value)}/>
            <button>Add</button>
        </form>
    )
}


function PackingList({items, onDeleteItem, onToggleItem}){
    return(
        <div className="list">
            <ul>
                {items.map(eachItem=>(
                    <Items eachItem={eachItem} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>
                ))}
            </ul>
        </div>
    )
}

function Items({eachItem, onDeleteItem, onToggleItem}){
    return(
        <li>
            <input type="checkbox" onChange={()=>onToggleItem(eachItem.id)}/>
            <span style={eachItem.packed ? {textDecoration:"line-through"}:{}}>
                {eachItem.quantity}  {eachItem.description}
            </span>
            <button onClick={()=>(onDeleteItem(eachItem.id))}>❌</button>
        </li>
    )
}
