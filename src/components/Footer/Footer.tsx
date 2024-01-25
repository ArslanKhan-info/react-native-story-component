import React, {useRef, useState} from 'react';
import {
ActivityIndicator,
    Dimensions,
  Image,
Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useKeyboardListener} from '../../hooks';
import {Colors} from '../../theme';
import styles from './styles';
import type {FooterProps} from './types';
import colors from '../../theme/Colors';
const {width, height, scale} = Dimensions.get('window');
const targetAspectRatio = 16 / 9; // 9:16 aspect ratio

// Calculate the adjusted height to maintain the target aspect ratio
const adjustedHeight = width * targetAspectRatio;

// Calculate the dynamic margin by subtracting the adjusted height from the actual height
// const dynamicMargin = (height - adjustedHeight) / 2;

// const screenAspectRatio = (height-(2*dynamicMargin ))/ width

const Footer = ({
  onIconPress,
  onSendTextPress,
  sendTextStyle,
  sendIconStyle,
  inputStyle,
  containerStyle,
  sendText,
  shouldShowSendImage = true,
  shouldShowTextInputSend = true,
  sendIconProps,
  sendTextProps,
  containerViewProps,
  customInput,
    comments,
    story,
    onOpenView,
    commonStyle,
  ...rest
}: FooterProps) => {
  const isKeyboardVisible = useKeyboardListener();
const [input, setInput] = useState<string>('');
  const ref = useRef<TextInput>(null);

  const handleSendTextPress = () => {
    ref?.current?.clear();
    onSendTextPress?.();
  };

  const _sendTextStyle = StyleSheet.flatten([styles.sendText, sendTextStyle]);
  const _sendIconStyle = StyleSheet.flatten([styles.sendIcon, sendIconStyle]);
  const _inputStyle = StyleSheet.flatten([styles.input, inputStyle]);
  const _containerStyle = StyleSheet.flatten([
    styles.container,
    containerStyle,
  ]);

  return (
    <View
            style={[
                _containerStyle,
                //   ,
                // {paddingBottom:Platform.OS =='ios' ? dynamicMargin - 10 : dynamicMargin + 20}
            ]}
            {...containerViewProps}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    style={{
                        marginLeft: 20,
                        marginRight:20,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        // backgroundColor:colors.white,
                        borderWidth: 1,
                        borderColor: colors.white,
                        borderRadius: 999,
                        flex: 1,
                    }}
                    onPress={() => {
                        handleSendTextPress?.();
                    }}>
                    <Text style={[commonStyle.regulartext,{color: colors.white}]}  >Comment</Text>
                </TouchableOpacity>
                {story?.isOwner && story?.view?.length > 0 &&  (
                    <View
                        style={{
                            flexDirection: 'row',
                            // marginLeft: 20,
                            marginRight: 20,
                        }}>
                        {story?.view &&
                            story?.view?.length > 0 &&
                            story?.view?.map((view: any, key: any) => {
                                if (key >= 3) return;
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            onOpenView?.();
                                        }}
                                        key={view?.view_info?._id}
                                        style={[
                                            {
                                                width: 40,
                                                height: 40,
                                                borderWidth: 1,
                                                borderColor: 'white',
                                                borderRadius: 999,
                                                left: key == 0 ? 0 : -15 * key,
                                                // backgroundColor: 'red',
                                                overflow: 'hidden',
                                            },
                                            key == 2 && {zIndex: 1},
                                        ]}>
                                        {view?.profile_picture?.mediaUrl && (
                                            <Image
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    // borderWidth:1,borderColor:'red'
                                                }}
                                                source={{
                                                    uri: view?.profile_picture
                                                        ?.mediaUrl,
                                                }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                    </View>
                )}
                {/* <TouchableOpacity 
          onPress={()=>{
            handleSendTextPress?.()
          }}
         style={{
          paddingLeft:10,
          alignItems:'center',
          justifyContent:'center'
        }}>
          <FontAwesome size={34} color={colors.white} name='commenting-o'/>
        </TouchableOpacity> */}
                {/* <View style={styles.sectionStyle}>
        <>
          {customInput ?? (
            <TextInput
              ref={ref}
              style={_inputStyle}
              placeholder={Strings.sendMessage}
              placeholderTextColor={Colors.white}
onChangeText={(text) => setInput(text)}
                value={input}
              {...rest}
            />
          )}
        </>
        {isKeyboardVisible && shouldShowTextInputSend && (
          <TouchableOpacity onPress={handleSendTextPress}>
            <Text style={_sendTextStyle} {...sendTextProps}>
              {sendText ?? Strings.send}
            </Text>
          </TouchableOpacity>
        )}
      </View> */}
                {/* {shouldShowSendImage && (
        <TouchableOpacity onPress={()=>{onIconPress && onIconPress(input); ref?.current?.clear()}} testID="footerIcon">
{rest.loading ? 
                <ActivityIndicator
                animating
                pointerEvents="none"
                color={Colors.primary}
                size={"large"}
              />
              :
          <Image
            source={Icons.send}
            style={_sendIconStyle}
            {...sendIconProps}
          />}
        </TouchableOpacity>
      )} */}
            </View>
            <View
                style={{
                    position: 'absolute',
                    top:(comments && comments?.length >= 2) ?  -168:-95,
                    left: 20,
                    gap: 10,
                    right: 20,
                }}
                onLayout={event => {
                    const {height} = event.nativeEvent.layout;
                    // setHeight(height);
                    // console.log('Height:', heigh/t);
                }}>
                  
                {comments &&
                    comments.length > 0 &&
                    comments.slice(-2)?.map((comment: any) => {
                        return (
                                <TouchableOpacity
                                    onPress={() => {
                                        handleSendTextPress?.();
                                    }}
                                    key={comment?.comment_info?._id}
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        borderRadius: 25,
                                        backgroundColor: 'rgba(0,0,0,.4)',
                                        // flex:1
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            paddingVertical: 5,
                                            // justifyContent:'center',
                                            alignItems: 'center',
                                            gap: 10,
                                        }}>
                                        <View
                                            style={{
                                                width: 30,
                                                height: 30,
                                                // borderWidth:1,
                                                borderRadius: 999,
                                                overflow: 'hidden',
                                            }}>
                                            {/* {console.log('aaasddasd f df df',comment?.profile_picture?.mediaUrl)} */}
                                            {comment?.profile_picture
                                                ?.mediaUrl && (
                                                <Image
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        // borderWidth:1,borderColor:'red'
                                                    }}
                                                    source={{
                                                        uri: comment
                                                            ?.profile_picture
                                                            ?.mediaUrl,
                                                    }}
                                                />
                                            )}
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text  
                                                    style={[
                                                        commonStyle.mediumtext,
                                                        {
                                                            fontSize: 15,
                                                            color: Colors.white,
                                                        },
                                                ]}>
                                                    {
                                                        comment?.user_details
                                                            ?.first_name +
                                                        ' ' +
                                                        comment?.user_details
                                                            ?.last_name
                                                    }
                                                </Text>
                                                
                                            </View>
                                            <Text 
                                                style={[
                                                    commonStyle.regulartext,
                                                    {
                                                    fontSize: 15,
                                                    color: Colors.white,
                                                }]}>
                                                    { comment?.comment_info?.comment}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                        );
                    })}
            </View>
    </View>
  );
};

export default Footer;
