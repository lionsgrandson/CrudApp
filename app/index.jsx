import {
  FlatList,
  Text,
  View,
  Appearance,
  StyleSheet,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Colors } from '@/constant/theme'
import { TODDO_data } from '@/data/todos'
import Entypo from '@expo/vector-icons/Entypo'

export default function Index() {
  const colorScheme = Appearance.getColorScheme()
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light
  const styles = createStyles(theme)
  const [reRenderlist, setSreRenderlist] = useState(false)
  return (
    <SafeAreaProvider style={styles.container}>
      <FlatList
        data={TODDO_data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.Contentcontainer}
        ListEmptyComponent={
          <Text style={styles.footerComp}>Finished the TODO list</Text>
        }
        ItemSeparatorComponent={<View style={styles.seperator} />}
        extraData={reRenderlist}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.menuItemText}>{item.title}</Text>
            <Pressable
              style={styles.button}
              onPress={() => {
                setSreRenderlist(!reRenderlist)

                updateTODO(
                  item.title.toString(),
                  item,
                  TODDO_data.findIndex(
                    (obj) => obj.title === item.title.toString()
                  )
                )
              }}
            >
              <Entypo name='pencil' size={24} color='white' />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                deleteToDo(
                  item.title.toString(),
                  item,
                  TODDO_data.findIndex(
                    (obj) => obj.title === item.title.toString()
                  )
                )
                setSreRenderlist(!reRenderlist)
              }}
            >
              <Entypo name='trash' size={24} color='red' />
            </Pressable>
          </View>
        )}
      />
    </SafeAreaProvider>
  )
}
function readTODO() {
  // save the list to a file first
}
function updateTODO(item, itemObj, id) {
  // TODO get input from user
  TODDO_data[id].title = 'This is a test'
  console.log(TODDO_data)
}
function deleteToDo(item, itemObj, id) {
  console.log(`pressed: ${item} whith id of ${itemObj.id}`)
  TODDO_data.splice(id, 1)
  console.log(TODDO_data)
}
function createStyles(theme, colorSheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    contentContainer: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
    },

    footerComp: { marginHorizontal: 'auto', color: theme.text },
    menuItemText: {
      color: theme.text,
    },
    seperator: {
      height: 1,
      backgroundColor: colorSheme === 'dark' ? '#000' : 'papayawhip',
      width: '100%',
      maxWidth: 300,
      marginHorizontal: 'auto',
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      width: '100%',
      maxWidth: 600,
      height: 'auto',
      marginBottom: 10,
      padding: 5,
      marginHorizontal: 'auto',
    },
    button: {
      backgroundColor: 'red,',
    },
  })
}
