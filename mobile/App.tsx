import { useCallback, useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import './src/lib/dayjs';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {
	Inter_400Regular,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold
} from '@expo-google-fonts/inter';

import { Routes } from './src/routes';

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
				await Font.loadAsync({
					Inter_400Regular,
					Inter_600SemiBold,
					Inter_700Bold,
					Inter_800ExtraBold
				});
			} catch {
				// handle error
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutLoad = useCallback(() => {
		if (appIsReady) {
			SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutLoad}>
			<Routes />
			<StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
		</View>
	);
}
