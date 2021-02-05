import React, { useState, useContext, useEffect } from 'react'
import { CatalogueRadio } from '../../../components/Catalogue'
import { LoaderSpinnerMUI } from '../../../components/Loader'
import RadioContext from '../../../context/RadioContext'
import { useRequest } from '../../../hooks/useRequest'
import { CustomTabs } from '../../../components/Tabs'

export function Guide(){
      const { stateRadio, dispatchRadio } = useContext(RadioContext)
      const { dataRadio } = stateRadio 
      const { loading, data } = useRequest('radio', dispatchRadio, dataRadio)

      useEffect(() => {
            
            return () => {
                 
            }
      }, [])

      return (
            <div className="guide-radio">
                  <LoaderSpinnerMUI text="Cargando..." placementText="bottom" />
                  
            </div>
      )
}
// <CatalogueRadio requestApi="radio"/>