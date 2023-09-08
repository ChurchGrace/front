import { useEffect, useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CardMedia from '@mui/material/CardMedia';
import { useAppDispatch, useAppSelector, useDebounce } from '../../app/hooks';
import { selectPostPages, selectPostStatus, selectPosts } from '../../app/slices/postsSlice';
import { getPosts } from '../../app/thunks/postsThunk';
import PageError from '../../components/PageError';
import TextInfo from '../../components/TextInfo';
import { BlockText, ButtonStyled } from '../MinistryPage/AboutSection/AboutSectionStyled';
import { Container } from '../../components/Shared';
import PromoSectionComponent from '../../components/PromoSectionComponent';
import { cutString, stripHtml } from '../../utils/htmlParse';
import { StatusEnum } from '../../types/shared';
import {
  BlogContent,
  BlogSection,
  FormControlStyled,
  PaginationStyled,
  SearchBar,
  BlogItems,
  BlogControlls,
  BlogPagination,
  BlogItem,
} from './BlogPageStyled';
import BlogItemSkeleton from './BlogItemSkeleton';

const BlogPage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const postsStatus = useAppSelector(selectPostStatus);
  const pages = useAppSelector(selectPostPages);
  const [sort, setSort] = useState('-createdAt');
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('');

  const debouncedTitle = useDebounce<string>(title, 500);

  const setSearchTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPage(1);
    setTitle(event.target.value);
  };

  const changeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 120);
    void dispatch(getPosts({ page, sort, title: debouncedTitle, limit: 6 }));
  }, [page, dispatch, sort, debouncedTitle]);

  const createContent = () => {
    if (postsStatus === StatusEnum.LOADED) {
      if (!posts.length) {
        return (
          <div style={{ alignSelf: 'center' }}>
            <TextInfo text='Извините, пока нет новостей 😔' />
          </div>
        );
      }

      if (posts.length) {
        return (
          <>
            {posts.map((post) => (
              <BlogItem sx={{ maxWidth: 'none !important' }} key={post._id}>
                {post.imgMain?.url && <CardMedia component='img' height='125' image={post.imgMain?.url} />}
                <CardContent>
                  <BlockText gutterBottom variant='h5'>
                    {cutString(post.title, 15)}
                  </BlockText>
                  <BlockText variant='body2' color='text.secondary'>
                    {stripHtml(post.text)}
                  </BlockText>
                </CardContent>
                <CardActions
                  sx={{
                    paddingLeft: '16px',
                  }}>
                  <NavLink to={`/blog/${post.url}`}>
                    <ButtonStyled size='small'>Читать далее</ButtonStyled>
                  </NavLink>
                </CardActions>
              </BlogItem>
            ))}
          </>
        );
      }
    } else {
      return [...new Array(6)].map((_, i) => {
        return (
          <BlogItem sx={{ maxWidth: 'none !important' }} key={i}>
            <BlogItemSkeleton />
          </BlogItem>
        );
      });
    }
  };
  return (
    <>
      <PromoSectionComponent title={'Блог'} itemStatus={postsStatus} />
      <BlogSection>
        <Container>
          <BlogContent>
            <BlogItems>{createContent()}</BlogItems>

            <BlogControlls>
              <div>
                <h3>Найти пост</h3>
                <SearchBar
                  value={title}
                  onChange={(e) => setSearchTitle(e)}
                  placeholder='Заголовок поста'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon sx={{ color: '#ffff' }} />
                      </InputAdornment>
                    ),
                  }}
                  id='standard-basic'
                  label='Посик'
                  variant='filled'
                />
              </div>
              <div>
                <h3>Сортировать по</h3>
                <FormControlStyled variant='filled'>
                  <InputLabel id='sortLabel'>Времени</InputLabel>
                  <Select onChange={changeSort} labelId='sortLabel' value={sort} label='Age'>
                    <MenuItem value={'-createdAt'}>Сначала новые</MenuItem>
                    <MenuItem value={'createdAt'}>Сначала старые</MenuItem>
                  </Select>
                </FormControlStyled>
              </div>
            </BlogControlls>
          </BlogContent>
          {pages > 1 && (
            <BlogPagination>
              <PaginationStyled page={page} count={pages} onChange={(_, pageNum) => setPage(pageNum)} color='primary' />
            </BlogPagination>
          )}
        </Container>
      </BlogSection>
      {postsStatus === StatusEnum.ERROR && <PageError />}
    </>
  );
};

export default BlogPage;
