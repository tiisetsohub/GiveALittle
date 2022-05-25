import React from 'react'
import "../components/SellersTabs.css"

function SellersTabs({allTabs, setAllTabs}) {

//funtion for when a tab is clicked
const handleClick = (tabName) => {
    const tempArr = [...allTabs];
    let currentTab = tempArr.find(tab => tab.tabName == tabName);

    if (!currentTab.active){
        currentTab.active = true;
    }
    for (let i in tempArr){
        let loopTab = tempArr[i];
        if (loopTab.tabName != tabName){
            loopTab.active = false;
        }
    }

    setAllTabs(tempArr);
}


  return (
    <div className='tabs-container'>
        {
            allTabs.map((tab, index) => {
                return (
                    <button key={index} className="tab" style={{backgroundColor: tab.active ? "#9ccc64" : "#e5dacb", width: tab.active ? "500px" : "300px"}}
                    onClick={() => handleClick(tab.tabName)}
                    >{tab.tabName}</button>
                )
            })
        }
    </div>
  )
}

export default SellersTabs