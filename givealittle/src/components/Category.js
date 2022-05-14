import React from "react";
import { useState, useEffect } from "react";

export default function Category({ categories, setCategories, categoryName }) {

    //State for active/inactive category
    const [active, setActive] = useState(categories.find(category => category.categoryName == categoryName).active);
    const [categoryColor, setCategoryColor] = useState("#ffffff");


    const handleClick = (categoryName) => {
        const tempArr = [...categories];
        const tempCategory = tempArr.find(category => category.categoryName == categoryName);

        if (tempCategory.active) {
            tempArr.find(category => category.categoryName == categoryName).active = false;  
            setCategories(tempArr)
            setActive(categories.find(category => category.categoryName == categoryName).active) 
        }else {
            tempArr.find(category => category.categoryName == categoryName).active = true; 
            setCategories(tempArr)
            setActive(categories.find(category => category.categoryName == categoryName).active) 
        }
    }


    //useEffect for when a category is clicked
    useEffect(() => {
        if (active) {
            setCategoryColor("#9ccc64");
        }else {
            setCategoryColor("#ffffff");
        }
    }, [active])

  return (
    <button className='category' style={{backgroundColor: categoryColor}} onClick={() => handleClick(categoryName)}>{categoryName}</button>
  )
}