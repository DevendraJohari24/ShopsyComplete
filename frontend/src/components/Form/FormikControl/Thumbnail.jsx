import { useEffect, useState } from "react"

export default function Thumbnail(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [thumb, setThumb] = useState(undefined);
       
    useEffect(() => {
        if(!props.file){
            return;
        }
        let reader = new FileReader();
        setIsLoading(true);
        reader.onloadend = () => {
            setThumb(props.file);
        };
        reader.readAsDataURL(props.file);
        setIsLoading(false);
    }, [props])

    if (!props.file) { return null; }

    if (isLoading) 
    { 
        return (
            <div>
                Loading...
            </div> 
        )
    }
  return (
    <div>
        <img src={thumb} alt="Image File" />
    </div>
  )
}
