import React from 'react'
import { Info } from '../Info'
import { Controls } from '../Controls'
import './styles.css'

export function Content() {
      
      return (
            <div className="content-video">
                  <Info />
                  <Controls />
            </div>
      )
}