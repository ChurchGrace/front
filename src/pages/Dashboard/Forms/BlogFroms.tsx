import { useEffect, useState } from 'react';
import { createPost, deletePost, getPosts, patchPost } from '../../../app/thunks/postsThunk';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectCreatePostStatus,
  selectPostBtnsStatus,
  selectPostPages,
  selectPostStatus,
  selectPosts,
  selectPostsError,
  updatePostStatus,
} from '../../../app/slices/postsSlice';
import { PaginationStyled } from '../../BlogPage/BlogPageStyled';
import { showFormContent } from '../../../utils/dashboard';
import { FormEditorStyled } from '../DashboardStyled';
import { WithStandartCreateForm } from '../../../components/Forms/CreateFormGeneral';
import { WithStandartEditForm } from '../../../components/Forms/EditFormGeneral';

const BlogForms = () => {
  const [page, setPage] = useState(1);
  const posts = useAppSelector(selectPosts);
  const formsStatus = useAppSelector(selectPostStatus);
  const createStatus = useAppSelector(selectCreatePostStatus);
  const btnsStatus = useAppSelector(selectPostBtnsStatus);
  const formError = useAppSelector(selectPostsError);
  const pages = useAppSelector(selectPostPages);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    void dispatch(getPosts({ page, limit: 6 }));
  }, [dispatch, page]);

  return (
    <>
      {showFormContent(
        formsStatus,
        <FormEditorStyled>
          <WithStandartCreateForm
            formStatus={createStatus}
            formError={formError}
            createThunk={createPost}
            showImg={[
              {
                imgName: 'Фото',
                optional: true,
                inputName: 'imgMain',
              },
            ]}
          />
          {posts.length &&
            posts.map((post) => {
              return (
                <WithStandartEditForm
                  btnsStatus={btnsStatus}
                  changeStatus={updatePostStatus}
                  patchThunk={patchPost}
                  deleteThunk={deletePost}
                  formError={formError}
                  textItem={post.text}
                  titleItem={post.title}
                  itemStatus={post.itemStatus}
                  id={post._id}
                  key={post._id}
                  showImg={[
                    {
                      imgName: 'Фото',
                      inputName: 'imgMain',
                      url: post?.imgMain?.url,
                      img: post?.imgMain?.img,
                    },
                  ]}
                />
              );
            })}
          {pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '30px' }}>
              <PaginationStyled count={pages} page={page} onChange={handleChange} />
            </div>
          )}
        </FormEditorStyled>,
      )}
    </>
  );
};

export default BlogForms;
