import React from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import Animated, {useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolate, withSpring} from 'react-native-reanimated'
import AnimatedLottieView from 'lottie-react-native'



const {height, width} = Dimensions.get('window')

export default function Introduction({navigation}) {

  // setting an initial shared value
  const translateX = useSharedValue(0)

  // scroll handler to detect and get the scroll position along the x-axis
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = withSpring(event.contentOffset.x, {damping: 12})
  })


  // based on the scrolled value along the x-axis, scale the animation size accordingly
  const animationSize1 = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, [-width, 0, width], [0, 1, 0], Extrapolate.CLAMP)
    return {
      transform: [{scale}],
    }
  })

  // based on the scrolled value along the x-axis, scale the animation size accordingly
  const animationSize2 = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, [0, width, 2*width],  [0, 1, 0], Extrapolate.CLAMP)
    return {
      transform: [{scale}],
    }
  })

  // based on the scrolled value along the x-axis, scale the animation size accordingly
  const animationSize3 = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, [width, 2*width, 3*width],  [0, 1, 0], Extrapolate.CLAMP)
    return {
      transform: [{scale}],
    }
  })


  // based on the scrolled value along the x-axis, translate the text accordingly
  // either from bottom to right position or right bottom and fade out
  const textAnimation1 = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, [-width, 0, width],  [-300, 0, 300], Extrapolate.CLAMP)
    const opacity = interpolate(translateX.value, [-width, 0, width],  [-2, 1, -2], Extrapolate.CLAMP)
    return {
      opacity,
      transform: [{translateY}],
    }
  })

  // based on the scrolled value along the x-axis, translate the text accordingly
  // either from bottom to right position or right bottom and fade out
  const textAnimation2 = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, [0, width, 2*width],  [300, 0, 300], Extrapolate.CLAMP)
    const opacity = interpolate(translateX.value, [0, width, 2*width],  [-2, 1, -2], Extrapolate.CLAMP)
    return {
      opacity,
      transform: [{translateY}],
    }
  })

  // based on the scrolled value along the x-axis, translate the text accordingly
  // either from bottom to right position or right bottom and fade out
  const textAnimation3 = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, [width, 2*width, 3*width],  [300, 0, -300], Extrapolate.CLAMP)
    const opacity = interpolate(translateX.value, [width, 2*width, 3*width],  [-2, 1, -2], Extrapolate.CLAMP)
    return {
      opacity,
      transform: [{translateY}],
    }
  })

  return (
    <Animated.ScrollView 
    style={styles.container}
    horizontal 
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onScroll={scrollHandler}
    scrollEventThrottle={16}
    >

      <View style={[styles.mainView, {backgroundColor: 'rgba(0, 255, 255, 0.4)'}]}>
        <Animated.View style={[animationSize1, {alignItems: 'center'}]}>
            <View style={[styles.animationWrapper]}>
                <AnimatedLottieView source={require('../assets/animations/welcome.json')} autoPlay loop/>
            </View>
        </Animated.View>

        <Animated.View style={[{alignItems: 'center'}, textAnimation1]}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subTitle}>So this is a simple intro screen I created out of boredom</Text>
        </Animated.View>
      </View>


      <View style={[styles.mainView, {backgroundColor: 'rgba(0, 255, 255, 0.6)'}]}>
          <Animated.View style={[styles.animationWrapper, animationSize2]}>
              <AnimatedLottieView source={require('../assets/animations/mission.json')} autoPlay loop/>
          </Animated.View>

          <Animated.View style={[{alignItems: 'center'}, textAnimation2]}>
            <Text style={styles.title}>Mission</Text>
            <Text style={[styles.subTitle, {lineHeight: 30}]}>With this it kind of looks like a virtual meeting platform doesn't it? Unfortunately it's not. It's just a lazy welcome screen I'm trying to do</Text>
          </Animated.View>
      </View>

      <View style={[styles.mainView, {backgroundColor: 'rgba(0, 255, 255, 0.9)'}]}>
          <Animated.View style={[styles.animationWrapper, animationSize3]}>
              <AnimatedLottieView source={require('../assets/animations/getstarted.json')} autoPlay loop/>
          </Animated.View>

          <Animated.View style={[{alignItems: 'center'}, textAnimation3]}>
            <Text style={styles.title}>Ready?</Text>
            <Text style={[ styles.subTitle, {marginBottom: 50}]}>Let's take off now shall we. Tap the button below to proceed</Text>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => {navigation.navigate("Home")}}>
                <Text style={{fontFamily: 'PoppinsMedium', fontSize: 15}}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>

      </View>
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView: {
      justifyContent: 'center',
      alignItems: 'center',
      width,
    },
    animationWrapper: {
      width: width * 0.80,
      height: width * 0.80
    },
    button: {
      height: 60,
      width: width * 0.80,
      backgroundColor: '#2AD417',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center'
  },
  title: {
    fontFamily: 'PoppinsSemiBold', 
    fontSize: 24, 
    marginBottom: 10
  },
  subTitle: {
    fontFamily: 'PoppinsMedium', 
    fontSize: 14, 
    marginHorizontal: 25, 
    textAlign: 'center',
  }
})