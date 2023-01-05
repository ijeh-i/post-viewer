import { useState } from 'react';
import moment from 'moment';

import { Grid } from '../../components/Grid.components';
import { Boxed } from '../../components/Boxed.components';
import { Text } from '../../components/Text.components';

import { Theme } from '../../utils/theme';
import { formatCurrency, calcViewMode } from '../../utils/utils';

import { usePostGet, type IPostDto } from './hooks/usePost.service';

import DisplayImage from './DisplayImage'

const inputElementStyle = {
  padding: '8px 10px',
  height: '40px',
  width: '100%',
  borderRadius: Theme.PrimaryRadius,
  border: `0.5px solid ${Theme.PrimaryBorderColor}`
};

type IPostCardProps = {
  postData: IPostDto;
  index: number;
  active: boolean;
};

const ImageViewer = () => {
  const { isLoadingPost, postContent, searchText, setSearchText, refetch } = usePostGet();

  const [currentPost, setCurrentPost] = useState<{ post: IPostDto; index: number } | null>(null);

  const PostCard = ({ postData, index, active }: IPostCardProps) => {
    const { created, user, likes } = postData;
    return (
      <Boxed
        cursor="pointer"
        pad="10px"
        borderRadius={`${Theme.SecondaryRadius}`}
        onClick={() => setCurrentPost({ post: postData, index: index })}
        hoverBColor={`${Theme.SecondaryDark}50`}
        bColor={active ? `${Theme.PrimaryColor}35` : `${Theme.SecondaryDark}20`}
        margin="5px 0"
      >
        <Text fontSize={Theme.SecondaryFontSize}>{postData?.title}</Text>
        <Text fontSize={Theme.SecondaryFontSize} color={Theme.SecondaryTextColor}>
          {postData?.description}
        </Text>
        <Text fontSize={Theme.SecondaryFontSize} color={Theme.SecondaryTextColor}>
          <span style={{ color: Theme.PrimaryColor }}>@{user?.username}</span> |{' '}
          {likes ? formatCurrency(likes) : 0} likes |{' '}
          {created ? moment(created).format('ll') : null}
        </Text>
      </Boxed>
    );
  };

  const nextPost = () => {
    if (currentPost?.index || currentPost?.index === 0) {
      let nextPostItem = postContent[currentPost?.index + 1];
      if (nextPostItem) {
        setCurrentPost({ post: nextPostItem, index: currentPost?.index + 1 });
      } else {
        setCurrentPost(null);
      }
    }
  };

  const resetCurrentPost = () => setCurrentPost(null);
  const viewMode = calcViewMode();

  return (
    <Boxed>
      <Grid desktop="auto 350px" table="auto 350px" mobile="repeat(1, 1fr)" padHorizontal="0">
        {(viewMode === 'mobile' && currentPost?.post) || viewMode !== 'mobile' ? (
          <Boxed minHeight="100vh" background={Theme.SecondaryDark}>
            {currentPost?.post ? (
              <>
              { currentPost?.post?.mediaId ? <DisplayImage
                currentPost={currentPost?.post}
                nextPost={nextPost}
                resetCurrentPost={resetCurrentPost}
              /> : 
              <Boxed pad="10px" height="100%" display="flex">
                <Text margin="auto">Oops! This post doesn't have an Image.</Text>
              </Boxed>
              }
              </>
            ) : (
              <Boxed pad="10px" height="100%" display="flex">
                <Text margin="auto">Select a post from the side bar to display it's images.</Text>
              </Boxed>
            )}
          </Boxed>
        ) : null}
        {(viewMode === 'mobile' && !currentPost?.post) || viewMode !== 'mobile' ? (
          <Boxed pad="10px">
            <Text fontSize="24px">Posts</Text>
            <Boxed pad="10px 0">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search post by title..."
                style={inputElementStyle}
              />
            </Boxed>

            <Boxed maxHeight="calc(100vh - 108px)" overflowY="scroll">
              {postContent.map((item, index) => (
                <PostCard
                  key={index}
                  postData={item}
                  index={index}
                  active={index === currentPost?.index}
                />
              ))}

              {isLoadingPost ? (
                <Text align="center" pad="10px" width="100%">
                  <i className='icon-spin5 animate-spin'/>
                  Loading post ...{' '}
                </Text>
              ) : (
                <Text
                  align="center"
                  cursor="pointer"
                  pad="10px"
                  width="100%"
                  color={Theme.PrimaryColor}
                  onClick={() => refetch()}
                >
                  View more
                </Text>
              )}
            </Boxed>
          </Boxed>
        ) : null}
      </Grid>
    </Boxed>
  );
};

export default ImageViewer;
