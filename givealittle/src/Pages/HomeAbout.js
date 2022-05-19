import React, { useContext } from 'react';
import HomeNavBar from '../components/HomeNavBar';
import Navigation from '../components/HomeNavBar';
import { NameContext, LoginContext, CartContext } from '../Context'

export default function HomeAbout() {
    const { name, setName } = useContext(NameContext)

    const today = new Date();

    return (
        <div>
            <HomeNavBar/>
            <h3 className='about_details'>
                About Us 
            </h3>
            <br/>
            <h6>
                GiveALittle is an Online MarketPlace similar to takealot for both Buyers
                and Sellers which allows
                them to buy products or goods they need online OR sell the items they want to sell,
                meaning they can be both a buyer and the seller at the same time.
            </h6>
        </div>
    )
}