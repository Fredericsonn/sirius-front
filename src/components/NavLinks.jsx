import React from 'react'
import { NavLink } from 'react-router-dom';

const links = [
    {id: 1, url: '/', text: 'Home'},
    {id: 2, url: '/about', text: 'About'},
    {id:4, url: '/catalog', text: 'Catalog'},
    {id: 3, url: '/tracer', text: 'My Tracer'},
<<<<<<< HEAD
=======
    {id: 5, url: '/resource', text: 'Resources'}
>>>>>>> 22c8abde6f0ec29fe6b20e0b851b15039b9d511e
];

const NavLinks = () => {
  return (
    <>
      {
        links.map((link) => {
            const {id, url, text} = link;
            return <li key={id}><NavLink to={url}>{text}</NavLink></li>
        })
      }
    </>
  )
}

export default NavLinks;