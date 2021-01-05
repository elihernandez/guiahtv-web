import React, { useEffect, useState } from 'react'
import getButtonsMenu from '../../services/getButtonsMenu'
import { Focusable, FocusableSection } from 'react-js-spatial-navigation'
import './styles.css'

function Button({data, index}){
    if(index !== 3){
        return (
            <div className="item-button focusable">
                <img src={data.PosterCardUrlLandscape}></img>
                <h3 className="title-section">{data.titulo}</h3>
            </div>
        )
    }

    return ''
}

export default function ButtonsMenu(){
    const [buttons, setButtons] = useState(null)

    useEffect(() => {
        getButtonsMenu().then(buttons => {
            setButtons(buttons)

            Array.from(document.getElementsByClassName("item-button")).forEach(
                function(element) {
                    element.addEventListener('sn:willmove', function(){
                        console.log('Will move')
                    })
                }
            );
        })
    }, [])

    return (
        <>
            {
                buttons 
                ?  <div className="buttons">
                    {
                        buttons.map((item, index) => (
                            <Button key={item.orden} data={item} index={index} />
                        ))
                    }
                    </div>
                :   ''
            }
        </>
    )
}
