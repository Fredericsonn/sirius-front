import React from 'react'
import { NavLink } from 'react-router-dom';

const links = [
    {id: 1, url: '/', text: 'Home'},
    {id: 2, url: '/about', text: 'About'},
    {id:4, url: '/catalog', text: 'Catalog'},
    {id: 3, url: '/tracer', text: 'My Tracer'},
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