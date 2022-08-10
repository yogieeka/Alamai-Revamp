import React, { useState } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { useAddSellerMutation } from '@/Services/api'
import { Colors } from '@/Theme/Variables'

const AddSellerComponent = () => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const [addSeller, { isLoading, isSuccess, isError }] = useAddSellerMutation()
  const [nama, setNama] = useState('')
  const [kota, setKota] = useState('')
  const canSaveDataSeller = [nama, kota].every(Boolean) && !isLoading

  const onAddSellerPostClicked = async () => {
    if (canSaveDataSeller) {
      try {
        await addSeller({ nama, kota }).unwrap()
        setNama('')
        setKota('')
        Alert.alert('Sukses', 'Berhasil Menambah Penjual')
      } catch (err) {
        console.error('Failed to add seller: ', err)
        Alert.alert('Terjadi kesalahan', String(err))
      }
    }
  }

  return (
    <View style={[Layout.column, Layout.fill, Gutters.largeTMargin]}>
      <Text style={[Fonts.textSmall]}>{'Silahkan Input Data Seller'}</Text>
      <TextInput
        onChangeText={setNama}
        editable={!isLoading}
        keyboardType={'default'}
        placeholder={'Nama'}
        value={nama}
        style={[Common.textInput]}
      />
      <TextInput
        onChangeText={setKota}
        editable={!isLoading}
        keyboardType={'default'}
        placeholder={'Kota'}
        value={kota}
        style={[Common.textInput]}
      />
      <TouchableOpacity
        style={[
          Common.button.rounded,
          Gutters.regularBMargin,
          Gutters.regularTMargin,
        ]}
        onPress={onAddSellerPostClicked}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={[Fonts.textSmall, Fonts.textColorWhite]}>
            {'Add Seller'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default AddSellerComponent
