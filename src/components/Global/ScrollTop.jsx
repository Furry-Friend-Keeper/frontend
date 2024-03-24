import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollTop() {
    const { pathname } = useLocation()

    useLayoutEffect(() => {
        window.scrollTo({ top:0 , behavior: "instant" })
    },[pathname])
  return null;
}

export default ScrollTop