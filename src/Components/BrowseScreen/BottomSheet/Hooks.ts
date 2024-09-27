import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getItemsByIds } from '../../../api/userApi'
import { itemCoordsSelector } from '../../../store/Items/selectors'
import { Item } from '../../../store/user/slice'
import { ItemCoord } from '../../../store/Items/slice'

export const useBottomSheet = () => {
  const snapPoints = useMemo(() => ['20%', '50%', '90%'], [])
  const [donationsSelected, setDonationsSelected] = useState(true)
  const itemsCoords = useSelector(itemCoordsSelector)
  const [donations, setDonations] = useState<Item[]>()
  const [startIndexDon, setStartIndexDon] = useState<number>(0)
  const [startIndexReq, setStartIndexReq] = useState<number>(0)
  const [isDonLoading, setIsDonLoading] = useState<boolean>(true)
  const [isReqLoading, setIsReqLoading] = useState<boolean>(true)
  const [requests, setRequests] = useState<Item[]>()
  
  const reqCoords = itemsCoords.filter(item => item.isRequest)
  const donCoords = itemsCoords.filter(item => !item.isRequest)

  const loadDonations = async () => {
    if (startIndexDon > donCoords.length){
        // all items already loaded
        return
    }
    setIsDonLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000)); // to test loader
    let pageOfItemIds =  donCoords.slice(startIndexDon, startIndexDon + 10)
    let itemIds = pageOfItemIds.map((item) => item._id)
    let res = await getItemsByIds(itemIds)
    console.log(res, res.data, res.data.items)
    let data = res.data.items.map((item, i) => {
      return {...item, distance: donCoords[startIndexDon + i].distance}
      
    })
    donations ? setDonations([...donations, ...data]): setDonations([...data])
    setStartIndexDon(startIndexDon + 10)
    setIsDonLoading(false)

  } 

  const loadRequests = async () => {
    if (startIndexReq > reqCoords.length){
        // all items already loaded
        return
    }
    setIsReqLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000)); // to test loader
    let pageOfItemIds =  reqCoords.slice(startIndexReq, startIndexReq + 10)
    let itemIds = pageOfItemIds.map((item) => item._id)
    let res = await getItemsByIds(itemIds)
    let data = res.data.items.map((item, i) => {
      return {...item, distance: reqCoords[startIndexReq + i].distance}
      
    })
    requests ? setRequests([...requests, ...data]): setRequests([...data])
    setStartIndexReq(startIndexReq + 10)
    setIsReqLoading(false)

  } 
  useEffect(() => {
    // load 10 initially
    loadDonations()
    loadRequests()
  }, [])
  
    return {  
      snapPoints, 
      donationsSelected, 
      donations, 
      requests,
      isDonLoading, 
      isReqLoading, 
      setDonationsSelected,
      loadDonations,
      loadRequests 
            }
}