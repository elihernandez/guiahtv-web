import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../../../../context/UserContext'
import VodContext from '../../../../context/VodContext'
import { getChapters } from '../../../../services/getChapters'
import { PopperMenu } from '../../../../components/PopperMenu'
import { List } from '../../../../components/List'
import { LoaderSpinnerMUI } from '../../../../components/Loader'
import './styles.css'

export function Seasons({ seasons, serieId }) {
      const [chapters, setChapters] = useState()
      const { stateUser } = useContext(UserContext)
      const { dispatchVod } = useContext(VodContext)
      const { credentials } = stateUser
      const [loading, setLoading] = useState(false)
      const textButton = <span>Temporadas&nbsp;&nbsp;&nbsp;<i className='fas fa-caret-down' /></span>
      const itemsMenu = []

      seasons.map(({ Title, TitleSeason }) => {

            const requestData = async () => {
                  try {
                        const response = await getChapters(serieId, TitleSeason, credentials)
                        setChapters({
                              category: Title,
                              poster_type: 1,
                              cmData: response
                        })
                        dispatchVod({ type: 'setSeason', payload: {
                              category: Title,
                              poster_type: 1,
                              cmData: response
                        }})
                        setLoading(false)
                  } catch (e) {

                  }
            }

            const handleClick = (e) => {
                  e.preventDefault()
                  requestData()
                  setLoading(true)
            }

            itemsMenu.push({ title: Title, href: '#', func: handleClick })
      })

      useEffect(() => {
           
      }, [chapters])

      return (
            <div className="seasons-content-wrapper">
                  <div className="seasons-menu">
                        <PopperMenu textButton={textButton} itemsMenu={itemsMenu} />
                  </div>
                  {loading &&
                        <LoaderSpinnerMUI />
                  }
                  {chapters && 
                        <List data={chapters} listType="season" />
                  }
            </div>
      )
}