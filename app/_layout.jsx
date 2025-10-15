import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Appearance } from 'react-native'
import { Colors } from '@/constant/theme'
export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme()
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light
  return (
    <SafeAreaProvider
      screenOptions={{
        headerStyle: { backgroundColor: theme.headerBackground },
        headerTintColor: theme.text,
        headerShadowVisible: false,
      }}
    >
      <Stack>
        <Stack.Screen
          name='index'
          options={{ title: 'Home', headerShown: true }}
        />
      </Stack>
    </SafeAreaProvider>
  )
}
