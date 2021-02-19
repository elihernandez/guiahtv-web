import React, { useEffect, useState } from 'react'
import { getButtonsMenu } from '../../services/getButtonsMenu'
import { H6 } from '../Typography'
import { imgSourceSetPng } from '../../js/Image'
import { useHistory } from "react-router-dom"
import './styles.css'

function Button({title, contentType, img}){
    const history = useHistory()
    const altImg = `${contentType}-image`

    const handleClick = () => {
        switch(contentType){
            case 'leon_livetv':
                history.push('/tv')
                break
            case 'leon_movies':
                history.push('/alacarta')
                break
            case 'leon_radio':
                history.push('/radio')
                break
            case 'leon_music':
                history.push('/musica')
                break
            case 'leon_kids':
                history.push('/zonakids')
                break
            default:
                break
        }
    }
    
    return (
        <li className="item-button focusable" onClick={handleClick}>
            <picture>
                <source srcSet={img} type="image/webp" />
                <source srcSet={imgSourceSetPng(img, 'png')} type="image/png" />
                <img src="build/assets/images/logos/guiahtv/error-tv-landscape.png" alt="Image-tv-fallback" className="image-button" />
            </picture>
            <H6 className="title-button title-2">{title}</H6>
        </li>
    )

}

export function ButtonsMenu(){
    const [buttons, setButtons] = useState(null)

    useEffect(() => {
        const requestButtons = async () => {
            try{
                const response = await getButtonsMenu()
                if(response.length == 1) throw new Error('No se pudo obtener la información.')
                setButtons(response)

                // Array.from(document.getElementsByClassName("item-button")).forEach(
                //     function(element) {
                //         element.addEventListener('sn:willmove', function(){
                //             console.log('Will move')
                //         })
                //     }
                // )
            }catch(e){
                console.log(e)
            }
        }

        requestButtons()
    }, [])

    return (
        <div className="buttons-sections">
            {buttons &&  
                <ul className="buttons-list">
                    {
                        buttons.map(({titulo, ContentType, PosterCardUrlLandscape}) => {
                            if(ContentType != 'leon_music'){
                                return <Button 
                                    key={ContentType}
                                    title={titulo}
                                    contentType={ContentType}
                                    img={PosterCardUrlLandscape}
                                /> 
                            }
                        }
                        )
                    }
                </ul>
            }
        </div>
    )
}
