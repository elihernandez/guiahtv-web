import React from 'react'
import { InfoSerie } from '../../components/InfoContent'
import { TabsContent } from './components/Tabs'

export function ContentSerie({data}){
      const { ContentTypeOrder } = data

      return (
            <div className="serie-info info-wrapper">
                  <InfoSerie data={data}/>
                  <TabsContent serieId={ContentTypeOrder} />
            </div>
      )
}