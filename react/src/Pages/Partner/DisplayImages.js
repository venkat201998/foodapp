import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';

const DisplayImgaes = ({ images, setImages }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);

    const handleImageRemove = (public_id) => {
        let idToken = user ? user.token : '';
        setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_API}/removeimage`,
                { public_id },
                {
                    headers: {
                        idToken
                    },
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    const { urls } = images;
                    let filteredImages = urls.filter((item) => {
                        return item.public_id !== public_id;
                    });
                    setImages({ ...images, urls: filteredImages });
                    localStorage.setItem('uploadedImages', { ...images, urls: filteredImages });
                } else {
                    toast.error(res.data.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error);

            });
    };


    return(
        <>
            {images && images.urls &&
            images.urls.map((image) => (
                <>
                    <Badge
                        count='X'
                        key={image.public_id}
                        onClick={() => handleImageRemove(image.public_id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Avatar
                            src={image.url}
                            size={100}
                            shape='square'
                            className='ml-3'
                        />
                    </Badge>
                </>
            ))}
        </>
    )
}

export default DisplayImgaes;
