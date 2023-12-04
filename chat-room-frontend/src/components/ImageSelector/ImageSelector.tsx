import titleCard2 from "../../assets/accuser.png";
import titleCard3 from "../../assets/curiosity.png";
import titleCard4 from "../../assets/bazzmoz.png";
import titleCard5 from "../../assets/eureka.png";
import titleCard6 from "../../assets/detective.png";
import titleCard7 from "../../assets/minusone.png";
import titleCard8 from "../../assets/robohno.png";
import titleCard9 from "../../assets/sadgears.png";
import titleCard10 from "../../assets/sargentbolts.png";
import titleCard11 from "../../assets/scarytron.png";
import titleCard12 from "../../assets/sonny.png";
import titleCard13 from "../../assets/wattee.png";
import Card from 'react-bootstrap/Card';
import './ImageSelector.css';
import {useState, useEffect} from 'react';

function ImageSelector() {

    const [selection, setSelection] = useState('');

    // This will use an array to store image sources.
    const images: string[] = [titleCard2, titleCard3, titleCard4, titleCard5, titleCard6, titleCard7, titleCard8, titleCard9, titleCard10, titleCard11, titleCard12, titleCard13]

    // Function that returns a div with an image with a border
    const renderImages = images.map((image, index) => {
        const handleClick = () => {
            setSelection(image);
        }

        return (
            <Card id='card'
                  key={index}
                  style={{backgroundColor: (image === selection) ? '#222222' : 'grey'}}
            >
                <img
                    src={image}
                    onClick={handleClick}
                    alt="Profile"
                    style={{
                        objectFit: 'fill',
                        borderRadius: '1rem',
                        border: '0',
                        borderColor: 'black'
                    }}/>
            </Card>
        )
    })


    return <>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center'}}>
            {renderImages}
        </div>
    </>
}

export default ImageSelector