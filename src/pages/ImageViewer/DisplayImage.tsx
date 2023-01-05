import { useState, useEffect } from 'react';

import { Avatar } from '../../components/Avatar.components';
import { Boxed } from '../../components/Boxed.components';
import { Text } from '../../components/Text.components';

import { Theme } from '../../utils/theme';
import { formatCurrency, calcViewMode } from '../../utils/utils';

import { useMediaGet } from './hooks/useMedia.service';
import { useUserGet } from './hooks/useUser.service';
import { type IPostDto } from './hooks/usePost.service';

let displayTimer: string | number | NodeJS.Timeout | undefined;

type IimageState = {
  loading: boolean;
  imgURL: string;
  error: boolean;
};

type IAvatarCardProps = {
  username: string;
  likes: number;
};

const backgroundImageStyle = {
  height: '100%',
  width: '100%',
  opacity: '0.1',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

const AvatarCard = ({ username, likes }: IAvatarCardProps) => {
  const { userContent, isLoadingUser } = useUserGet(username);
  return (
    <Boxed display="flex">
      <Avatar src={userContent?.profile_images?.medium} size="45px" alt={username} />
      <Boxed margin="auto 5px">
        {isLoadingUser ? (
          <Text>loading...</Text>
        ) : (
          <Text size={Theme.SecondaryFontSize}>
            {userContent?.first_name} {userContent?.last_name}
          </Text>
        )}
        <Text size={Theme.SecondaryFontSize} color={Theme.SecondaryTextColor}>
          {' '}
          <span style={{ color: Theme.PrimaryColor }}>@{username}</span> |{' '}
          {likes ? formatCurrency(likes) : 0} <i className="icon-thumbs-up" />
        </Text>
      </Boxed>
    </Boxed>
  );
};

const DisplayImage = ({
  currentPost,
  nextPost,
  resetCurrentPost
}: {
  currentPost: IPostDto | null | undefined;
  nextPost: () => void;
  resetCurrentPost: () => void;
}) => {
  const [image, setImage] = useState<IimageState>({ loading: true, imgURL: '', error: false });

  const { mediaContent, mediaError } = useMediaGet(currentPost?.mediaId);

  useEffect(() => {
    setImage({ loading: true, imgURL: '', error: false });
    displayTimer && clearTimeout(displayTimer);
    if (currentPost?.mediaId) {
      const objImg = new Image();
      const img_url = `${mediaContent?.urls?.full}`;
      objImg.src = img_url;
      objImg.onload = () => {
        setImage({
          loading: false,
          imgURL: img_url,
          error: false
        });

        displayTimer = setTimeout(function () {
          // Function to trigger next Post Display
          nextPost();
        }, 6000);
      };
      objImg.onerror = () => {
        setImage({
          loading: false,
          imgURL: '',
          error: true
        });
      };
    }
  }, [currentPost?.mediaId, mediaContent?.urls?.small, mediaContent?.urls?.full, nextPost]);

  const viewMode = calcViewMode();
  const isMobileView = viewMode === 'mobile';

  const onClose = () => {
    displayTimer && clearTimeout(displayTimer);
    resetCurrentPost();
  };

  return (
    <Boxed height="100%" display="flex" position="relative">
      <Boxed
        position="absolute"
        style={{
          ...backgroundImageStyle,
          backgroundImage: `url(${mediaContent?.urls?.small})`
        }}
      />

      <Boxed pad="10px 0" display="flex" position="absolute" style={{ top: 0, zIndex: 2 }}>
        {isMobileView && (
          <span
            style={{ fontSize: '20px', margin: 'auto 10px', padding: '10px' }}
            onClick={() => onClose()}
          >
            &times;
          </span>
        )}
        {currentPost?.user?.username && (
          <AvatarCard username={currentPost?.user?.username} likes={currentPost?.likes} />
        )}
      </Boxed>

      {mediaError ? (
        <Text margin="auto"> Oops! An error occurred when loading this image.</Text>
      ) : (
        <>
          {image.loading ? (
            <Text margin="auto"><i className='icon-spin5 animate-spin'/> Loading...</Text>
          ) : (
            <img
              src={image.imgURL}
              alt={currentPost?.user?.username}
              style={{
                margin: 'auto',
                maxHeight: '100vh',
                maxWidth: '100vh',
                zIndex: 1,
                width: '100%'
              }}
            />
          )}
        </>
      )}

      <Boxed pad="10px 10px 15px 10px" position="absolute" style={{ bottom: 0, zIndex: 2 }}>
        <Text>{currentPost?.title}</Text>
        <Text color={Theme.SecondaryTextColor}>{currentPost?.description}</Text>
      </Boxed>
    </Boxed>
  );
};

export default DisplayImage;
