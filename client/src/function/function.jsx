  const resizeImage = (base64Str, maxWidth, maxHeight, callback) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;
  
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
  
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
  
      ctx.drawImage(img, 0, 0, width, height);
  
      const resizedImage = canvas.toDataURL('image/jpeg');
      callback(resizedImage);
    };
  };
  
  const compressImage = (base64Str, callback) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
  
      ctx.drawImage(img, 0, 0);
  
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const compressedImage = reader.result;
          callback(compressedImage);
        };
      }, 'image/jpeg', 0.9); // Adjust quality (0.9 is recommended)
    };
  };

  const convertBytesToMB = (bytes) => {
    const KB = bytes / 1024;
    if (KB < 1024) {
      return KB.toFixed(0) + ' KB'; // Convert bytes to KB
    } else {
      const MB = KB / 1024;
      return MB.toFixed(2) + ' MB'; // Convert KB to MB
    }
  };

  export {resizeImage,compressImage,convertBytesToMB}
  