import React from 'react'
import ContactCard from '../components/ContactCard'
import Navigation from '../components/HomeNavBar';
import { useState, useEffect } from 'react';
import HomeNavBar from '../components/HomeNavBar';

export default function () {

  const [contacts, setContacts] = useState([
    {
      name: "Brian Makhubele",
      email: "2113525@students.wits.ac.za",
      color: "#FAEBD7"
    },
    {
      name: "Motheo Tsirwe",
      email: "2329751@students.wits.ac.za",
      color: "#D4CFB4"
    },
    {
      name: "Thulasizwe Sabela",
      email: "2140615@students.wits.ac.za",
      color: "#ABB596"
    },
    {
      name: "Aubrey Nalane",
      email: "2167773@students.wits.ac.za",
      color: "#7F9C7E"
    },
    {
      name: "Zukisa Moto",
      email: "2340955@students.wits.ac.za",
      color: "#50836C"
    },
    {
      name: "Tshepiso Mahoko",
      email: "2352695@students.wits.ac.za",
      color: "#FAEBD7"
    },
    {
      name: "Pamela Segana",
      email: "2265335@students.wits.ac.za",
      color: "#9DBCB1"
    },
    {
      name: "Tiisetso Mojalefa",
      email: "2369718@students.wits.ac.za",
      color: "#80cbc4"
    }
  ]);

  return (
    <div>
        <HomeNavBar/>
        <h2 style={{display: "flex", justifyContent: "center"}}>Developers</h2>
        <div className='all-contacts-container'>
          {contacts.map((contact, index) => {
            return (
              <ContactCard key={index} name={contact.name} email={contact.email} color={contact.color}/>
            )
          })}
        </div>
        
    </div>
  )
}
