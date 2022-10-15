import { useState } from "react";
import { useEffect } from "react";
import todo from "../images/todo.png";
import './Todo.css';
const getLocalItems = () => {
    let list = localStorage.getItem('lists');

    if(list){
        return JSON.parse(localStorage.getItem('lists'));
        }else{
            return [];
        }
}

const ToDo = () => {

    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items));
        
    }, [items])


    const addItem = () => {
        if(!inputData){
            alert('Please Fill the Data');
        }
        else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem) => {
                    if(elem.id === isEditItem){
                        return { ...elem, name: inputData}
                    }
                    return elem;
                })
            )
                setToggleSubmit(true);

                setInputData('');

                setIsEditItem(null);
        }
        else{
            const allInputData = { id: new Date().getTime().toString(), name: inputData}
            setItems([...items, allInputData]);
            setInputData('');
        }
    }

    const removeItems= (index) =>{
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        })
        setItems(updatedItems);
    }

    const editItems= (id) =>{
        let newEditItem = items.find((elem)=>{
            return elem.id === id;
        })
        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);
    }

    const removeAll = () => {
        setItems([]);
    }

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo" />
                        <figcaption>Add your List Here ✌</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="✍ Add Items..." value={inputData} onChange={(e)=>setInputData(e.target.value)} />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Items" onClick={addItem} ></i> : <i className="far fa-edit add-btn" title="Update Items" onClick={addItem} ></i>
                        }
                    </div>

                    <div className="showItems" >

                        {
                        items.map((Elem)=>{
                            return (
                                <div className="eachItem" key={Elem.id} >
                                    <h3>{Elem.name}</h3>

                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" title="Edit Items" onClick={()=> editItems(Elem.id)} ></i>
                                        <i className="far fa-trash-alt add-btn" title="Delete Items" onClick={()=> removeItems(Elem.id)} ></i>
                                    </div>
                                    
                                </div>
                            )
                        })
                        }

                        
                    </div>

                    <div className="showItems" >                        
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LISt</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDo