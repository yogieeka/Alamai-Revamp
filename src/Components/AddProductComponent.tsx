import React, { useState } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { useAddProductMutation } from '@/Services/api'
import { Colors } from '@/Theme/Variables'

const AddProductComponent = () => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const [addProduct, { isLoading, isSuccess, isError }] =
    useAddProductMutation()
  const [sellerId, setSellerID] = useState('')
  const [nama, setNama] = useState('')
  const [satuan, setSatuan] = useState('')
  const [hargaSatuan, setHargaSatuan] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const canSaveDataSeller =
    [sellerId, nama, satuan, hargaSatuan, deskripsi].every(Boolean) &&
    !isLoading

  const onAddProductPostClicked = async () => {
    if (canSaveDataSeller) {
      try {
        await addProduct({
          sellerId,
          nama,
          satuan,
          hargaSatuan,
          deskripsi,
        }).unwrap()
        setSellerID('')
        setNama('')
        setSatuan('')
        setHargaSatuan('')
        setDeskripsi('')
        Alert.alert('Sukses', 'Berhasil Menambah Produk')
      } catch (err) {
        console.error('Failed to add product: ', err)
        Alert.alert('Terjadi kesalahan', String(err))
      }
    }
  }

  return (
    <ScrollView style={[Layout.column, Layout.fill, Gutters.largeTMargin]}>
      <Text style={[Fonts.textSmall]}>{'Silahkan Input Data Produk'}</Text>
      <TextInput
        onChangeText={setSellerID}
        editable={!isLoading}
        keyboardType={'numeric'}
        placeholder={'SellerId (1)'}
        value={sellerId}
        style={[Common.textInput]}
      />
      <TextInput
        onChangeText={setNama}
        editable={!isLoading}
        keyboardType={'default'}
        placeholder={'Nama (Jess)'}
        value={nama}
        style={[Common.textInput]}
      />
      <TextInput
        onChangeText={setSatuan}
        editable={!isLoading}
        keyboardType={'numeric'}
        placeholder={'Satuan (1)'}
        value={satuan}
        style={[Common.textInput]}
      />
      <TextInput
        onChangeText={setHargaSatuan}
        editable={!isLoading}
        keyboardType={'numeric'}
        placeholder={'Harga Satuan (10000)'}
        value={hargaSatuan}
        style={[Common.textInput]}
      />
      <TextInput
        onChangeText={setDeskripsi}
        editable={!isLoading}
        keyboardType={'default'}
        placeholder={'Deskripsi (Alpukat mentega)'}
        value={deskripsi}
        style={[Common.textInput]}
      />
      <TouchableOpacity
        style={[
          Common.button.rounded,
          Gutters.regularBMargin,
          Gutters.regularTMargin,
        ]}
        onPress={onAddProductPostClicked}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={[Fonts.textSmall, Fonts.textColorWhite]}>
            {'Add Product'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  )
}

export default AddProductComponent
