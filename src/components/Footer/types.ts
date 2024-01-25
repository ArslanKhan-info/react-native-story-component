import type React from 'react';
import type {
  ImageProps,
  ImageStyle,
  StyleProp,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

export type FooterComponentProps = React.ReactElement<FooterProps>;

export type FooterProps = TextInputProps & {
comments?:any[];
  story?:any;
  setLoading?:any;
  loading?:boolean
  label?: string;
  sendIconProps?: ImageProps;
  sendTextProps?: TextProps;
  containerViewProps?: ViewProps;
  shouldShowTextInputSend?: boolean;
  customInput?: TextInput | null;
  shouldShowSendImage?: boolean;
  sendTextStyle?: TextStyle;
  sendIconStyle?: ImageStyle;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: ViewStyle;
  sendText?: string;
  onIconPress?: (string:string) => void | null;
  onSendTextPress?: () => void | null;
  onOpenView?:() => void | null;
  commonStyle?:any
};
