import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Video, { OnBufferData, OnLoadData } from 'react-native-video';
import { Colors, Metrics } from '../../theme';
import ProgressiveImage from './ProgressiveImage';
import styles from './styles';
import { StoryViewProps, StroyTypes } from './types';
import uuid from 'react-native-uuid';
import { dynamicMargin, getDynamicFontSize } from '../../theme/Metrics';
const BUFFER_TIME = 1000 * 60;


const { width, height, scale } = Dimensions.get('window');
const targetAspectRatio = 16 / 9; // 9:16 aspect ratio

// Calculate the adjusted height to maintain the target aspect ratio
const adjustedHeight = width * targetAspectRatio;

// Calculate the dynamic margin by subtracting the adjusted height from the actual height
// const dynamicMargin = (height - adjustedHeight) / 2; 

// const screenAspectRatio = (height-(2*dynamicMargin ))/ width

const StoryView = (props: StoryViewProps) => {
  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(true);
  const source = props?.stories?.[props?.progressIndex];
  const videoRef = useRef<Video>(null);
  const videoData = useRef<OnLoadData>();
  const isCurrentIndex = props?.index === props?.storyIndex;
  const [videoloaded,setLoadedVideo] = useState(false)
  useEffect(() => {
    if (props?.index === props?.storyIndex) {
      videoRef?.current?.seek(0);
    }
  }, [props?.storyIndex, props?.index]);

  const onLoadStart = () => {
    setLoading(true);
  };

  const loadVideo = () => {
    
    if (isCurrentIndex) {
      if (videoData.current === undefined) return;
      if(videoloaded)return
      setLoading(false);
      setBuffering(false);
      setLoadedVideo(true)
      props?.onVideoLoaded?.(videoData.current);
    }
  };

  const onBuffer = (data: OnBufferData) => {
    setBuffering(data.isBuffering);
  };

  // const { height, width } = useWindowDimensions();
  const getStoryData = ()=>{
    // console.log('ource.resolved?????',source.resolved)
    if(source.resolved){ return }
    else{
      console.log('asjasjcal the api')
      props?.viewStoryFuction?.(source,setLoadedVideo,props?.setComments,props?.setStories,props?.progressIndex)
    }
  }

  useEffect(()=>{
    getStoryData()
    // console.log('props?.progressIndex',props?.progressIndex)
  },[props?.progressIndex])

  console.log('pauise?x/???????',props.pause)

  const { height, width } = Dimensions.get('screen');



  return (
    <View style={[styles.divStory, { width,justifyContent:'center',alignItems:'center'}]} ref={props?.viewRef}>
      {!source?.resolved &&
       <View 
        style={[StyleSheet.absoluteFill,{alignItems:'center',justifyContent:'center',}]}
        >
        <ActivityIndicator
          size={'large'}
          color={Colors.primary}
        />
        </View>
      }

     
      {source?.resolved && 
      (source?.type === StroyTypes.Image ? (
        <ProgressiveImage
          viewStyle={props?.imageStyle ?? styles.imgStyle}
          imgSource={{ uri: source.url ?? '' }}
          thumbnailSource={{ uri: source.url ?? '' }}
          onImageLoaded={props.onImageLoaded}
        />
      ) :
      source?.type === StroyTypes.Video ? (
          <View
            style={{
              // borderWidth:1,
              // borderColor:'red',
              // flex:1,
              justifyContent:'center',
              alignItems:'center',
              height:height-(dynamicMargin*2),
              width:'100%'
            }}
          >
            <Video
              ref={videoRef}
              resizeMode="contain"
              paused={props.pause || loading}
              source={  {uri: source?.url}}
              onEnd={props?.onVideoEnd}
              onError={(_error: any) => {
                setLoading(false);
              }}
              onProgress={data => {
                if (isCurrentIndex) {
                  props?.onVideoProgress?.(data);
                }
              }}
              // bufferConfig={{
              //     minBufferMs: BUFFER_TIME,
              //     bufferForPlaybackMs: BUFFER_TIME,
              //     bufferForPlaybackAfterRebufferMs: BUFFER_TIME,
              // }}
              onBuffer={onBuffer}
              onLoadStart={onLoadStart}
              onLoad={(item: OnLoadData) => {
                videoData.current = item;
                !Metrics.isIOS && loadVideo();
              }}
              onReadyForDisplay={loadVideo}
              style={styles.contentVideoView}
              {...props?.videoProps}
            />
            {(loading || buffering) && props?.showSourceIndicator && (
              <ActivityIndicator
                animating
                pointerEvents="none"
                color={Colors.primary}
                size="large"
                style={styles.loaderView}
                {...props?.sourceIndicatorProps}
              />
            )}
          </View>
        )
      :
        <View style={{
          backgroundColor:source?.story?.text_story_properties?.background,
          height:height,
          justifyContent:'center',
          alignItems:'center',
          paddingHorizontal:20,
          width:'100%'
        }}
        key={uuid.v4()}
        onLayout={()=>{
          setTimeout(()=>{
            props.onImageLoaded && props.onImageLoaded()

          },100)
        }}
        onLoad
        >
          <Text  style={[props.textStyle,source?.story?.text_story_properties?.font_style,{color:Colors.white,fontSize: getDynamicFontSize(source?.story?.text_story_properties?.text?.length),textAlign:'center'}]}
          >{source?.story?.text_story_properties?.text}</Text>
        </View>
      )}
      {source?.resolved && source?.story?.caption &&
        <View 
          style={{
            position:'absolute',
            bottom:220,
            backgroundColor:'rgba(0,0,0,.5)',
            right:0,
            left:0,
            paddingHorizontal:20,
            paddingVertical:5,
          }}>
          <Text
            style={[props.textStyle,{color:Colors.white,textAlign:'center'}]}
          >
            {source?.story?.caption}
          </Text>
        </View>
      }
    </View>
  );
};

export default StoryView;
