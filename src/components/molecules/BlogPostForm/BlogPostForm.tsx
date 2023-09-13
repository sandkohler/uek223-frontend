import { useFormik } from 'formik';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { BlogPost } from '../../../types/models/BlogPost.model';
import CategoryService from '../../../Services/CategoryService';
import { useState, useEffect } from 'react';
import { Category } from '../../../types/models/Category.model';

interface BlogPostProps {
  blogPost: BlogPost;
  submitActionHandler: (values: BlogPost) => void;
}

const BlogPostForm = ({ blogPost, submitActionHandler }: BlogPostProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    CategoryService.getAllCategories().then((data) => {
      setCategories(data.data);
    }).catch(error => { console.log(error + "Can't get Categories") });
  }, [])

  const formik = useFormik({
    initialValues: {
      id: blogPost.id || '',
      title: blogPost.title || '',
      text: blogPost.text || '',
      user: blogPost.user || { id: '', email: '', firstName: '', lastName: '', roles: [] },
      categories: blogPost.categories || [],
    },
    validationSchema: object({
      title: string().required().min(2).max(20),
      text: string().required().min(2).max(100),
    }),
    onSubmit: (values) => {
      values.user.id = JSON.parse(localStorage.getItem('user') || '').id;
      let cat = categories.find((e: any) => e.id === values.categories) // Approved by Luca
      submitActionHandler({ ...values, categories: cat ? [cat] : [] });
    },
    enableReinitialize: true,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <h1>Create Blog Post</h1>
        <Box sx={{ paddingTop: '15px' }}>
          <TextField
            id='title'
            label='Title'
            variant='outlined'
            sx={{ paddingRight: '10px' }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.title && formik.errors.title)}
            value={formik.values.title}
          />
          {formik.errors.title && formik.touched.title ? (
            <div style={{ color: 'red' }}>{formik.errors.title}</div>
          ) : null}
          <TextField
            id='text'
            label='Text'
            variant='outlined'
            sx={{ paddingRight: '10px' }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.text && formik.errors.text)}
            value={formik.values.text}
          />
          {formik.errors.text && formik.touched.text ? (
            <div style={{ color: 'red' }}>{formik.errors.text}</div>
          ) : null}
          <FormControl fullWidth>
            <InputLabel>Choose Categorie</InputLabel>
            <Select
              displayEmpty
              id="category"
              value={formik.values.categories}
              onChange={formik.handleChange}
              name='categories'
            >
              <MenuItem value={""}></MenuItem>
              {categories.map((cat) => (<MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>))}
            </Select>
          </FormControl>
        </Box>
        <div>
          <Button
            sx={{ marginTop: '15px', marginRight: '10px' }}
            variant='contained'
            color='success'
            type='submit'
            disabled={!(formik.dirty && formik.isValid)}
          >
            {blogPost.id && 'Save'}
            {!blogPost.id && 'Add'}
          </Button>
          <Button
            sx={{ marginTop: '15px' }}
            variant='contained'
            color='error'
            onClick={() => {
              navigate('/blogs');
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default BlogPostForm;