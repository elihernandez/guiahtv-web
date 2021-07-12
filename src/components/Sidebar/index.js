import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.css'

function Button({ title, handleClick, icon }) {
	return (
		<li className="list-item" onClick={handleClick}>
			{icon && (
				<i className={icon} />
			)}
			{title}
		</li>
	)
}

function Link({ title, url, icon }) {
	return (
		<NavLink
			to={url}
			activeClassName="active"
		>
			<li className="list-item">
				{icon && (
					<i className={icon} />
				)}
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
				{data !== null &&
					data.map(({ title, url, handleClick, icon, type }) => {
						if(type === 'link'){
							return <Link key={title} title={title} url={url} icon={icon} />
						}else{
							return <Button key={title} title={title} handleClick={handleClick} icon={icon} />
						}
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