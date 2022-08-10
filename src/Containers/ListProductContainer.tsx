import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useTheme } from '@/Hooks'
import AddProductComponent from '@/Components/AddProductComponent'
import ListProductComponent from '@/Components/ListProductComponent'
import { useLazyGetListProductBySellerIdQuery } from '@/Services/api'

const ListProductContainer = () => {
  const { Gutters, Layout } = useTheme()
  const [sellerId, setSellerId] = useState(1)
  const [
    getListProductBySellerId,
    { data, isSuccess, isLoading, isFetching, error },
  ] = useLazyGetListProductBySellerIdQuery()

  useEffect(() => {
    getListProductBySellerId(sellerId)
  }, [])

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    >
      <View>
        <ListProductComponent data={data} />
      </View>
    </ScrollView>
  )
}

export default ListProductContainer
