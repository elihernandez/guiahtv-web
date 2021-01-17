import React , { useState, useRef, useContext, useEffect } from 'react'
import LiveTvContext from '../../../../context/LiveTvContext'
import UserContext from '../../../../context/UserContext'
import { useRequest } from '../../../../hooks/useRequest'
import { Categories } from '../Categories/index'
import { Navbar } from '../Navbar/index'
import GuideLoader from '../ContentLoader/Guide'
import { getLiveTV } from '../../../../services/getLiveTV'
const cssTransition = require('css-transition')
import './styles.css'


export function Guide() {
      const { data, setData } = useContext(LiveTvContext)
      const { userAuth } = useContext(UserContext)
      // const [guideActive, setGuideActive] = useState(true)
      const refChannels = useRef()
      const guideRef = useRef()

      const handleClickLeft = () => {
            cssTransition(refChannels.current, {
                  transform: 'translate3d(0%, 0, 0)'
            }, 300, function () {
            })
      }

      const handleClickRight = () => {
            cssTransition(refChannels.current, {
                  transform: 'translate3d(-100%, 0, 0)'
            }, 300, function () {
            })
      }
      
      useEffect(() => {
            // console.log("se agrego listener")
            // document.addEventListener("keydown", (e) => {
            //       if(guideActive){
            //             setGuideActive(false)
            //       }else{
            //             setGuideActive(true)
            //       }
            // })
            if(userAuth){
                  let topMenu = document.querySelector('.top-menu')
                  topMenu.classList.add('bgcolor')
                  const requestData = async () => {
                        try{
                              const response = await getLiveTV(userAuth)
                              if(!response.length) throw new Error('No se pudo obtener la información.')
                              setData(response)
                        }catch(e){
                              console.log(e)
                        }
                  }
                  
                  requestData()
            }


            // return () => {
            //       console.log("se quito listener")
            //       document.removeEventListener("keydown", () => {
            //             setData(null)
            //       })
            // }
      }, [userAuth])

      return (
            <div className="guide" ref={guideRef}>
                  {     data
                  ?     <div className="guide-wrapper">
                              <Navbar data={data} />
                              <Categories refer={refChannels} />
                              <div className="direction-prev" onClick={handleClickLeft}>
                                    <i className="fas fa-chevron-left"></i>
                              </div>
                              <div className="direction-next" onClick={handleClickRight}>
                                    <i className="fas fa-chevron-right"></i>
                              </div>
                        </div>
                  :     <GuideLoader />
                  }
            </div>
      )
}