import {
  FlatList,
  Text,
  View,
  Appearance,
  StyleSheet,
  Pressable,
  TextInput,
  ToastAndroid,
  Platform,
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
  const [text, onChangeText] = useState('Create a new todo')
  const [listData, setListData] = useState(TODDO_data)
  // const listData = TODDO_data
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Pressable
          onPress={() => {
            TODDO_data.push(createTODO(text))
            console.log(text)

            setSreRenderlist(!reRenderlist)
          }}
        >
          <Entypo name='plus' size={24} color='white' />
        </Pressable>
      </View>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.Contentcontainer}
        ListEmptyComponent={
          <Text style={styles.footerComp}>Finished the TODO list</Text>
        }
        ItemSeparatorComponent={<View style={styles.seperator} />}
        extraData={reRenderlist}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Pressable
              style={styles.button}
              onPress={() => {
                markedDone(
                  TODDO_data.findIndex(
                    (obj) => obj.title === item.title.toString()
                  ),
                  item.title.toString()
                )

                setSreRenderlist(!reRenderlist)
              }}
            >
              <Entypo name='check' size={24} color='white' />
            </Pressable>
            <Text
              style={[
                styles.menuItemText,
                item.completed ? styles.completed : null,
              ]}
            >
              {item.title}
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => {
                updateTODO(
                  TODDO_data.findIndex((obj) => obj.title === item.title),
                  text
                )
                setSreRenderlist(!reRenderlist)
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
function markedDone(id, title) {
  TODDO_data[id].completed = !TODDO_data[id].completed
  Platform.OS === 'web'
    ? null
    : ToastAndroid.show(
        `Marked '${title}' as ${
          TODDO_data[id].completed === true ? 'Done!' : 'Undone'
        }`,
        ToastAndroid.SHORT
      )
}
function createTODO(title) {
  const id = TODDO_data.length + 1
  const completed = false
  const newTODO = { id, title, completed }
  console.log(newTODO)

  return newTODO
}
function readTODO() {
  // save the list to a file first
}
function updateTODO(id, newText) {
  TODDO_data[id].title = newText
}
function deleteToDo(id) {
  let newTODO = TODDO_data.splice(id, 1)
  return newTODO
}
function createStyles(theme, colorSheme) {
  return StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: theme.background,
      color: theme.text,
      borderColor: theme.text,
    },
    completed: {
      textDecorationColor: 'red',
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      color: 'grey',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    inputView: {
      flexDirection: 'row',
      alignItems: 'center',
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
