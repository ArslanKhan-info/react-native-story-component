import React, { useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, StyleSheet, View } from 'react-native';
import styles from './styles';
import type { ProgressiveImageProps } from './types';
import { Text } from 'react-native';
import { Colors } from '../../theme';


const { width, height, scale } = Dimensions.get('window');
const ProgressiveImage = (props: ProgressiveImageProps) => {
  const thumbnailAnimated = new Animated.Value(0.2);
  const { thumbnailSource, imgSource, viewStyle, ...reset } = props;
const [loading,setLoading] =useState(true)
  const imageAnimated = new Animated.Value(1);

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onImageLoad = () => {
    // setLoading(true)
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[styles.progressiveImageContainer,{width}]}>
          <ActivityIndicator
            animating
            pointerEvents="none"
            color={Colors.primary}
            size={props?.IndicatorSize || "large"}
            style={styles.loaderView}
          />
      
      <Animated.Image
          source={imgSource}
          style={[{ opacity: imageAnimated }, viewStyle,{
          maxHeight:height-210,
            // aspectRatio:16/9,
        }]}
        onLoad={onImageLoad}
        onLoadEnd={() => {setLoading(false);props.onImageLoaded && props.onImageLoaded()}}
        {...reset}
      />
    </View>
  );
};

export default ProgressiveImage;
