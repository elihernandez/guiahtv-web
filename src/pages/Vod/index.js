import React, { useEffect, useContext } from 'react'
import { LoaderSpinner } from '../../components/Loader'
import { useRequest } from '../../hooks/useRequest'
import { VodContextProvider } from '../../context/VodContext'
import VodContext from '../../context/VodContext'

function Catalogue() {
      const { dispatchVod } = useContext(VodContext)
      const { loading } = useRequest('vod', dispatchVod)

      return null
}

export function VideoOnDemand() {

      return (
            <div className="wrapper-vod">
                  <VodContextProvider>
                        <div className="section-content w-padding-top">
                              <Catalogue />
                        </div>
                  </VodContextProvider>
            </div>
      )
}