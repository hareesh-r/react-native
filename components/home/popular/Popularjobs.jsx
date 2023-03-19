import {useState} from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import { isLoading } from 'expo-font/build/Font'
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {
  const router = useRouter();
  // const isLoading = false;
  // const error = false;
  const {data,isLoading,error} = useFetch('search', {
    query: 'React developer',
    num_pages: 1
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity><Text style={styles.headerBtn}>Show All</Text></TouchableOpacity>
      </View>
      <View>
        {isLoading ? <ActivityIndicator size="large" color={COLORS.primary} /> : error ? <Text>Something went Wrong</Text> : (
          <FlatList data={data}
          renderItem={({item})=>(
            <PopularJobCard item={item} />
          )} 
          keyExtractor={item=>item?.job_id}
          contentContainerStyle={{columnGap: SIZES.medium}}
          horizontal
          />
        )}
      </View>
    </View> 
  )
}

export default Popularjobs