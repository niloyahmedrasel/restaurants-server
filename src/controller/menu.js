
const MenuRepository = require('../repository/menu');

const menuRepository = new MenuRepository()
class MenuController{
    
async createMenu(req, res) {
  try {
    // Extract other fields from the request body
    const { name, description, price} = req.body;

    // Get the uploaded image's filename from req.file
    const image = req.file ? req.file.filename : null;

    // Validate that an image is uploaded
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Create a new menu item using the repository
    const newMenuData = {
      name,
      description,
      image, // Save the image filename
      price,
    };

    const savedMenu = await menuRepository.create(newMenuData);

    // Send success response
    res.status(201).json({
      message: 'Menu item created successfully',
      data: savedMenu
    });
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({
      message: 'Error creating menu item',
      error: error.message
    });
  }
}

async singleMenuItem(req, res) {
    const _id = req.params._id;

    try{
        const response = await menuRepository.findById(_id)
        if(!response){
            return res.status(404).json({message:"Menu item not found"})
        }
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json(err)
    }
}

async allMenu(req, res){
    try{
        const response = await menuRepository.find({})
        res.status(200).json(response)
    }catch(err){
        return res.status(500).json(err)
    }
    }
}


module.exports = MenuController