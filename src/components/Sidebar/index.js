import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.css'

function Item({ title, url, icon }) {
	return (
		<NavLink exact to={url} activeClassName="active">
			<li className="list-item">
				<i className={icon} />
				{title}
			</li>
		</NavLink>
	)
}

function List({ title, data }) {
	return (
		<div className="list-section">
			<h3 className="list-title">{title}</h3>
			<ul className="list-menu">
				{
					data.map(({ title, url, icon }) => {
						return <Item key={title} title={title} url={url} icon={icon} />
					})
				}
			</ul>
		</div>
	)
}

export function Sidebar({ classes, links }) {
	const className = `sidebar ${classes}`

	return (
		<div className={className}>
			{
				links.map(({ listTitle, data }) => {
					return <List key={listTitle} title={listTitle} data={data} />
				})
			}
		</div>
	)
}