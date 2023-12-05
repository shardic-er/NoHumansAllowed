import Card from 'react-bootstrap/Card';
import './ImageSelector.css';
import {ProfilePicture} from "../../Utils/Enums";

function ImageSelector(props:{selection, setSelection}) {
    const selection = props.selection
    const setSelection = props.setSelection

    // Convert enum values to an array
    const images = Object
        .entries(ProfilePicture)
        .filter((entry, index) => index % 2 == 0) //filter out key names
        .map(entry => entry[1]);

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