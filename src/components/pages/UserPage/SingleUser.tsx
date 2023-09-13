import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { User } from '../../../types/models/User.model';
import UserService from '../../../Services/UserService';
import { useNavigate, useParams } from 'react-router-dom';

const SingleUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      UserService.getUser(userId).then((res) => {
        setUser(res);
      });
    }
  }, [userId]);

  const handleAdd = () => {
    navigate('../useredit/');
  };

  const handleEdit = (id: string) => {
    navigate('../useredit/' + id);
  };

  const handleDelete = (id: string) => {
    UserService.deleteUser(id);
  };

  return (
    <>
      {user && (
        <div key={user.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {user.firstName} {user.lastName} {user.email}
              <CardActions>
                <Button
                  size='small'
                  color='primary'
                  variant='contained'
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </Button>
                <Button
                  size='small'
                  color='error'
                  variant='contained'
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      )}
      <Button
        size='small'
        color='success'
        variant='contained'
        onClick={handleAdd}
      >
        Add
      </Button>
    </>
  );
};

export default SingleUser;

