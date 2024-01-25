import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { View, FlatList } from 'react-native';
import { MultiStoryContainer } from '../MultiStoryContainer';
import { StoryAvatar } from '../StoryAvatar';
import type { StoryType } from '../StoryView';
import type { MultiStoryProps, MultiStoryRef } from './types';

const MultiStory = forwardRef<MultiStoryRef, MultiStoryProps>(
  ({ setStories,stories, transitionMode,isStoryViewVisible,setIsStoryViewShow, avatarProps,setComments, ...props }, ref) => {
    // const [isStoryViewVisible, setIsStoryViewShow] = useState<boolean>(false);
    const [pressedIndex, setPressedIndex] = useState<number>(-1);
    const viewedStoriesRef = useRef<any>([]);
    const openStories = (index: number) => {
      setIsStoryViewShow(true);
      setPressedIndex(index);
    };

    // const { current: viewedStories } = useRef(
    //   Array(stories.length)
    //     .fill(stories)
    //     .map((row, index) =>
    //       row?.[index]?.stories.map((item: StoryType) => item?.isSeen ?? false)
    //     )
    // );

    useEffect(() => {
      // console.log('Current stories:', stories); // Debugging line
    
      const updatedViewedStories = stories.map(storyGroup =>
        storyGroup.stories.map(story => story.isSeen ?? false)
      );
    
      viewedStoriesRef.current = updatedViewedStories;
    }, [stories]); 
    
        
    // console.log('firstviewedStoriesviewedStoriesviewedStories',viewedStoriesRef.current)

    useImperativeHandle(ref, () => ({
      close: _onClose,
    }));

    const _onClose = () => {
      setIsStoryViewShow(false);
      setStories((state:any)=>state.map((elm:any)=>({...elm,resolved:false})))
      // props?.onComplete?.(viewedStories);
      props?.onComplete?.(viewedStoriesRef.current);
    };

    const onUserStoryIndexChange = (index: number) => {
      if (pressedIndex === index) return;
      setPressedIndex(index);
    };

    const handelStoryPress = (index:number)=> {
      if(stories[index]?.stories?.length == 0){
        return
        console.log('inside heree ')
      }
      openStories(index)
    }

    return (
      <View>
        <FlatList
          horizontal
          data={stories}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({ item, index }) => (
            <StoryAvatar
              {...{
                item,
                index,
                isStoryViewVisible,
                pressedIndex,
                openStories:handelStoryPress,
                // viewedStories,
                viewedStories:viewedStoriesRef.current,
                ...avatarProps,
              }}
            />
          )}
          {...props}
        />
        {isStoryViewVisible && (
          <MultiStoryContainer
            visible={isStoryViewVisible}
            onComplete={_onClose}
            viewedStories={[...viewedStoriesRef.current]}
            onChangePosition={(progressIndex, storyIndex: any) => {
              viewedStoriesRef.current[storyIndex][progressIndex] = true;
              props?.onChangePosition?.(progressIndex, storyIndex);
            }}
            onUserStoryIndexChange={onUserStoryIndexChange}
            transitionMode={transitionMode}
            {...props?.storyContainerProps}
            setStories={setStories && setStories}
            stories={stories}
            userStoryIndex={pressedIndex}
            setComments={setComments}
            viewStoryFuction={props?.viewStoryFuction}
            textStyle={props?.textStyle}
          />
        )}
      </View>
    );
  }
);

export default MultiStory;
