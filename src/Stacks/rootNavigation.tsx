import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authStack';
import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from '../config/firebase';
import UserStack from './userStack';
import LoadingScreen from '../Components/LoadingScreen/LoadingScreen';

export default function RootNavigation() { 
  const [userExists, setUserExists] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(firebase_auth, async (user) => {
      setUserExists(!!user)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <LoadingScreen size={80} />;
  }

  return (
    <NavigationContainer>
      { userExists ? <UserStack /> : <AuthStack /> }
    </NavigationContainer>
  );
}