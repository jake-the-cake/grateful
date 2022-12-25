import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className='footer__container'>
      <div className='footer__signature'>
        c.2023 by <a href='http://quietgoatlabs.com' id='qg-link' className='link-clean' target='_blank'>QG Labs</a>
      </div>
      <div className='footer__links'>
        <Link className='footer__link' to='/grateful'>Contact</Link>
        <Link className='footer__link' to='/grateful'>About</Link>
        <Link className='footer__link' to='/grateful'>Privacy</Link>
        <Link className='footer__link' to='/'>Terms</Link>
      </div>
    </div>
  )
}