import React from 'react'
import "../components/Filter.css"
import { useState, useEffect } from 'react'
import all from 'all'

const categoryData = [
    {
        categoryName: "Books",
        active: false
    },
    {
        categoryName: "Baby",
        active: false
    },
    {
        categoryName: "Cellphones",
        active: false
    },
    {
        categoryName: "Computers",
        active: false
    },
    {
        categoryName: "DIY",
        active: false
    },
    {
        categoryName: "Electronics",
        active: false
    },
    {
        categoryName: "Fashion",
        active: false
    },
    {
        categoryName: "Groceries",
        active: false
    },
    {
        categoryName: "Media",
        active: false
    },
    {
        categoryName: "Office",
        active: false
    },
    {
        categoryName: "Outdoor",
        active: false
    },
    {
        categoryName: "Wearables",
        active: false
    }]

function Filter({ filterActive, allFilters, setAllFilters }) {

    
    const [categories, setCategories] = useState(categoryData)

    useEffect(() => {
        categories.map((category, index) => {
            if (category.active) {
                const tempArr = [...allFilters, category.categoryName]
                setAllFilters(tempArr)
            }
        })
    }, [categories])

  return (
      <div>
          <div className='filters-container'>
        {categories.map((category, index) => {
            return (
                <div key={index}>
                    {category.active ?
                    <Category  
                    categories={categories} setCategories={setCategories}
                    categoryName={category.categoryName}  
                    />
                    :null
                }
                </div>
            )
        })}
        </div>

        {filterActive ? 
            <div className='filter-container'>
            <h5>Categories</h5>
            <div className='categories-container'>
                {categories.map((category, index) => {
                    return (
                        <Category 
                        key={index} 
                        categories={categories} setCategories={setCategories}
                        categoryName={category.categoryName} 
                        />
                    )
                })}
            </div>
            </div>
            : null
        }
        
      </div>
    
  )
}

function Category({ categories, setCategories, categoryName }) {

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

export default Filter