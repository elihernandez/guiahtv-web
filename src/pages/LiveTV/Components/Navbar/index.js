import React from 'react'
import { Navbar as Links } from '../../../../components/Navbar/index'
import { useRouteMatch } from "react-router-dom"
import { createUrlString } from '../../../../js/String/index'

export function Navbar({ data }) {
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
            <Links navLinks={navLinks} classNavbar="navbar-guide-tv" classItems="guide-tv" />
      )
}