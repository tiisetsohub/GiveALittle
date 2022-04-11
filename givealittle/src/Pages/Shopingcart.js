import React, { Component } from 'react';
import  { useState } from "react";
import hoodie from './dammydata/hoodie.webp'
import jean from './dammydata/jean.jpg'
import shirt from './dammydata/shirt.jpg'






export class Shopingcart extends Component {
          state = {
                numItems : 0 ,
                totalPrice : 0  ,         // total value of items
                items: [
                  { id: 0 , productname:"shirt" , productimage:shirt , price: 50.00 , size:"XL",color:"blue" ,brand:"nike plain shirt" ,quatity: 1 },
                  { id: 1 , productname:"jersey" , productimage: hoodie , price: 300.00, size:"M",color:"red" ,brand:"addidas winter hoodie" ,quatity: 1 },
                  { id: 2 , productname:"jean" , productimage:jean, price: 500.00,size:"S",color:"white" ,brand:"redbad denim jean" , quatity: 1}
              ] 
            }

          head = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial" ,

          };

 
        //add the quantity for each items
       onPlus = (e) => {
            let id = e
            let index = this.state.items.findIndex((element) => element.id === id);
            this.setState({ quatity: this.state.items[index].quatity++ });  
             console.log(e);
        }
  
        //add all the prices to rendered
         totalPrice = () => {
              let add = 0;
              for (let i = 0; i < this.state.items.length; i++){
                add += this.state.items[i].price;
                }
              return ( <>{add}</>);  
        }
        
      //subtract  quantity for each items
      onMinus = (e) => {
          let id = e
          let index = this.state.items.findIndex((element) => element.id === id);
          if (this.state.items[index].quatity > 0) {
            this.setState({ quatity: this.state.items[index].quatity-- });
          }
      };

          //remove items rendered on screen i.e the user/ customer does'not wants them
          onRemove = (e) => {
            let id = e
            let index = this.state.items.findIndex((element) => element.id === id);
            this.setState({ state: this.state.items.splice(index, 1) });


          };


  

    

  render() {

      return (

            
          
        <div className='container'>
          <h1 style={this.head} > Shopping Cart</h1>
              <p className='wrapitem' >  Products </p>
                {this.state.items.map(({ id, productname ,price ,quatity , productimage , size , color , brand}) => (
                <p key={id}>
                  <img src={productimage}></img>
                  <text className='centre' >
                    <paragraph className='name-text'>
                          size :{size} <br/>
                          color :{color} <br/>
                          brand: {brand} <br/>
                    </paragraph>
                    <text className='name-text'>Quantity :{quatity}
                        <button className='btn-items' onClick={() => this.onMinus(id)} >-</button>
                        <button className='btn-items' onClick={() => this.onPlus(id)} >+</button> R{price}.00
                        <button className='btn-items' onClick={() => this.onRemove(id)} >remove</button>
                    </text>  
                  </text>
                </p>
                ))}
             <h3 className='wrapitem' > Total price :R{this.totalPrice()}.00 </h3>
          <h2>
            <button className='btn' >Continue shopping</button>
            <button className='btn' >Checkout</button>
          </h2>

      </div>

            );
}


}

export default Shopingcart;
