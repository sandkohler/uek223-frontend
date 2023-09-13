import api from '../config/Api';

const CategoryService = {
    getAllCategories: () => {
        return api.get('/blogs/categories/');
    },
};

export default CategoryService;