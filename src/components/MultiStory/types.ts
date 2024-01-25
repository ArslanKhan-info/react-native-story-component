import type { FlatListProps } from 'react-native';
import type { TransitionMode } from '../MultiStoryContainer/types';
import type { StoryAvatarStyleProps } from '../StoryAvatar/types';
import type { StoriesType, StoryContainerProps } from '../StoryView/types';
import { Dispatch, SetStateAction } from 'react';

export interface MultiStoryProps extends Partial<FlatListProps<any>> {
  stories: StoriesType[];
  onComplete?: (viewedStories?: Array<boolean[]>) => void;
  onChangePosition?: (progressIndex: number, storyIndex: number) => void;
  avatarProps?: StoryAvatarStyleProps;
  viewedStories?: Array<boolean[]>;
  storyContainerProps?: Omit<StoryContainerProps, 'stories'>;
  transitionMode?: TransitionMode;
  setIsStoryViewShow:Dispatch<SetStateAction<any>>;
  isStoryViewVisible:boolean,
  setStories:any
  setComments?:any
  viewStoryFuction?:any
  textStyle?:any
}

export interface MultiStoryRef {
  close: () => void;
}
