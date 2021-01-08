import { useState, useEffect } from 'react'

export function useRequest(){
      const [loading, setLoading] = useState(false)
      const [data, setData] = useState([])

      // useEffect(() => {
      //       setLoading(true)
      //       setTimeout(() =>{
      //             setLoading(false)
      //       }, 3000)
      // }, [])

      return {loading, data}
}