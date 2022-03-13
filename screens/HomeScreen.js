import React from 'react'
import {Text, View, StyleSheet, Dimensions} from 'react-native'
import AnimatedLottieView from 'lottie-react-native'


const {height, width} = Dimensions.get('window')

export default function Home() {
  return (
    <View style={styles.container}>
        <View style={[styles.animationWrapper]}>
            <AnimatedLottieView source={require('../assets/animations/empty.json')} autoPlay loop/>
        </View>

        <View style={{alignItems: 'center', marginHorizontal: 20}}>
            <Text style={styles.title}>Oops!</Text>
            <Text style={[styles.subTitle, {marginBottom: 10}]}>You made it this far but it seems there is nothing here comrade. Apparently this is the end of the project</Text>
            <Text style={[styles.subTitle, {marginBottom: 80}]}>Thanks for checking it out</Text>
        </View>

        <Text style={[styles.subTitle, {fontFamily: 'PoppinsMedium'}]}>Made with ❤ by JellyCodee</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animationWrapper: {
        width: width * 0.90,
        height: width * 0.90
    },
    title: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 26
    },
    subTitle: {
        fontFamily: 'PoppinsRegular',
        lineHeight: 22,
        textAlign: 'center',
    }
})