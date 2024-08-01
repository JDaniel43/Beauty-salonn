// pages/api/upload.js
import cloudinary from '../../libs/cloudinary';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const { image } = req.body;

    try {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: 'iLoveMe', 
        
      });
      console.log('hola desde dentro');
      res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Error uploading image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
