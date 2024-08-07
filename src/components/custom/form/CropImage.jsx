import { PropTypes } from 'prop-types';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';

export const createImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });
};

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
  };
}
// get cropped image function
export async function getCroppedImg(imageSrc, pixelCrop, rotation = 0, flip = { horizontal: false, vertical: false }) {
  const image = await createImage(imageSrc);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement('canvas');

  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) {
    return null;
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(canvas, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

  // As Base64 string
  // return croppedCanvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, 'image/jpeg');
  });
}

const CropImage = ({ handleDialogClose, hasImgSrc, setHasImgSrc, handleDialogOpen, onChange, imgSrc, open }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCroppedImage, showSetCroppedImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  useEffect(() => {
    if (imgSrc && hasImgSrc) {
      setAvatarUrl(URL.createObjectURL(imgSrc));
      handleDialogOpen();
    } else {
      handleDialogClose();
    }
  }, [imgSrc, showCroppedImage, hasImgSrc]);

  const handleCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(avatarUrl, croppedAreaPixels);

      showSetCroppedImage(croppedImage);

      try {
        const response = await fetch(croppedImage);
        const blobData = await response.blob();

        // Create a File object with the blob data and filename
        const file = new File([blobData], imgSrc?.name, { type: blobData.type });
        onChange(file);
      } catch (error) {
        console.error('Error converting blob URL to file:', error);
      }
    } catch (e) {
      console.error(e);
    }
    setHasImgSrc(false);
  };

  const handleAvatarDialogClose = () => {
    handleDialogClose();
    setAvatarUrl(null);
    onChange(null);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWith="sm"
        onClose={handleAvatarDialogClose}
        open={open}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
      >
        <DialogTitle>Crop Avatar</DialogTitle>
        <DialogContent>
          <Box sx={{ minHeight: '50vh', width: '100%', position: 'relative', borderRadius: '.5rem', overflow: 'hidden' }}>
            <Cropper
              image={avatarUrl}
              cropShape="round"
              aspect={1}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
          <Stack direction="row" gap={2} alignItems="center">
            <Typography>Zoom</Typography>

            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAvatarDialogClose}>Cancel</Button>
          <Button onClick={handleCroppedImage}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

CropImage.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,
  hasImgSrc: PropTypes.bool.isRequired,
  setHasImgSrc: PropTypes.func.isRequired,
  handleDialogOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  imgSrc: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setAvatarUrl: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  showCroppedImage: PropTypes.string.isRequired
};

export default CropImage;
