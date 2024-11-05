import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomePage from './HomePage'
import RegisterPage from './RegisterPage'
import index from './index'
import ChangePassword from './ChangePassword'
import EditProfilePage from './EditProfilePage'
import ResetPassword from './ResetPassword'
import ForgotPassword from './ForgotPassword'

export type RootStackParamList = {
  index: undefined
  RegisterPage: undefined
  HomePage: undefined
  ChangePassword: undefined
  EditProfilePage: undefined
  ForgotPassword: undefined
  ResetPassword: { email: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootLayout() {
   
  return (

    <Stack.Navigator initialRouteName='index' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' component={index} />
      <Stack.Screen name='RegisterPage' component={RegisterPage} />
      <Stack.Screen name='HomePage' component={HomePage} />
      <Stack.Screen name='ChangePassword' component={ChangePassword} />
      <Stack.Screen name='EditProfilePage' component={EditProfilePage} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>

  )
}
