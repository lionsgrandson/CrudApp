import { Text, View, Appearance, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constant/theme'
export default function Index() {
  const colorScheme = Appearance.getColorScheme()
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light
  const styles = createStyles(theme)
  return (
    <SafeAreaView style={styles.view}>
      <View>
        <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </SafeAreaView>
  )
}

function createStyles(theme) {
  return StyleSheet.create({
    view: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    text: {
      color: theme.text,
      fontSize: 20,
      marginBottom: 10,
    },
  })
}
