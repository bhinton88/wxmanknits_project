import { useEffect, useRef } from "react"
import { Button } from "react-bootstrap";

const UploadWidget = ({cloudinaryData, addPhotoUrl}) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const {cloud_name, upload_preset} = cloudinaryData

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: `${cloud_name}`,
      uploadPreset: `${upload_preset}`
    }, function(error, result){
      if(!error && result && result.event === "success"){
        addPhotoUrl(result.info.secure_url)
      } 
    })
  }, [cloud_name, upload_preset,addPhotoUrl])


  return (
    <Button onClick={() => widgetRef.current.open()}>
      Upload
    </Button>
  )

}

export default UploadWidget