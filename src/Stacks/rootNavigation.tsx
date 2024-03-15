import { useEffect, useState } from 'react';
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

  return (
    isLoading ? <LoadingScreen/> : userExists ? <UserStack/> : <AuthStack/>
  );
}