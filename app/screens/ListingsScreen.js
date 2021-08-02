import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import ActivityIndicator from '../components/ActivityIndicator';
import Button from '../components/Button';
import Card from '../components/Card';
import colors from '../config/colors';
import Screen from '../components/Screen';
import routes from '../navigation/routes';
import listingApi from '../api/listings';
import AppText from '../components/Text';

// const listings = [
// 	{
// 		id: 1,
// 		title: 'Red jacket for sale',
// 		price: 100,
// 		image: require('../assets/jacket.jpg'),
// 	},
// 	{
// 		id: 2,
// 		title: 'Couch in great condition',
// 		price: 1000,
// 		image: require('../assets/couch.jpg'),
// 	},
// ];

function ListingsScreen({ navigation }) {
	const [listings, setListings] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadListings();
	}, []);

	const loadListings = async () => {
		setLoading(true);
		const response = await listingApi.getListings();
		setLoading(false);

		if (!response.ok) return setError(true);

		setError(false);
		setListings(response.data);
	};

	return (
		<Screen style={styles.screen}>
			{error && (
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						top: '40%',
					}}
				>
					<AppText>Couldn't retrive your Listings Feed.</AppText>
					<Button
						title="Retry"
						sideicon="searchengin"
						onPress={loadListings}
					></Button>
				</View>
			)}
			{/* <ActivityIndicator visible={loading} /> */}
			<FlatList
				data={listings}
				keyExtractor={(listing) => listing.id.toString()}
				renderItem={({ item }) => (
					<Card
						title={item.title}
						subTitle={'$' + item.price}
						imageUrl={item.images[0].url}
						onPress={() =>
							navigation.navigate(routes.LISTING_DETAILS, item)
						}
					/>
				)}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 20,
		backgroundColor: colors.light,
	},
});

export default ListingsScreen;
