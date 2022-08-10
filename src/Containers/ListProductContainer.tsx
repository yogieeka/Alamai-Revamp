import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useTheme} from '@/Hooks';
import ListProductComponent from '@/Components/ListProductComponent';
import {
  useLazyGetListProductBySellerIdQuery,
  useLazyGetListProductByKeywordQuery,
} from '@/Services/api';

const ListProductContainer = () => {
  const {Common, Fonts, Gutters, Layout, Colors} = useTheme();

  const [sellerId, setSellerId] = useState('1');
  const [keyword, setKeyword] = useState('');
  const [tags, setTags] = useState('id');

  const [
    getListProductBySellerId,
    {data: dataById, isLoading: loadingById, isFetching: fetchingById},
  ] = useLazyGetListProductBySellerIdQuery();
  const [
    getListProductByKeyword,
    {
      data: dataByKeyword,
      isLoading: loadingByKeyword,
      isFetching: fetchingByKeyword,
    },
  ] = useLazyGetListProductByKeywordQuery();

  const canSaveDataSeller = [sellerId].every(Boolean) && !loadingById;
  const canSaveDataKeyword = [keyword].every(Boolean) && !loadingByKeyword;

  useEffect(() => {
    getListProductBySellerId(sellerId);
  }, []);

  const onSearchBySellerIDClicked = async () => {
    if (canSaveDataSeller) {
      try {
        getListProductBySellerId(sellerId);
        setKeyword('');
        setTags('id');
        Alert.alert('Sukses', 'Berhasil Mencari data berdasarkan Seller ID');
      } catch (err) {
        console.error('Failed to add seller: ', err);
        Alert.alert('Terjadi kesalahan', String(err));
      }
    }
  };

  const onSearchKeywordClicked = async () => {
    if (canSaveDataKeyword) {
      try {
        getListProductByKeyword(keyword);
        setKeyword('');
        setTags('keyword');
        Alert.alert('Sukses', 'Berhasil Mencari data berdasarkan keyword');
      } catch (err) {
        console.error('Failed to add seller: ', err);
        Alert.alert('Terjadi kesalahan', String(err));
      }
    }
  };

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}>
      <View style={Layout.center}>
        <View style={[Layout.rowCenter, Gutters.regularTMargin]}>
          <View>
            <TextInput
              onChangeText={setSellerId}
              editable={!loadingById}
              keyboardType={'default'}
              placeholder={'Input Seller ID'}
              value={sellerId}
              style={[Common.textInputSmall]}
            />
            <TouchableOpacity
              style={[
                Common.button.roundedSmall,
                Gutters.smallBMargin,
                Gutters.smallTMargin,
                Layout.smallWidht,
              ]}
              onPress={onSearchBySellerIDClicked}>
              {loadingById ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={[Fonts.textSmall, Fonts.textColorWhite]}>
                  {'Search by Seller ID'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={Layout.tinyWidht} />
          <View>
            <TextInput
              onChangeText={setKeyword}
              editable={!loadingByKeyword}
              keyboardType={'default'}
              placeholder={'Input Keyword'}
              value={keyword}
              style={[Common.textInputSmall]}
            />
            <TouchableOpacity
              style={[
                Common.button.roundedSmall,
                Gutters.smallBMargin,
                Gutters.smallTMargin,
                Layout.smallWidht,
              ]}
              onPress={onSearchKeywordClicked}>
              {loadingByKeyword ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={[Fonts.textSmall, Fonts.textColorWhite]}>
                  {'Search by Keyword'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ListProductComponent data={tags === 'id' ? dataById : dataByKeyword} />
      </View>
    </ScrollView>
  );
};

export default ListProductContainer;
