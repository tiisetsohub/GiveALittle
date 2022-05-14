import React from 'react'
import "../components/Filter.css"
import { useState, useEffect } from 'react'
import Category from './Category'

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
        categoryName: "Sports",
        active: false
    },
    {
        categoryName: "Wearables",
        active: false
    }]

function Filter({ filterActive, allFilters, setAllFilters, allCategories, Books, Baby, Cellphones, Computers, DIY, Electronics, Fashion, Groceries, Media, Office, Outdoor, Sports, Wearables }) {

    
    const [categories, setCategories] = useState(categoryData)
    let allCategoryArrays = [Books, Baby, Cellphones, Computers, DIY, Electronics, Fashion, Groceries, Media, Office, Outdoor, Sports, Wearables]


    useEffect(() => {
        categories.map((category, index) => {
            if (category.active) {
                const tempArr = [...allFilters, {
                    filterName: category.categoryName,
                    filterProducts: allCategoryArrays[allCategories.indexOf(category.categoryName)]
                }]
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

export default Filter