import React, { useCallback } from 'react'
import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native'
import { useTheme } from '@/Hooks'
import { currency } from '@/Theme/Conversion'

const ListProductComponent = (props: any) => {
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const renderItem = ({ item }) => (
    <View style={Layout.row}>
      <Text
        style={[
          Fonts.textSmall,
          { minWidth: 40, borderWidth: 0.5, textAlign: 'center' },
        ]}
      >
        {item.id}
      </Text>
      <Text
        style={[
          Fonts.textSmall,
          Gutters.regularLPadding,
          { minWidth: 150, borderWidth: 0.5 },
        ]}
      >
        {item.nama}
      </Text>
      <Text
        style={[
          Fonts.textSmall,
          { minWidth: 100, textAlign: 'center', borderWidth: 0.5 },
        ]}
      >
        {item.satuan}
      </Text>
      <Text
        style={[
          Fonts.textSmall,
          Gutters.regularLPadding,
          { minWidth: 100, textAlign: 'left', borderWidth: 0.5 },
        ]}
      >
        {currency(item.hargaSatuan)}
      </Text>
      <Text
        style={[
          Fonts.textSmall,
          { minWidth: 100, textAlign: 'center', borderWidth: 0.5 },
        ]}
      >
        {item.sellerId}
      </Text>
      <Text
        style={[
          Fonts.textSmall,
          Gutters.regularRMargin,
          { minWidth: 200, textAlign: 'center', borderWidth: 0.5 },
        ]}
      >
        {item.deskripsi}
      </Text>
    </View>
  )

  return (
    <View style={[Layout.fill, Gutters.largeTMargin]}>
      <ScrollView horizontal>
        <View style={Layout.column}>
          <View style={Layout.row}>
            <Text
              style={[
                Fonts.textSmall,
                { minWidth: 40, borderWidth: 0.5, textAlign: 'center' },
              ]}
            >
              {'ID'}
            </Text>
            <Text
              style={[
                Fonts.textSmall,
                Gutters.regularLPadding,
                { minWidth: 150, borderWidth: 0.5 },
              ]}
            >
              {'Nama'}
            </Text>
            <Text
              style={[
                Fonts.textSmall,
                { minWidth: 100, borderWidth: 0.5, textAlign: 'center' },
              ]}
            >
              {'Satuan'}
            </Text>
            <Text
              style={[
                Fonts.textSmall,
                { minWidth: 100, textAlign: 'center', borderWidth: 0.5 },
              ]}
            >
              {'Harga satuan'}
            </Text>
            <Text
              style={[
                Fonts.textSmall,
                { minWidth: 100, textAlign: 'center', borderWidth: 0.5 },
              ]}
            >
              {'Seller ID'}
            </Text>
            <Text
              style={[
                Fonts.textSmall,
                { minWidth: 200, textAlign: 'center', borderWidth: 0.5 },
              ]}
            >
              {'Deskripsi'}
            </Text>
          </View>

          {props.data && (
            <FlatList
              data={props.data.data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default ListProductComponent
