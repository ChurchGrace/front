import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPostStatus, selectPosts } from '../../app/slices/postsSlice';
import PromoSectionComponent from '../../components/PromoSectionComponent';
import { StatusEnum } from '../../types/shared';
import PageError from '../../components/PageError';
import { getSermons } from '../../app/thunks/sermonsThunk';
import Sermon from '../../components/Sermon';
import { selectSermons, selectSermonsStatus } from '../../app/slices/sermonsSlice';
import { getPosts } from '../../app/thunks/postsThunk';
import { SermonsBlock } from '../../components/Sermon/SermonsBlockStyled';
import SermonsBlockSkeleton from '../../components/Sermon/SermonsBlockSkeleton';
import {
  FullPostAside,
  FullPostImg,
  FullPostSection,
  FullPostTextContent,
  FullPostWrapper,
} from './FullPostPageStyled';
import FullPostPageSkeleton from './FullPostPageSkeleton';

const FullPostPage = () => {
  const { url } = useParams();
  const [post] = useAppSelector(selectPosts);
  const postStatus = useAppSelector(selectPostStatus);
  const sermonsStatus = useAppSelector(selectSermonsStatus);
  const sermons = useAppSelector(selectSermons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getPosts({ url }));
    if (!sermons.length) {
      void dispatch(getSermons());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, url]);

  return (
    <>
      {postStatus === StatusEnum.LOADED && !post ? (
        <Navigate to={'/blog'} />
      ) : (
        <>
          <PromoSectionComponent
            breadcrumbs={[
              { link: '/', title: 'Главня' },
              { link: '/blog', title: 'Блог' },
            ]}
            title={post?.title}
            itemStatus={postStatus}
          />
          <FullPostSection>
            <FullPostWrapper>
              <div>
                {postStatus === StatusEnum.LOADED ? (
                  <>
                    {post.imgMain?.url && (
                      <FullPostImg>
                        <LazyLoadImage src={post.imgMain?.url} effect='blur' />
                      </FullPostImg>
                    )}
                    <FullPostTextContent>{parse(post.text)}</FullPostTextContent>
                  </>
                ) : (
                  <FullPostPageSkeleton />
                )}
              </div>
              <FullPostAside>
                <h4>Проповеди</h4>
                {sermonsStatus === StatusEnum.LOADED
                  ? sermons.slice(0, 3).map((sermon) => {
                      return (
                        <SermonsBlock style={{ marginBottom: '30px' }} key={sermon.id}>
                          <Sermon
                            title={sermon.snippet.title}
                            url={sermon.snippet.thumbnails.medium.url}
                            videoId={sermon.snippet.resourceId.videoId}
                          />
                        </SermonsBlock>
                      );
                    })
                  : [...new Array(3)].map((_, i) => {
                      return (
                        <SermonsBlock style={{ marginBottom: '30px' }} key={i}>
                          <SermonsBlockSkeleton />
                        </SermonsBlock>
                      );
                    })}
              </FullPostAside>
            </FullPostWrapper>
          </FullPostSection>
        </>
      )}
      {postStatus === StatusEnum.ERROR && <PageError />}
    </>
  );
};

export default FullPostPage;
