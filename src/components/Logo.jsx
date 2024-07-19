import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBlog} from '@fortawesome/free-solid-svg-icons'

function Logo({width = '100px'}) {
  return (
    <div className={`${width} hover:animate-bounce`}>
      <FontAwesomeIcon size='2xl' style={{color: 'var(--logo-color)'}} icon={faBlog} />
    </div>
  )
}

export default Logo