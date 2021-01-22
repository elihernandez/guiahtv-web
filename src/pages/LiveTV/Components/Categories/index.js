import React from 'react'
import { useRouteMatch } from "react-router-dom"
import { Navbar } from '../../../../components/Navbar/index'
import { createUrlString } from '../../../../js/String/index'
import './styles.css'

export function Categories({ data }) {
      let navLinks = []
      let { url } = useRouteMatch()

      data.map(({ category }) => {
            let href = createUrlString(category)
            let links = {
                  title: category,
                  href: `${url}/${href}`,
                  icon: ''
            }
            navLinks.push(links)
      })

      return (
            <Navbar navLinks={navLinks} classNavbar="navbar-guide-tv" classItems="guide-tv" />
      )
}