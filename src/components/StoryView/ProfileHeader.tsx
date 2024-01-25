import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets';
import styles from './styles';
import type { UserProps } from './types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../../theme';
export default memo(function ProfileHeader({
  userImage,
  userName,
  userMessage,
  userImageStyle,
  rootStyle,
  userNameStyle,
  userMessageStyle,
  closeIconStyle,
  customCloseButton,
  onImageClick,
  onClosePress,
  containerStyle,
  userMessageProps,
  userNameProps,
  userImageProps,
  closeIconProps,
  ondelPress,
  userStories,
  progressIndex,
  commonStyle,
  ...rest
}: UserProps) {
  const _containerStyle = StyleSheet.flatten([
    styles.userContainer,
    containerStyle,
  ]);
  const _rootStyle = StyleSheet.flatten([styles.userView, rootStyle]);
  const _userNameStyle = StyleSheet.flatten([styles.name, userNameStyle]);
  const _userMessageStyle = StyleSheet.flatten([
    styles.message,
    userMessageStyle,
  ]);
  const _userImageStyle = StyleSheet.flatten([styles.image, userImageStyle]);
  const _closeIconStyle = StyleSheet.flatten([
    styles.closeIcon,
    closeIconStyle,
  ]);

  const touchPos = {
    top: 20,
    bottom: 30,
    left: 30,
    right: 30,
  };

  return (
    <View style={_rootStyle} {...rest}>
      <View style={{flexDirection:'row',flex:1,justifyContent:'flex-start',alignItems:'flex-start',paddingHorizontal:10,}}>
        <View
           style={{
            borderRadius: 99,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowRadius: 24,
            elevation: 24,
            shadowOpacity: 1,
            flexDirection:'row',
            // paddingHorizontal:5,
            paddingVertical:8,
            paddingRight:20
            // 
          }}
        >
          {!!userImage && (
            <TouchableOpacity onPress={() => onImageClick?.()}>
              <Image
                source={userImage}
                style={_userImageStyle}
                {...userImageProps}
              />
            </TouchableOpacity>
          )}
            <View style={styles.barUsername}>
			  <Text style={[commonStyle.regulartext,_userNameStyle]} {...userNameProps}>
			  {userName}
			  </Text>
            </View>
           

        </View>
        {/* <View style={{flex:1,borderWidth:1,borderColor:'red'}}></View> */}
      </View>
      {customCloseButton ?? (
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:20}}>
                {userStories?.stories?.[progressIndex]?.story?.isOwner && 
                <TouchableOpacity onPress={ondelPress} style={{borderWidth:0,borderColor:'white',padding:10}}>
                  <MaterialCommunityIcons name='delete-outline' size={25} color={Colors.white} />
                </TouchableOpacity>}
              <TouchableOpacity onPress={() => onClosePress?.()} hitSlop={touchPos}>
                <Image
                  source={Icons.closeIcon}
                  style={_closeIconStyle}
                  {...closeIconProps}
                />
              </TouchableOpacity>
      </View>
      )}
    </View>
  );
});
