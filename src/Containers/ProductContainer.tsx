import React from 'react'
import { View, ScrollView } from 'react-native'
import { useTheme } from '@/Hooks'
import AddProductComponent from '@/Components/AddProductComponent'

const ProductContainer = () => {
  const { Gutters, Layout } = useTheme()
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
        <AddProductComponent />
      </View>
    </ScrollView>
  )
}

export default ProductContainer
