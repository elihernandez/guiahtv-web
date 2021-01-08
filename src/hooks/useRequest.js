import React, { useState } from 'react'

export function useRequest({url}){
      const [loading, setLoading] = useState(false)
      const [data, setData] = useState([])



      return {loading, data}
}