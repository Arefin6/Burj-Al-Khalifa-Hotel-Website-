import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';

const Bookings = () => {
    const[bookings,setBookings] = useState([]);
    const[loggedInUser,setLoggedInUser] = useContext(userContext);
    useEffect(() =>{
       fetch('http://localhost:5000/bookings?email='+loggedInUser.email,{
           headers:{
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
       })
       .then(res => res.json())
       .then(data => setBookings(data));    
    },[]) 

    return (
        <div>
            <h3>You Have {bookings.length} Bookings</h3>
            {
                bookings.map(book => <li>{book.name} from:{book.checkIn} to:{book.checkOut}  </li>)
            }
        </div>
    );
};

export default Bookings;